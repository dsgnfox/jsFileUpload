"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _createElement = /*#__PURE__*/new WeakSet();

var _changeHandler = /*#__PURE__*/new WeakSet();

var _addPreview = /*#__PURE__*/new WeakSet();

var _removeHandler = /*#__PURE__*/new WeakSet();

var _getFileSizeMb = /*#__PURE__*/new WeakSet();

var _createMessage = /*#__PURE__*/new WeakSet();

var _filesValidation = /*#__PURE__*/new WeakSet();

var CustomInputFile = /*#__PURE__*/function () {
  function CustomInputFile(options) {
    var _this = this;

    _classCallCheck(this, CustomInputFile);

    _classPrivateMethodInitSpec(this, _filesValidation);

    _classPrivateMethodInitSpec(this, _createMessage);

    _classPrivateMethodInitSpec(this, _getFileSizeMb);

    _classPrivateMethodInitSpec(this, _removeHandler);

    _classPrivateMethodInitSpec(this, _addPreview);

    _classPrivateMethodInitSpec(this, _changeHandler);

    _classPrivateMethodInitSpec(this, _createElement);

    this.inputData = {};
    this.inputData.files = {};
    this.inputData.filesCount = 0;
    this.inputData.filesSizeMb = 0;
    this._vars = {};
    this._elements = {};
    this._error = false;

    if (!options || !options.input) {
      console.error('В опции не передан инпут или id');
      this._error = true;
    }

    this._elements.form = options.input.closest('form');

    if (!this._elements.form) {
      console.error('Форма не найдена');
      this._error = true;
    }

    if (!this._error) {
      var DEFAULT_ACCEPT = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      var DEFAULT_MAX_FILE_COUNT = 1;
      var DEFAULT_MAX_ALL_FILE_SIZE_MB = 1;
      var DEFAULT_MAX_FILE_SIZE_MB = 1;
      var DEFAULT_VISIBLE_BTN_CLEAR = false;
      var DEFAULT_HAS_PREVIEW_IMAGE = false;
      var DEFAULT_TEXT_BTN_ADD = 'Добавить файл';
      var DEFAULT_TEXT_BTN_clear = 'Удалить все файлы';
      var DEFAULT_ERROR_REMOVE_TIMEOUT = 5000;

      if (options.hasOwnProperty('error_remove_timeout') && Number.isInteger(options.error_remove_timeout)) {
        this._vars.errorRemoveTimeout = options.error_remove_timeout;
      } else {
        this._vars.errorRemoveTimeout = DEFAULT_ERROR_REMOVE_TIMEOUT;
      }

      if (options.hasOwnProperty('visible_btn_clear')) {
        this._vars.visibleBtnClear = options.visible_btn_clear;
      } else {
        this._vars.visibleBtnClear = DEFAULT_VISIBLE_BTN_CLEAR;
      }

      if (options.hasOwnProperty('accept') && Array.isArray(options.accept)) {
        this._vars.accept = options.accept;
      } else {
        this._vars.accept = DEFAULT_ACCEPT;
      }

      if (options.hasOwnProperty('max_file_count') && Number.isInteger(options.max_file_count)) {
        this._vars.maxFileCount = options.max_file_count;
      } else {
        this._vars.maxFileCount = DEFAULT_MAX_FILE_COUNT;
      }

      if (options.hasOwnProperty('max_all_file_size_mb') && Number.isInteger(options.max_all_file_size_mb)) {
        this._vars.maxAllFileSizeMb = options.max_all_file_size_mb;
      } else {
        this._vars.maxAllFileSizeMb = DEFAULT_MAX_ALL_FILE_SIZE_MB;
      }

      if (options.hasOwnProperty('max_file_size_mb') && Number.isInteger(options.max_file_size_mb)) {
        this._vars.maxFileSizeMb = options.max_file_size_mb;
      } else {
        this._vars.maxFileSizeMb = DEFAULT_MAX_FILE_SIZE_MB;
      }

      if (options.hasOwnProperty('has_preview_image')) {
        this._vars.hasPreviewImage = options.has_preview_image;
      } else {
        this._vars.hasPreviewImage = DEFAULT_HAS_PREVIEW_IMAGE;
      }

      var DEFAULT_TEXT_DESCRIPTION = "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0434\u043E ".concat(this._vars.maxFileCount, " \u043E\u0431\u0449\u0438\u043C \u043E\u0431\u044A\u0435\u043C\u043E\u043C ").concat(this._vars.maxAllFileSizeMb);

      if (options.hasOwnProperty('text_description') && typeof options.text_description === 'string') {
        this._vars.textDescription = options.text_description;
      } else {
        this._vars.textDescription = DEFAULT_TEXT_DESCRIPTION;
      }

      this._elements.container = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'file-upload');
      this._elements.btnAdd = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'button', 'add');

      this._elements.btnAdd.setAttribute('type', 'button');

      this._elements.btnAddContainer = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'controls__item, add-container');
      this._elements.controls = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'controls');

      if (options.hasOwnProperty('text_btn_add')) {
        this._elements.btnAdd.textContent = options.text_btn_add;
      } else {
        this._elements.btnAdd.textContent = DEFAULT_TEXT_BTN_ADD;
      }

      this._elements.btnAddContainer.insertAdjacentElement('beforeend', this._elements.btnAdd);

      this._elements.controls.insertAdjacentElement('beforeend', this._elements.btnAddContainer);

      this._elements.container.insertAdjacentElement('beforeend', this._elements.controls);

      if (this._vars.visibleBtnClear) {
        this._elements.btnClear = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'button', 'clear');
        this._elements.btnClearContainer = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'controls__item, clear-container');

        this._elements.btnClear.setAttribute('type', 'button');

        if (options.hasOwnProperty('text_btn_clear')) {
          this._elements.btnClear.textContent = options.text_btn_clear;
        } else {
          this._elements.btnClear.textContent = DEFAULT_TEXT_BTN_clear;
        }

        this._elements.btnClear.addEventListener('click', function (e) {
          return _this.clearCustomFiles(_this._elements.form);
        });

        this._elements.btnClearContainer.insertAdjacentElement('beforeend', this._elements.btnClear);

        this._elements.controls.insertAdjacentElement('beforeend', this._elements.btnClearContainer);
      }

      this._elements.inputDescription = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'input-description');
      this._elements.inputDescription.textContent = this._vars.textDescription;

      this._elements.container.insertAdjacentElement('beforeend', this._elements.inputDescription); // Setup controls & input


      var input = options.input;

      if (options.hasOwnProperty('multiple') && options.multiple) {
        input.setAttribute('multiple', true);
      }

      input.setAttribute('name', 'filename[]');
      input.setAttribute('accept', this._vars.accept);

      if (input.getAttribute('type') !== 'file') {
        input.setAttribute('type', 'file');
      }

      input.setAttribute('hidden', true);
      input.insertAdjacentElement('afterend', this._elements.container);

      this._elements.btnAdd.addEventListener('click', function (e) {
        return input.click();
      });

      input.addEventListener('change', function (e) {
        return _classPrivateMethodGet(_this, _changeHandler, _changeHandler2).call(_this, e);
      });
    }
  }

  _createClass(CustomInputFile, [{
    key: "checkFileType",
    value: function checkFileType(file) {
      var fileType = file.type;

      var allowedAccept = this._vars.accept.filter(function (acceptType) {
        return acceptType === fileType;
      });

      return allowedAccept.length ? true : false;
    }
  }, {
    key: "getCustomFiles",
    value: function getCustomFiles(FormData) {
      if (this._error || !FormData) {
        return false;
      }

      if (FormData.get('filename[]')) {
        FormData["delete"]('filename[]');
      }

      for (var file in this.inputData.files) {
        FormData.append('filename[]', this.inputData.files[file]);
      }

      return FormData;
    }
  }, {
    key: "clearCustomFiles",
    value: function clearCustomFiles() {
      if (this._error) {
        return false;
      }

      var fileList = this._elements.form.querySelector('.file-list');

      var fileMessage = this._elements.form.querySelector('.message-container');

      if (this.inputData.files) {
        for (var file in this.inputData.files) {
          delete this.inputData.files[file];
        }
      }

      this.inputData.filesCount = 0;
      this.inputData.filesSizeMb = 0;

      if (fileList) {
        fileList.remove();
      }

      if (fileMessage) {
        fileMessage.remove();
      }
    }
  }]);

  return CustomInputFile;
}();

function _createElement2(type, elementClass) {
  var element = document.createElement(type);

  if (elementClass) {
    var classList = elementClass.replace(/\s/g, '').split(',');
    classList.forEach(function (className) {
      element.classList.add(className);
    });
  }

  return element;
}

function _changeHandler2(event) {
  var _this2 = this;

  var files = Array.from(event.target.files);

  if (!files.length) {
    return false;
  }

  var validationResult = _classPrivateMethodGet(this, _filesValidation, _filesValidation2).call(this, files);

  if (validationResult.status) {
    files.forEach(function (file) {
      _this2.inputData.files[file.name] = file;

      _classPrivateMethodGet(_this2, _addPreview, _addPreview2).call(_this2, file);
    });
  } else {
    _classPrivateMethodGet(this, _createMessage, _createMessage2).call(this, validationResult.message, validationResult.type);
  }

  event.target.value = '';
}

function _addPreview2(file) {
  var _this3 = this;

  if (!this._elements.form.querySelector('.file-list')) {
    var fileList = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'file-list');

    this._elements.controls.insertAdjacentElement('afterend', fileList);
  }

  var reader = new FileReader();
  reader.addEventListener('load', function (event) {
    var fileItem = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', "file-item, ".concat(file.type.replace(/[\\.\\/]/g, '-')));

    fileItem.setAttribute('data-file-name', file.name);

    if (_this3._vars.hasPreviewImage) {
      var fileItemAside = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__aside');

      var fileItemPreview = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__preview');

      fileItemPreview.setAttribute('style', "background-image: url(".concat(event.target.result, ")"));
      fileItemAside.insertAdjacentElement('beforeend', fileItemPreview);
      fileItem.insertAdjacentElement('beforeend', fileItemAside);
    }

    var fileItemMain = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__main');

    var fileItemName = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__name');

    fileItemName.textContent = file.name;

    var fileItemSize = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__size');

    fileItemSize.textContent = "".concat(_classPrivateMethodGet(_this3, _getFileSizeMb, _getFileSizeMb2).call(_this3, file), " \u041C\u0431");

    var fileItemRemove = _classPrivateMethodGet(_this3, _createElement, _createElement2).call(_this3, 'div', 'file-item__remove');

    fileItemRemove.addEventListener('click', function (e) {
      return _classPrivateMethodGet(_this3, _removeHandler, _removeHandler2).call(_this3, e, file);
    });

    var fileList = _this3._elements.form.querySelector('.file-list');

    fileItemMain.insertAdjacentElement('beforeend', fileItemName);
    fileItemMain.insertAdjacentElement('beforeend', fileItemSize);
    fileItemMain.insertAdjacentElement('beforeend', fileItemRemove);
    fileItem.insertAdjacentElement('beforeend', fileItemMain);
    fileList.insertAdjacentElement('beforeend', fileItem);
  });
  this.inputData.filesCount = ++this.inputData.filesCount;
  reader.readAsDataURL(file);
}

function _removeHandler2(eventRemove) {
  var fileItem = eventRemove.target.closest('.file-item');
  var fileName = fileItem.dataset.fileName;

  var fileSizeMb = _classPrivateMethodGet(this, _getFileSizeMb, _getFileSizeMb2).call(this, this.inputData.files[fileName]);

  delete this.inputData.files[fileName];
  fileItem.remove();
  this.inputData.filesCount = --this.inputData.filesCount;
  this.inputData.filesSizeMb -= fileSizeMb;
}

function _getFileSizeMb2(file) {
  var bytes = file.size;
  if (bytes === 0) return 0;
  return Math.ceil(bytes / (1024 * 1024));
}

function _createMessage2(text, type) {
  var messageContainer = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', 'message-container');

  var messageText = _classPrivateMethodGet(this, _createElement, _createElement2).call(this, 'div', "message-container__text, message-container__text--".concat(type));

  messageText.textContent = text;
  messageContainer.insertAdjacentElement('beforeend', messageText);

  this._elements.container.insertAdjacentElement('beforeend', messageContainer);

  setTimeout(function () {
    messageContainer.remove();
  }, this._vars.errorRemoveTimeout);
}

function _filesValidation2(files) {
  var _this4 = this;

  var obj = {};
  obj.message = '';
  obj.type = '';
  obj.status = true;

  if (files.length > this._vars.maxFileCount - this.inputData.filesCount) {
    obj.status = false;
    obj.type = 'error';
    obj.message = 'Превышено количество файлов';
    return obj;
  }

  files.forEach(function (file) {
    var fileSizeMb = _classPrivateMethodGet(_this4, _getFileSizeMb, _getFileSizeMb2).call(_this4, file);

    _this4.inputData.filesSizeMb += fileSizeMb;

    if (fileSizeMb >= _this4._vars.maxFileSizeMb) {
      obj.status = false;
      obj.type = 'error';
      obj.message = "\u0412\u0435\u0441 \u0444\u0430\u0439\u043B\u0430 ".concat(file.name, " \u0431\u043E\u043B\u044C\u0448\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u043E\u0433\u043E");
    }

    if (!_this4.checkFileType(file)) {
      obj.status = false;
      obj.type = 'error';
      obj.message = "\u041D\u0435\u043B\u044C\u0437\u044F \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B \u0441 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435\u043C ".concat(file.type);
    }

    if (_this4.inputData.files[file.name]) {
      obj.status = false;
      obj.type = 'error';
      obj.message = "\u0424\u0430\u0439\u043B ".concat(file.name, " \u0443\u0436\u0435 \u0431\u044B\u043B \u0432\u044B\u0431\u0440\u0430\u043D");
    }
  });

  if (!obj.status) {
    return obj;
  }

  if (this.inputData.filesSizeMb >= this._vars.maxAllFileSizeMb) {
    obj.type = 'error';
    obj.message = 'Превышено общий вес файлов';
    return obj;
  }

  obj.type = 'success';
  obj.status = true;
  return obj;
}