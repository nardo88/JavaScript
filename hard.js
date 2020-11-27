const list = document.querySelector('.list');
const date = new Date();
let weekDays = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];


weekDays = weekDays.map((item, i) => {
    
    if (item === 'Суббота' || item === 'Воскресение'){
       return `<li><i>${item}</i></li>`;
    }
    if (i === date.getDay() ){
       return `<li><b>${item}</b></li>`;
    }
    return `<li>${item}</li>`
})

getSundey = weekDays.shift()
weekDays.push(getSundey)
console.log(weekDays);

weekDays.forEach(item => {
    list.insertAdjacentHTML('beforeend', item)
})