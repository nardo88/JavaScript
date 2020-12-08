function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElement = function() {
    // создаем элемент
    const elem = document.createElement('div');
    // в зависимости от селектора создаем класс или id
    if(this.selector.slice(0, 1) === '#'){
        elem.id = this.selector.slice(1);
    } else if (this.selector.slice(0, 1) === '.'){
        elem.className = this.selector.slice(1);
    }
    // добавляем стили
    elem.style.cssText = `
        height : ${this.height}px;
        width : ${this.width}px;
        background-color : ${this.bg};
        font-size : ${this.fontSize}px;
    `;
    // добавляем етекст
    elem.textContent = 'Some text for example';
    // добавляем элемент на страницу
    document.body.append(elem)
}


const div1 = new DomElement('#div', 100, 100, 'red', 25)
const div2 = new DomElement('.div', 100, 100, 'green', 25)

div1.createElement()
div2.createElement()

