// Пункт 1
let money = 100000,
    income = 'фриланс',
    addExpress = 'бензин, интернет, жена, коммуналка',
    deposit = true,
    mission = 999999,
    period = 3;

// Пункт 2
// Типы данных
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// Длина строки
console.log(addExpress.length);

// Вывести в консоль “Период равен (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани”
console.log(`Период равен ${period} месяцев” и “Цель заработать ${mission} рублей/долларов/гривен/юани`);

// Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
// 1 способ
console.log(addExpress.toLowerCase().split(', '));
// 2 способ
const addExpressArray = addExpress.toLowerCase().split(', ')

//  - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
let budgetDay = money / 30

// - Вывести в консоль budgetDay
// console.log(budgetDay);

// число не красивое, округлим
console.log(Math.floor(budgetDay));

// Ошибок в консоли нет!

// урок 03 =================================================================================

// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = +prompt('Ваш месячный доход?');

//  Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую”
//  сохранить в переменную addExpenses (пример: "Квартплата, проездной, кредит")
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

//Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной 
// deposit (булево значение true/false)
deposit = confirm('Есть ли у вас депозит в банке?');

// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 

// “Введите обязательную статью расходов?” (например expenses1, expenses2)
// “Во сколько это обойдется?” (например amount1, amount2)

let expenses1 = prompt('Введите обязательную статью расходов?')
let amount1 = +prompt('Во сколько это обойдется?')

let expenses2 = prompt('Введите обязательную статью расходов?')
let amount2 = +prompt('Во сколько это обойдется?')

//  Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную
// budgetMonth и вывести результат в консоль
let budgetMonth = money - amount1 - amount2
console.log('бюджет на месяц ' + budgetMonth);

// Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в
// консоль, округляя в большую сторону (методы объекта Math в помощь)
console.log('цель накопить: ' + mission + ' рублей будет достигнута через ' + Math.ceil(mission / budgetMonth) + ' месяцев');

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 
budgetDay = Math.floor(budgetMonth / 30)
console.log('Дневной бюджет: ' + budgetDay + 'рублей');

// Написать конструкцию условий (расчеты приведены в рублях)	
// Если budgetDay больше 1200, то “У вас высокий уровень дохода”
// Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
// Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
// Если отрицательное значение то вывести “Что то пошло не так”
// Учесть варианты 0, 600 и 1200 (к какому уровню не важно)
if(budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay > 600){
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 ){
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if ( budgetDay <= 0 ) {
    console.log('Что то пошло не так! Проверьте нет ли под окном коллекторов!');
}


