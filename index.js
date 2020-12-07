// Кнопку "Рассчитать" через id
const start = document.getElementById('start');
const plusIncome = document.getElementsByTagName('button')[0];
const plusExpensis = document.getElementsByTagName('button')[1];

// Чекбокс по id через querySelector
const depositCheck = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
// доход за месяц 
const budgetMonth = document.getElementsByClassName('result-total')[0];
// Дневной бюджет
const budgetDay = document.getElementsByClassName('result-total')[1];
// Расход за месяц
const expensesMonth = document.getElementsByClassName('result-total')[2];
// Возможные доходы
const additionalIncome = document.getElementsByClassName('result-total')[3];
// Возможные расходы
const additionalExpenses = document.getElementsByClassName('result-total')[4];
// Накопления за период
const incomePeriod = document.getElementsByClassName('result-total')[5];
// Срок достижения цели в месяцах
const targetMonth = document.getElementsByClassName('result-total')[6];

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// оставшиеся поля в правой части? там 7 полей и все имеют -value


// поля ввода (input) с левой стороны и не забудьте про range.
// поля возможных доходов и checkbox мы получили ранее 
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelectorAll('input.income-title');
const expensesTitle = document.querySelector('input.expenses-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
// range
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const titlePeriodAmount = document.querySelector('.period-amount')
const income = document.querySelector('.income')
const expenses = document.querySelector('.expenses')
const cancel = document.querySelector('#cancel')


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let isString = (str) => {
    // добавил регулярное выражение для проверки символов кириллицы
    if (!parseFloat(str) && str !== null && str.trim() !== '' && /[А-Я-\s-,-.-:-;]$/i.test(str)) {
        return true
    } else {
        return false
    }
}

// создание объекта
const appData = {
    // сумма доп доходов за месяц
    incomeMonth: 0,
    // перечень доп доходов
    income: {},
    // добавление дополнительных доходов
    addIncome: [],
    // перечень до расходов
    expenses: {},
    // добавление обязательных расходов
    addExpenses: [],
    // есть ли депозит в банке
    deposit: false,
    // процент депозита
    percentDeposit: 0,
    moneyDeposit: 0,
    // месячный доход
    budget: 0,
    // дневной бюджет
    budgetDay: 0,
    // бюджет на месяц
    budgetMonth: 0,
    // месячные затраты
    expensesMonth: 0,


    // запуск приложения
    start() {
        this.budget = +salaryAmount.value
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();

        // блокируем все input
        let  inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach(item => {
            item.disabled = true;
        })
        // скрываем кнопку start
        start.style.display = 'none';

        // показываем кнопку cancel
        cancel.style.display = 'block';
    },
    reset(){
        // блокируем все input
        let  inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        })
        periodSelect.value = 1;
        titlePeriodAmount.textContent = '1'
        start.style.display = 'block';
        start.disabled = true
        cancel.style.display = 'none';
        
        income.innerHTML = `
            <div class="income-title title">Дополнительный доход</div>
            <div class="income-items">
                <input type="text" class="income-title" placeholder="Наименование">
                <input type="text" class="income-amount" placeholder="Сумма">
            </div>

            <button class="btn_plus income_add">+</button>
        `;

        expenses.innerHTML= `
            <div class="expenses-title title">Обязательные расходы</div>
            <div class="expenses-items">
                <input type="text" class="expenses-title" placeholder="Наименование">
                <input type="text" class="expenses-amount" placeholder="Сумма">
            </div>

            <button class="btn_plus expenses_add">+</button>
        `
        this.incomeMonth = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

    },
    // добавление дополнительных полей обязательных расходров
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        // очищаем поля input у клона
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensis);
        expensesItems = document.querySelectorAll('.expenses-items');
        
         // запрет на ввод не корректных значений значений
         expensesItems.forEach(item => {
            item.children[0].addEventListener('input', checkInputString)
            item.children[1].addEventListener('input', checkInputNumber)
        })


        if (expensesItems.length === 3) {
            plusExpensis.style.display = 'none';
        }
    },
    // добавление дополнительных полей доходов
    addIncomeBlock() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        // очищаем поля input у клона
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
        incomeItems = document.querySelectorAll('.income-items');

        // запрет на ввод не корректных значений значений
        incomeItems.forEach(item => {
            item.children[0].addEventListener('input', checkInputString)
            item.children[1].addEventListener('input', checkInputNumber)
        })

        if (incomeItems.length === 3) {
            plusIncome.style.display = 'none';
        }

        
    },
    // получение перечня обязательных расходов
    getExpenses() {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses && cashExpenses) {
                this.expenses[itemExpenses] = cashExpenses;
            }
        })
    },
    // получение списка дополнительного источника заработка
    getIncome() {
        incomeItems.forEach(item => {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle && incomeAmount) {
                this.income[incomeTitle] = incomeAmount;
            }
        })



        for (let key in this.income) {
            this.incomeMonth += +this.income[key]
        }
    },
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item) {
                this.addExpenses.push(item);
            }
        })
    },

    // метод вывода данных в поля input
    showResult() {


        periodSelect.addEventListener('input', () => {
            this.calcSavedMoney()
            incomePeriod.value = this.calcSavedMoney()
         
        })
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcSavedMoney()
    },

    getAddIncome() {
        additionalIncomeItems.forEach(item => {
            let itemValue = item.value.trim()
            if (itemValue) {
                this.addIncome.push(itemValue)
            }
        })
    },

    // метод получения списка обязательных расходов и 
    //суммы денег на эти расходы за месяц
    getExpensesMonth() {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

    },
    // метод получения цифры: доход минус расход
    getBudget() {
        // получаем месячный бюджет
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        // получаем дневной бюджет
        this.budgetDay = Math.ceil(this.budgetMonth / 30);

    },
    //
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome() {
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
    getInfoDeposit() {
        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10')
            } while (!isNumber(this.percentDeposit))

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000)
            } while (!isNumber(this.moneyDeposit))

        }
    },
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value
    },

}
start.disabled = true

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '') {
        start.disabled = false
    } else {
        start.disabled = true

    }
})

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('input', () => {
    titlePeriodAmount.textContent = periodSelect.value
})
plusExpensis.addEventListener('click', appData.addExpensesBlock)
plusIncome.addEventListener('click', appData.addIncomeBlock)


//==========================================================================
// проверка на число
function checkInputNumber (){
    if (!isNumber(this.value)){
        this.value = '';
    } 
}

salaryAmount.addEventListener('input', checkInputNumber)
targetAmount.addEventListener('input', checkInputNumber)
incomeAmount.addEventListener('input', checkInputNumber)
expensesAmount.addEventListener('input', checkInputNumber)

function checkInputString (){
    if (!isString(this.value)){
        this.value = '';
    } 
}

incomeTitle.forEach(item => {
    item.addEventListener('input', checkInputString)
})
additionalIncomeItems.forEach(item => {
    item.addEventListener('input', checkInputString)
})
expensesTitle.addEventListener('input', checkInputString)





