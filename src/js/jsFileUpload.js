class CustomInputFile {

    constructor(options) {
        this.inputData = {}
        this.inputData.files = {}
        this.inputData.filesCount = 0
        this.inputData.filesSizeMb = 0

        this._vars = {}
        this._elements = {}
        this._error = false

        if(!options || !options.input) {
            console.error('В опции не передан инпут или id')
            this._error = true
        }

        this._elements.form = options.input.closest('form')
        if(!this._elements.form) {
            console.error('Форма не найдена')
            this._error = true
        }

        if(!this._error) {
            const DEFAULT_ACCEPT = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf']
            const DEFAULT_MAX_FILE_COUNT = 1
            const DEFAULT_MAX_ALL_FILE_SIZE_MB = 1
            const DEFAULT_MAX_FILE_SIZE_MB = 1
            const DEFAULT_VISIBLE_BTN_CLEAR = false
            const DEFAULT_HAS_PREVIEW_IMAGE = false
            const DEFAULT_TEXT_BTN_ADD = 'Добавить файл'
            const DEFAULT_TEXT_BTN_clear = 'Удалить все файлы'
            const DEFAULT_ERROR_REMOVE_TIMEOUT = 5000

            if(options.hasOwnProperty('error_remove_timeout') && Number.isInteger(options.error_remove_timeout)) {
                this._vars.errorRemoveTimeout = options.error_remove_timeout
            } else {
                this._vars.errorRemoveTimeout = DEFAULT_ERROR_REMOVE_TIMEOUT
            }

            if(options.hasOwnProperty('visible_btn_clear')) {
                this._vars.visibleBtnClear = options.visible_btn_clear
            } else {
                this._vars.visibleBtnClear = DEFAULT_VISIBLE_BTN_CLEAR
            }

            if(options.hasOwnProperty('accept') && Array.isArray(options.accept)) {
                this._vars.accept = options.accept
            } else {
                this._vars.accept = DEFAULT_ACCEPT
            }

            if(options.hasOwnProperty('max_file_count') && Number.isInteger(options.max_file_count)) {
                this._vars.maxFileCount =  options.max_file_count
            } else {
                this._vars.maxFileCount =  DEFAULT_MAX_FILE_COUNT
            }

            if(options.hasOwnProperty('max_all_file_size_mb') && Number.isInteger(options.max_all_file_size_mb)) {
                this._vars.maxAllFileSizeMb = options.max_all_file_size_mb
            } else {
                this._vars.maxAllFileSizeMb = DEFAULT_MAX_ALL_FILE_SIZE_MB
            }

            if(options.hasOwnProperty('max_file_size_mb') && Number.isInteger(options.max_file_size_mb)) {
                this._vars.maxFileSizeMb = options.max_file_size_mb
            } else {
                this._vars.maxFileSizeMb = DEFAULT_MAX_FILE_SIZE_MB
            }

            if(options.hasOwnProperty('has_preview_image')) {
                this._vars.hasPreviewImage = options.has_preview_image
            } else {
                this._vars.hasPreviewImage = DEFAULT_HAS_PREVIEW_IMAGE
            }

            const DEFAULT_TEXT_DESCRIPTION = `Вы можете прикрепить до ${this._vars.maxFileCount} общим объемом ${this._vars.maxAllFileSizeMb}`

            if(options.hasOwnProperty('text_description') && typeof (options.text_description) === 'string') {
                this._vars.textDescription = options.text_description
            } else {
                this._vars.textDescription = DEFAULT_TEXT_DESCRIPTION
            }

            this._elements.container = this.#createElement('div', 'file-upload')
            this._elements.btnAdd = this.#createElement('button', 'add')
            this._elements.btnAdd.setAttribute('type', 'button')
            this._elements.btnAddContainer = this.#createElement('div', 'controls__item, add-container')
            this._elements.controls = this.#createElement('div', 'controls')

            if(options.hasOwnProperty('text_btn_add')) {
                this._elements.btnAdd.textContent = options.text_btn_add
            } else {
                this._elements.btnAdd.textContent = DEFAULT_TEXT_BTN_ADD
            }

            this._elements.btnAddContainer.insertAdjacentElement('beforeend', this._elements.btnAdd)
            this._elements.controls.insertAdjacentElement('beforeend', this._elements.btnAddContainer)
            this._elements.container.insertAdjacentElement('beforeend', this._elements.controls)

            if(this._vars.visibleBtnClear) {
                this._elements.btnClear = this.#createElement('button', 'clear')
                this._elements.btnClearContainer = this.#createElement('div', 'controls__item, clear-container')
                this._elements.btnClear.setAttribute('type', 'button')
                if(options.hasOwnProperty('text_btn_clear')) {
                    this._elements.btnClear.textContent = options.text_btn_clear
                } else {
                    this._elements.btnClear.textContent = DEFAULT_TEXT_BTN_clear
                }

                this._elements.btnClear.addEventListener('click', (e) => this.clearCustomFiles(this._elements.form))
                this._elements.btnClearContainer.insertAdjacentElement('beforeend', this._elements.btnClear)
                this._elements.controls.insertAdjacentElement('beforeend', this._elements.btnClearContainer)
            }

            this._elements.inputDescription = this.#createElement('div', 'input-description')
            this._elements.inputDescription.textContent = this._vars.textDescription
            this._elements.container.insertAdjacentElement('beforeend', this._elements.inputDescription)

            // Setup controls & input

            const input = options.input

            if(options.hasOwnProperty('multiple') && options.multiple) {
                input.setAttribute('multiple', true)
            }

            input.setAttribute('name', 'filename[]')
            input.setAttribute('accept', this._vars.accept)

            if(input.getAttribute('type') !== 'file') {
                input.setAttribute('type', 'file')
            }
            input.setAttribute('hidden', true)
            input.insertAdjacentElement('afterend', this._elements.container)

            this._elements.btnAdd.addEventListener('click', (e) => input.click())
            input.addEventListener('change', (e) => this.#changeHandler(e))
        }
    }

    #createElement(type, elementClass) {
        const element = document.createElement(type)
        if(elementClass) {
            const classList = elementClass.replace(/\s/g, '').split(',')
            classList.forEach(function (className) {
                element.classList.add(className)
            })
        }
        return element
    }

    #changeHandler(event) {
        const files = Array.from(event.target.files)
        if(!files.length) {
            return false
        }
        const validationResult = this.#filesValidation(files)

        if(validationResult.status) {
            files.forEach((file) => {
                this.inputData.files[file.name] = file
                this.#addPreview(file)
            })
        } else {
            this.#createMessage(validationResult.message, validationResult.type)
        }
        event.target.value = ''
    }

    #addPreview(file) {

        if(!this._elements.form.querySelector('.file-list')) {
            const fileList = this.#createElement('div', 'file-list')
            this._elements.controls.insertAdjacentElement('afterend', fileList)
        }

        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
            const fileItem = this.#createElement('div', `file-item, ${file.type.replace(/[\\.\\/]/g, '-')}`)
            fileItem.setAttribute('data-file-name', file.name)
            if(this._vars.hasPreviewImage) {
                const fileItemAside = this.#createElement('div', 'file-item__aside')
                const fileItemPreview = this.#createElement('div', 'file-item__preview')
                fileItemPreview.setAttribute('style', `background-image: url(${event.target.result})`)
                fileItemAside.insertAdjacentElement('beforeend', fileItemPreview)
                fileItem.insertAdjacentElement('beforeend', fileItemAside)
            }

            const fileItemMain = this.#createElement('div', 'file-item__main')

            const fileItemName = this.#createElement('div', 'file-item__name')
            fileItemName.textContent = file.name

            const fileItemSize = this.#createElement('div', 'file-item__size')
            fileItemSize.textContent = `${this.#getFileSizeMb(file)} Мб`

            const fileItemRemove = this.#createElement('div', 'file-item__remove')
            fileItemRemove.addEventListener('click', (e) => this.#removeHandler(e, file))

            const fileList = this._elements.form.querySelector('.file-list')

            fileItemMain.insertAdjacentElement('beforeend', fileItemName)
            fileItemMain.insertAdjacentElement('beforeend', fileItemSize)
            fileItemMain.insertAdjacentElement('beforeend', fileItemRemove)
            fileItem.insertAdjacentElement('beforeend', fileItemMain)
            fileList.insertAdjacentElement('beforeend', fileItem)
        })

        this.inputData.filesCount = ++this.inputData.filesCount
        reader.readAsDataURL(file)
    }

    #removeHandler(eventRemove) {
        let fileItem = eventRemove.target.closest('.file-item')
        let fileName = fileItem.dataset.fileName
        let fileSizeMb = this.#getFileSizeMb(this.inputData.files[fileName])
        delete this.inputData.files[fileName]
        fileItem.remove()
        this.inputData.filesCount = --this.inputData.filesCount
        this.inputData.filesSizeMb -= fileSizeMb
    }

    #getFileSizeMb(file) {
        let bytes = file.size
        if (bytes === 0) return 0
        return Math.ceil(bytes / (1024*1024))
    }

    checkFileType(file) {
        const fileType = file.type
        const allowedAccept = this._vars.accept.filter(function (acceptType) {
            return acceptType === fileType
        })
        return allowedAccept.length ? true : false
    }

    #createMessage(text, type) {
        const messageContainer = this.#createElement('div', 'message-container')
        const messageText = this.#createElement('div', `message-container__text, message-container__text--${type}`)
        messageText.textContent = text
        messageContainer.insertAdjacentElement('beforeend', messageText)
        this._elements.container.insertAdjacentElement('beforeend', messageContainer)
        setTimeout(function (){
            messageContainer.remove()
        }, this._vars.errorRemoveTimeout)
    }

    #filesValidation(files) {
        let obj = {}
        obj.message = ''
        obj.type = ''
        obj.status = true
        if(files.length > this._vars.maxFileCount - this.inputData.filesCount) {
            obj.status = false
            obj.type = 'error'
            obj.message = 'Превышено количество файлов'
            return obj
        }

        files.forEach((file) => {
            let fileSizeMb = this.#getFileSizeMb(file)
            this.inputData.filesSizeMb += fileSizeMb
            if(fileSizeMb >= this._vars.maxFileSizeMb) {
                obj.status = false
                obj.type = 'error'
                obj.message = `Вес файла ${file.name} больше разрешенного`
            }
            if(!this.checkFileType(file)) {
                obj.status = false
                obj.type = 'error'
                obj.message = `Нельзя загружать файлы с расширением ${file.type}`
            }
            if(this.inputData.files[file.name]) {
                obj.status = false
                obj.type = 'error'
                obj.message = `Файл ${file.name} уже был выбран`
            }
        })
        if(!obj.status) {
            return obj
        }

        if(this.inputData.filesSizeMb >= this._vars.maxAllFileSizeMb) {
            obj.type = 'error'
            obj.message = 'Превышено общий вес файлов'
            return obj
        }

        obj.type = 'success'
        obj.status = true
        return obj
    }

    getCustomFiles(FormData) {
        if(this._error || !FormData) {
            return false
        }
        if(FormData.get('filename[]')) {
            FormData.delete('filename[]');
        }
        for(let file in this.inputData.files) {
            FormData.append('filename[]', this.inputData.files[file])
        }

        return FormData
    }

    clearCustomFiles() {
        if(this._error) {
            return false
        }

        let fileList = this._elements.form.querySelector('.file-list')
        let fileMessage = this._elements.form.querySelector('.message-container')

        if(this.inputData.files) {
            for(let file in this.inputData.files) {
                delete this.inputData.files[file]
            }
        }

        this.inputData.filesCount = 0
        this.inputData.filesSizeMb = 0

        if(fileList) {
            fileList.remove();
        }

        if (fileMessage) {
            fileMessage.remove();
        }
    }
}