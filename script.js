let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}



let money,
    income = 'фриланс',
    addExpress = 'бензин, интернет, жена, коммуналка',
    deposit = true,
    mission = 999999,
    period = 3;

// получаем общий доход за месяц
let start = function(){
    do {
        money = prompt('Ваш месячный доход?', 75000);
    } while ( !isNumber(money))
}

start()

function setTypeOf(variable) {
    console.log(typeof variable);
}
setTypeOf(money)
setTypeOf(income)
setTypeOf(deposit)

// дневной бюджет
let budgetDay = money / 30

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Бензин, Квартплата, Связь');

deposit = confirm('Есть ли у вас депозит в банке?');

// массив с обязательными расходами
let expenses = []

// заполняем массив с обязательными расходами
// и получаем сумму обязательных расходов
const getExpensesMonth = function() {
    let sum = 0
    

    for (let i = 0; i < 2; i++){
        let num
        expenses[i] = prompt('Введите обязательную статью расходов?', 'Детский сад')

        while ( !isNumber(num)){
            num = prompt('Во сколько это обойдется?')
        }

       
        sum+= +num
    
    }
    console.log(expenses);
    
    return sum
}

let expensesAmount = getExpensesMonth()

const getAccumulatedMonth = function(money, amount){
        return money - amount
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount)


const getTargetMonth = function(mission ,accumulatedMonth){
    return mission / accumulatedMonth
}

const getStatusIncome = function(){
    if(budgetDay >= 1200){
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 && budgetDay > 600){
        console.log('У вас средний уровень дохода');
    } else if (budgetDay <= 600 ){
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if ( budgetDay <= 0 ) {
        console.log('Что то пошло не так! Проверьте нет ли под окном коллекторов!');
    }
}

budgetDay = getAccumulatedMonth(money, expensesAmount) / 30


console.log('сумма всех обязательных расходов за месяц: ' + expensesAmount);

console.log('Накопления за месяц: ' + accumulatedMonth);

console.log(Math.floor(getTargetMonth(mission ,accumulatedMonth)) < 0 ? 'Цель не будет достигнута' : 'цель будет достигнута через ' + Math.floor(getTargetMonth(mission ,accumulatedMonth)) + ' месяцев');

getStatusIncome()


console.log(addExpenses.split(', '));


