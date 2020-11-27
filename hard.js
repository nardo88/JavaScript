const list = document.querySelector('.list');
const date = new Date();
const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];

weekDays.forEach((item, i) => {
    let listItem = `<li>${item}</li>`;
    if (item === 'Суббота' || item === 'Воскресение'){
        listItem = `<li><i>${item}</i></li>`;
    }
    if (i === date.getDay() - 1){
        listItem = `<li><b>${item}</b></li>`;
    }

    list.insertAdjacentHTML('beforeend', listItem);
})

