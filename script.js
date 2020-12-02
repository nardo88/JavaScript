const books = document.querySelectorAll('.book');
const booksWrapper = document.querySelector('.books');
const body = document.querySelector('body');
const adv = document.querySelector('.adv')
const titles = document.querySelectorAll('.books h2 a');

// Восстановить порядок книг.
booksWrapper.insertAdjacentElement('afterbegin', books[1])
books[2].replaceWith(books[4])
booksWrapper.insertAdjacentElement('beforeend', books[2])

// Заменить картинку заднего фона на другую из папки image
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
titles[4].textContent = 'Книга 3. this и Прототипы Объектов'

// Удалить рекламу со страницы
adv.remove()

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
// поулчаем список и массив элементов списка
const listItems2 = books[0].children[1].children

listItems2[1].after(listItems2[3])
listItems2[2].after(listItems2[6])
listItems2[3].after(listItems2[8])
listItems2[4].after(listItems2[6])
listItems2[9].after(listItems2[6])

const listItems5 = books[5].children[1].children
listItems5[1].after(listItems5[9])
listItems5[2].after(listItems5[4])
listItems5[3].after(listItems5[5])
listItems5[8].after(listItems5[6])


// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const listItems6 = books[2].children[1]
const liFor6 = document.createElement('li');
liFor6.classList.add('chapter');
liFor6.textContent = 'Глава 8: За пределами ES6';
listItems6.children[8].after(liFor6)
