// первое задание ==============================================================================
const ru = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date()



// через if

const setNameDayWithIf = () => {
    let lang = prompt('введите идентификатор языка (ru / en) / enter language id (ru / en)')
    if (lang === 'en'){

        alert('today is ' + en[date.getDay()]);

    } else if (lang === 'ru'){

        alert('сегодня ' + ru[date.getDay()]);

    } else if (lang === null){
        setNameDayWithIf()
    }
    else {
        setNameDayWithIf()
    }
}

// через switch
const setNameDayWithSwitch = () => {
    let lang = prompt('введите идентификатор языка (ru / en) / enter language id (ru / en)')
    switch (lang){
        case 'en':{
            alert('today is ' + en[date.getDay()]);
            break
        }
        case 'ru': {
            alert('сегодня ' + ru[date.getDay()]);
            break
        }
        default:
            setNameDayWithSwitch() 
    }
}


// через многомерные массивы
const arrayDays = [ru, en]
Array.prototype.ru = [...ru]
Array.prototype.en = [...en]

const setNameDayWithArray = () => {
    let lang = prompt('введите идентификатор языка (ru / en) / enter language id (ru / en)')

    lang ? console.log(arrayDays[lang][date.getDay()]) : setNameDayWithArray()
    

    
}

setNameDayWithIf()
// setNameDayWithSwitch() 
// setNameDayWithArray()


// второе задание ==================================================================================
const getYourStatus = () => {
    let namePerson = prompt('Введите имя').toLowerCase()

    namePerson === 'артем' ? console.log('директор') 
        : namePerson === 'максим' ? console.log('Преподаватель')
        : namePerson === '' ? getYourStatus()
        : namePerson === null ? getYourStatus()
        : console.log('Студент'); 
}

// getYourStatus()
