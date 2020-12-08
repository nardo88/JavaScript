function DomElement(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
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
        position : ${this.position};
        top: 0px;
        left: 0px;
    `;

    return elem
}




const div1 = new DomElement('#div', 100, 100, 'red', 25, 'absolute')

document.addEventListener('DOMContentLoaded', () => {
    const elem = div1.createElement()
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


