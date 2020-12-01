// 1) Выведите на страницу текущую дату и время в 2-х форматах: 
//     a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  
//     б) '04.02.2020 - 21:05:33' 
// 2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов, часа"
// 3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
// 4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду 


const a = document.querySelector('.a')
const b = document.querySelector('.b')





const getDateForA = () => {
    let date = new Date()
    let  options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    let str = date.toLocaleString("ru", options)
    let data = str.split(', ')
    let dateNow = data[1].replace('г.', 'года')

    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let hourName;
    let minutesName;
    let secondsName;
    
    if (hour === 1 || hour === 21){
        hourName = 'час'
    } else if ( hour >= 2 && hour < 5){
        hourName = 'часа'
    } else if ( hour >= 5 && hour < 21){
        hourName = 'часов'
    } else if(hour > 22 && hour <= 24){
        hourName = 'часа'
    }

    let im = [1]
    let mn = [0, 5, 6, 7, 8, 9]
    let rod = [2, 3, 4]

    if (im.includes(minutes%10)){
        minutesName = 'минута'
    } else if (mn.includes(minutes%10)){
        minutesName = 'минут'
    } else if (rod.includes(minutes%10)){
        minutesName = 'минуты'
    }

    if (im.includes(seconds%10)){
        secondsName = 'секунда'
    } else if (mn.includes(seconds%10)){
        secondsName = 'секунд'
    } else if (rod.includes(seconds%10)){
        secondsName = 'секунды'
    }


    return `Сегодня ${data[0]}, ${dateNow}, ${hour} ${hourName} ${minutes} ${minutesName} ${seconds} ${secondsName}`
}

const  getDateForB = () => {
    let date = new Date()
    let  options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    let str = date.toLocaleString("ru", options)
    
   return str.split(', ').join(' - ')
}

const setDateA = () => {
    a.innerHTML = getDateForA()
}

const setDateB = () => {
    b.innerHTML = getDateForB()
}

let timeIntervalForA = setInterval(setDateA, 1000)
let timeIntervalForB = setInterval(setDateB, 1000)

