

 

function DomElement(selector, height, width, bg, fontSize, text, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
    this.position = position;
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
        
        elem = null

    }

    // добавляем стили
    if (elem) {
        elem.style.cssText = `
        height : ${this.height}px;
        width : ${this.width}px;
        background-color : ${this.bg};
        font-size : ${this.fontSize}px;
        position : ${this.position};
        top: 0px;
        left: 0px;
    `;
        // добавляем етекст
        elem.textContent = this.text;
        // добавляем элемент на страницу
        return elem
    } else {
        console.log('указано не корректное значение селектора');
    }

}





document.addEventListener('DOMContentLoaded', () => {
    const elem = new DomElement('.div', 100, 100, 'red', 25, '', 'absolute').createElement()

    document.body.append(elem)

    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowUp'){
            elem.style.top = `${parseFloat(elem.style.top) - 10}px`
        }
        if(event.key === 'ArrowDown'){
            elem.style.top = `${parseFloat(elem.style.top) + 10}px`
        }
        if(event.key === 'ArrowRight'){
            elem.style.left = `${parseFloat(elem.style.left) + 10}px`
        }
        if(event.key === 'ArrowLeft'){
            elem.style.left = `${parseFloat(elem.style.left) - 10}px`
        }

    })
})


