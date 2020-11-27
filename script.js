let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money;

// получаем общий доход за месяц
let start = function () {
    do {
        money = +prompt('Ваш месячный доход?', 75000);
    } while (!isNumber(money))
}

start()

// создание объекта
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    // добавление обязательных расходов
    addExpenses: [],
    // есть ли депозит в банке
    deposit: false,
    // цель - накопить лям
    mission: 1000000,
    // за какой период хотим достигнуть цели
    period: 3,
    // месячный доход
    budget: money,
    // дневной бюджет
    budgetDay: 0,
    // бюджет на месяц
    budgetMonth: 0,
    // месячные затраты
    expensesMonth: 0,

    // задаем вопросы по поводу обязательных расходов
    asking() {
        // здесь спросили про депозит в банке
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let value
            let key = prompt('Введите обязательную статью расходов?', 'Бензин')

            do {
               value = +prompt('Во сколько это обойдется?', 3000)
            } while (!isNumber(value)) 

            this.expenses[key] = value
        }
        
    },
    // метод получения списка обязательных расходов и 
    //суммы денег на эти расходы за месяц
    getExpensesMonth() {
        let summ = 0

       for (let key in this.expenses){
           summ += this.expenses[key]
       }
        return summ
    },
    // метод получения цифры: доход минус расход
    getBudget(){
        // получаем месячный бюджет
        this.budgetMonth = this.budget - this.expensesMonth
        // получаем дневной бюджет
        this.budgetDay = this.budgetMonth / 30
       
    },
    //
    getTargetMonth(){
        return this.mission / this.budget
    },
    getStatusIncome(){
        if (this.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay <= 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            console.log('Что то пошло не так! Проверьте нет ли под окном коллекторов!');
        }
    }

}

appData.asking()

// получение суммы обязательных расходов за месяц
appData.expensesAmount = appData.getExpensesMonth()

// получение цифры: доход минус расход 
appData.getBudget()

console.log('сумма всех обязательных расходов за месяц: ' + appData.expensesAmount);

console.log(Math.floor(appData.getTargetMonth()) < 0 ? 'Цель не будет достигнута' : 'цель будет достигнута через ' + Math.floor(appData.getTargetMonth()) + ' месяцев');

appData.getStatusIncome()

// вывести все ключи объекта appData
console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    console.log('Ключ ' + key + '\n' + 'Значение ' + appData[key]);
}

