const list = document.querySelector('.list');
const date = new Date();
const weekDays = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];

weekDays.forEach((item, i) => {
    let listItem = `<li>${item}</li>`;
    if (item === 'Суббота' || item === 'Воскресение'){
        listItem = `<li><i>${item}</i></li>`;
    }
    if (i === date.getDay() ){
        listItem = `<li><b>${item}</b></li>`;
    }

    list.insertAdjacentHTML('beforeend', listItem);
})

