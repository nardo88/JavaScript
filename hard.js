const list = document.querySelector('.list');
const date = new Date();
let weekDays = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];


weekDays = weekDays.map((item, i) => {
    if (i === date.getDay()){
        return `<li id="${i}"><b>${item}</b></li>`;
    }
    return `<li id="${i}">${item}</li>`;
})
getSundey = weekDays.shift();
weekDays.push(getSundey);

weekDays.forEach(item => {
    list.insertAdjacentHTML('beforeend', item)
})

const items = document.querySelectorAll('li')

items.forEach((item, i) => {
    console.log(i);
        if (i === 5 || i === 6){
            item.classList.add('italic')
        }
        
})
console.log(date.getDay());