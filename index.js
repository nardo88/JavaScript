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
// получим все input
let inputs = document.querySelectorAll('input[type=text]');



class AppData {
    constructor() {
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
    }

    // старт приложения
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
        inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach(item => {
            item.disabled = true;
        })
        // скрываем кнопку start
        start.style.display = 'none';

        // показываем кнопку cancel
        cancel.style.display = 'block';
    }

    // сброс приложения
    reset() {

        // блокируем все input
        inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        })
        periodSelect.value = 1;
        titlePeriodAmount.textContent = '1'
        start.style.display = 'block';
        start.disabled = true
        cancel.style.display = 'none';

        // возвращаем отображение кнопок с плюсами
        plusExpensis.style.display = 'block';
        plusIncome.style.display = 'block';

        // удаление дополнительных полей с помощью цикла
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');

        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[i].remove();
        }

        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[i].remove();
        }

        // сброси значений на дефолтные
        const newAppData = new AppData();
        Object.assign(this, newAppData);
    }

    // добавление дополнительных полей обязательных расходров
    addExpensesBlock() {

        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        // очищаем поля input у клона
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpensis);
        expensesItems = document.querySelectorAll('.expenses-items');

        // запрет на ввод не корректных значений значений
        expensesItems.forEach(item => {
            item.children[0].addEventListener('input', () => {this.checkInputString(item.children[0])});

            item.children[1].addEventListener('input', () => {
                this.checkInputNumber(item.children[1]);
            });
        })


        if (expensesItems.length === 3) {
            plusExpensis.style.display = 'none';
        }
    }

    // добавление дополнительных полей доходов
    addIncomeBlock() {
        const cloneIncomeItems = incomeItems[0].cloneNode(true);
        // очищаем поля input у клона
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
        incomeItems = document.querySelectorAll('.income-items');
       
        // запрет на ввод не корректных значений значений
        incomeItems.forEach(item => {
            
            item.children[0].addEventListener('input', () => { 
                this.checkInputString( item.children[0] )
            } );

            item.children[1].addEventListener('input', () => {
                
                this.checkInputNumber(item.children[1])
            });
        })

        if (incomeItems.length === 3) {
            plusIncome.style.display = 'none';
        }
    }

    // получение перечня обязательных расходов
    getExpenses() {

        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses && cashExpenses) {
                this.expenses[itemExpenses] = cashExpenses;
            }
        })
    }

    // получение списка дополнительного источника заработка
    getIncome() {

        incomeItems.forEach(item => {
            const incomeTitle = item.querySelector('.income-title').value;
            const incomeAmount = item.querySelector('.income-amount').value;

            if (incomeTitle && incomeAmount) {
                this.income[incomeTitle] = incomeAmount;
            }
        })



        for (let key in this.income) {
            this.incomeMonth += +this.income[key]
        }
    }


    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item) {
                this.addExpenses.push(item);
            }
        })
    }

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
    }

    getAddIncome() {
        additionalIncomeItems.forEach(item => {
            const itemValue = item.value.trim()
            if (itemValue) {
                this.addIncome.push(itemValue)
            }
        })
    }

    // метод получения списка обязательных расходов и 
    //суммы денег на эти расходы за месяц
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    // метод получения цифры: доход минус расход
    getBudget() {
        // получаем месячный бюджет
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        // получаем дневной бюджет
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

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
    }

    getInfoDeposit() {

        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10')
            } while (!this.isNumber(this.percentDeposit))

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000)
            } while (!this.isNumber(this.moneyDeposit))

        }
    }


    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    eventsListeners(start, cancel, salaryAmount, periodSelect) {
        // запуск
        start.addEventListener('click', this.start.bind(this));
        // Сброс
        cancel.addEventListener('click', this.reset.bind(this));
        // блокируем кнопку старт
        start.disabled = true
        // разблокируем кнопку если ввели текст в полу бюджет
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '') {
                start.disabled = false
            } else {
                start.disabled = true

            }
        })
        // при движении бегунка в заголовок перезаписывает число
        periodSelect.addEventListener('input', () => {
            titlePeriodAmount.textContent = periodSelect.value
        })
        // добавление блоков по нажатии на плюсики
        plusExpensis.addEventListener('click', this.addExpensesBlock.bind(this))
        plusIncome.addEventListener('click', this.addIncomeBlock.bind(this))
        // проверки полей

        // поле Месячный доход
        salaryAmount.addEventListener('input', () => {this.checkInputNumber(salaryAmount)})
        // цель
        targetAmount.addEventListener('input', () => {this.checkInputNumber(targetAmount)})
        // дополнительный доход (сумма)
        incomeAmount.addEventListener('input', () => {this.checkInputNumber(incomeAmount)})
        // Обязательные расходы (сумма)
        expensesAmount.addEventListener('input', () => {this.checkInputNumber(expensesAmount)})

        // поля доп доход (наименование)
        incomeTitle.forEach(item => {
            item.addEventListener('input', () => { this.checkInputString(item) })
        })

        additionalIncomeItems.forEach(item => {
            item.addEventListener('input', this.checkInputString)
        })
        expensesTitle.addEventListener('input', () => {this.checkInputString(expensesTitle)})
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isString(str) {
        // добавил регулярное выражение для проверки символов кириллицы
        if (!parseFloat(str) && str !== null && str.trim() !== '' && /[А-Я-\s-,-.-:-;]$/i.test(str)) {
            return true
        } else {
            return false
        }
    }
    checkInputNumber(elem) {
        if (!this.isNumber(elem.value)) {
            
            elem.value = '';
        }
    }

    checkInputString(elem) {
        if (!this.isString(elem.value)) {
            elem.value = '';
        }
    }
}

const appData = new AppData()
appData.eventsListeners(start, cancel, salaryAmount, periodSelect)




