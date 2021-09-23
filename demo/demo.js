document.addEventListener('DOMContentLoaded', function (){

  const fileInput = new CustomInputFile({
    input: document.querySelector('.custom-file'),
    multiple: true,
    max_file_count: 5,
    max_all_file_size_mb: 100,
    max_file_size_mb: 5,
    visible_btn_clear: true,
    has_preview_image: true,
  })

  document.querySelector('.test-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const dataWithFiles = fileInput.getCustomFiles(new FormData(e.currentTarget))

    let names = []
    dataWithFiles.forEach((file) => names.push(file.name))

    const popup = document.createElement('div')
    popup.classList.add('popup')
    popup.innerHTML = `<div class="popup__content"><h3>Отправленные файлы</h3>${names.join('<br/>')}</div>`

    document.querySelector('.container').insertAdjacentElement('afterend', popup)

    fileInput.clearCustomFiles()
  })

})