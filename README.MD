# jsFileUpload

Удобная загрузка и отправка файлов из формы

[DEMO](https://dsgnfox.github.io/jsfileupload/index.html)

## Как использовать:
Инпут обязательно должен быть внутри тэга form. Для корректной работы отправки файлов у тэга form указываем enctype="multipart/form-data"

```html
<form method="post" enctype="multipart/form-data">
    <input type="file" class="custom-file">
</form>
```

Создаем переменную и вызываем конструктор new CustomInputFile. В качестве параметров нужно передать объект с опциями.
> :exclamation: Обязательным свойством в опциях являеться только input, в который нужно передать dom элемент.
```js
  const fileInput = new CustomInputFile({
    input: document.querySelector('.custom-file')
  })
```
При отправке формы у объекта fileInput нужно вызвать метод getCustomFiles. В этот метод необходимо передать объект FormData текущей формы.
```js
const dataWithFiles = fileInput.getCustomFiles(new FormData(e.currentTarget))
```
Все. Сейчас все файлы добавлены в FormData и ее можно отправлять :)

После успешной отправки формы необходимо вызвать метод clearCustomFiles()
```js
fileInput.clearCustomFiles()
```

## Опции
* input (DOM Node)

Обязательное значение. Передается инпут, для загрузки файлов

---

* show_preview (boolean)

По-умолчанию: false

Показывать превью файлов. Актуально для загрузки фото. Можно использовать заглушки для файлов без превью, например pdf. На контейнер с превью добавляется css класс с расширения файла.

---

* multiple (boolean)

По-умолчанию: false

Возможность множественной загрузки файлов

---

* accept (array)

По-умолчанию: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf']

Массив строк [MIME-типов файлов](https://developer.mozilla.org/ru/docs/Web/HTTP/Basics_of_HTTP/MIME_types), разрешенных для загрузки

---

* max_file_count (number)

По-умолчанию: 1

Максимальное число файлов для загрузки

---

* max_all_file_size_mb (number)

По-умолчанию: 1

Максимальный вес всех файлов для загрузки (Мб)

---

* max_file_size_mb (number)

По-умолчанию: 1

Максимальный вес 1 файла для загрузки (Мб)

---

* error_remove_timeout (number)

По-умолчанию: 5000

Через сколько милисекунд сообщение об ошибке удалится

---

* visible_btn_clear (boolean)

По-умолчанию: false

Добавить кнопку для очистки инпута и удаления всех добавленных файлов

---

* text_description (sting)

По-умолчанию: Вы можете прикрепить до ${maxFileCount} общим объемом ${maxAllFileSizeMb}

Текст с описанием. Выводится под инпутом для загрузки файлов

---

* text_btn_add (string)

По-умолчанию: 'Добавить файл'

Текст на кнопке добавления файла

---

* text_btn_clear (string)

По-умолчанию: 'Удалить все файлы'

Текст на кнопке удаления файлов
