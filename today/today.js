const title = document.querySelector('.title'),
    day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    newYear = document.querySelector('.newYear');

const date = new Date()

const days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг' , 'Пятница', 'Суббота']



let hours = date.getHours()
if (hours >= 12){
    title.textContent = 'Добрый день!';
} else if (hours >= 18){
    title.textContent = 'Добрый вечер!';
} else if (hours >= 24){
    title.textContent = 'Доброй ночи!';
} else if (hours >= 5){
    title.textContent = 'Доброe утро!';
}

let dateNewYear = new Date(2020, 11, 31)

let dayToNewYear = (dateNewYear - date.getTime()) / 1000
console.log(Math.floor(dayToNewYear / 60 / 60 / 24));

day.textContent = `Сегодня ${days[date.getDay()]}`
time.textContent = `Текущее время ${date.toTimeString().slice(0, 8)} PM`
newYear.textContent = `До нового года осталось ${Math.floor(dayToNewYear / 60 / 60 / 24)} дней`


