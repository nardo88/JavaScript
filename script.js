const btn = document.querySelector('.btn')
const wrapper = document.querySelector('.wrapper')
const title = document.querySelector('.title')

function generateColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

const setColor = () => {
    let newColor = generateColor();
    wrapper.style.background = newColor;
    btn.style.color = newColor;
    title.textContent = newColor
}

btn.addEventListener('click', setColor)

setColor()