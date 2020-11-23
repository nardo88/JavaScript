// первое задание ==============================================================================


const ru = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



// через if

const setNameDayWithIf = () => {
    let lang = prompt('введите идентификатор языка (ru / en) / enter language id (ru / en)')
    if (lang === 'en'){
        console.log(en);
    } else if (lang === 'ru'){

        console.log(ru);

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
            console.log(en);
            break
        }
        case 'ru': {
            console.log(ru);
            break
        }
        default:
            setNameDayWithSwitch() 
    }
}


// через многомерные массивы
const arrayDays = []
arrayDays.ru = ru
arrayDays.en = en


const setNameDayWithArray = () => {
    let lang = prompt('введите идентификатор языка (ru / en) / enter language id (ru / en)')
    console.log(arrayDays[lang]);
       
}

// setNameDayWithIf()
// setNameDayWithSwitch() 
setNameDayWithArray()


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
