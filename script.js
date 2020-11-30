let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let isString = (str) => {
    if (!parseFloat(str) && str !== null && str.trim() !== ''){
        return true
    } else {
        return false
    }
}

let money;

// получаем общий доход за месяц
let start = function () {
    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?', 75000);
    } 
}

start();

// создание объекта
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    // добавление обязательных расходов
    addExpenses: [],
    // есть ли депозит в банке
    deposit: false,
    // процент депозита
    percentDeposit: 0,
    moneyDeposit: 0,
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

    
    asking() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'таксую');
            } while (!isString(itemIncome))

            
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }while (!isNumber(cashIncome))

            this.income[itemIncome] = cashIncome;
        }


        // здесь спросили про депозит в банке
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        // обязательные расходы
        for (let i = 0; i < 2; i++) {
            let value;
            let key;

            // проверяем что статья расхода - строка
            do {
                key = prompt('Введите обязательную статью расходов?', 'Бензин');
            } while (!isString(key))

            
            
            while (!isNumber(value))  {
               value = prompt('Во сколько это обойдется?', 3000);
            } 

            this.expenses[key] = value;
            // заполняем массив addExpenses
            this.addExpenses.push(key)
        }
        
    },
    // метод получения списка обязательных расходов и 
    //суммы денег на эти расходы за месяц
    getExpensesMonth() {

       for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
       }
        
    },
    // метод получения цифры: доход минус расход
    getBudget(){
        // получаем месячный бюджет
        this.budgetMonth = this.budget - this.expensesMonth;
        // получаем дневной бюджет
        this.budgetDay = this.budgetMonth / 30;
       
    },
    //
    getTargetMonth(){
        return this.mission / this.budgetMonth;
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
    },
    getInfoDeposit(){
        if (this.deposit){

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10')
            } while(!isNumber(this.percentDeposit))

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000)
            } while(!isNumber( this.moneyDeposit))
            
        }
    },
    calcSavedMoney(){
       return this.budgetMonth * this.period
    },
    getExpenses(){
        this.addExpenses = this.addExpenses.map(item => {
            let newItem = item.toLowerCase();
            let a = newItem.slice(0, 1).toUpperCase();
            let b = newItem.slice(1);
            return a + b;
          
        });
        console.log(this.addExpenses.join(', '));
    }

}

appData.asking();

// получение суммы обязательных расходов за месяц
appData.getExpensesMonth();

// получение цифры: доход минус расход 
appData.getBudget();

console.log('сумма всех обязательных расходов за месяц: ' + appData.expensesMonth);

console.log(Math.floor(appData.getTargetMonth()) < 0 ? 'Цель не будет достигнута' : 'цель будет достигнута через ' + Math.floor(appData.getTargetMonth()) + ' месяцев');

appData.getStatusIncome();

// вывести все ключи объекта appData
console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    // console.log('Ключ ' + key + '\n' + 'Значение ' + appData[key]);
}
appData.getInfoDeposit()
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

appData.getExpenses()