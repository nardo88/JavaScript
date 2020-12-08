function DomElement(selector, height, width, bg, fontSize, text) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
}

DomElement.prototype.createElement = function () {
    let elem

    // в зависимости от селектора создаем класс или id

    if (this.selector.slice(0, 1) === '#') {
        elem = document.createElement('p');
        elem.id = this.selector.slice(1);
    } else if (this.selector.slice(0, 1) === '.') {
        elem = document.createElement('div');
        elem.className = this.selector.slice(1);
    } else {
        console.log('указано не корректное значение селектора');
        elem = null

    }

    // добавляем стили
    if (elem) {
        elem.style.cssText = `
        height : ${this.height}px;
        width : ${this.width}px;
        background-color : ${this.bg};
        font-size : ${this.fontSize}px;
    `;
        // добавляем етекст
        elem.textContent = this.text;
        // добавляем элемент на страницу
        document.body.append(elem)
    }

}


const div1 = new DomElement('#div', 100, 100, 'red', 25, 'Это параграф');
const div2 = new DomElement('.div', 100, 100, 'green', 25, 'Это блок');
// проверяем если селектор указали не коллектно
const div3 = new DomElement('div', 100, 100, 'red', 25, 'Это блок');

div1.createElement()
div2.createElement()
div3.createElement()