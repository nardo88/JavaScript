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
console.log(addExpressArray);

//  - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30)
let budgetDay = money / 30

// - Вывести в консоль budgetDay
console.log(budgetDay);

// число не красивое, округлим
console.log(Math.floor(budgetDay));


// Ошибок в консоли нет!