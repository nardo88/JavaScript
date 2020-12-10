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

// елементы для депозита
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');


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
        this.getExpInc();
        this.getExpensesMonth();

        this.getAddExpInc(additionalExpensesItem.value)
        this.getAddExpInc(additionalIncomeItems)

        this.getInfoDeposit()
        this.getBudget();
        this.showResult();

        // блокируем все input
        const inputs = document.querySelectorAll('input[type=text]');
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
        const inputs = document.querySelectorAll('input[type=text]');
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

        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
    }
    // ============================================================================================================== НАЧАЛО addExpensesBlock addIncomeBlock=========================

    // добавление дополнительных полей и  доходов и срасходов
    addIncExpBlock(item, button) {
        // создаем клона
        const cloneItem = item[0].cloneNode(true);
        // у клона в дочерних элементах очищаем поля
        cloneItem.children[0].value = '';
        cloneItem.children[1].value = '';
        // вставка клона
        item[0].parentNode.insertBefore(cloneItem, button)
        // получаем часть класс оригинала
        const startStr = item[0].className.split('-')[0]
        // ищем все элементы с нужным классом
        item = document.querySelectorAll(`.${startStr}-items`);
        // переписываем глобальную переменную иначе данные новых полей не запишутся в объект
        startStr === 'expenses' ? expensesItems = item :
            startStr === 'income' ? incomeItems = item :
            null
        // проверка полей
        item.forEach(elem => {
            elem.children[0].addEventListener('input', () => {
                this.checkInputString(elem.children[0])
            });
            elem.children[1].addEventListener('input', () => {
                this.checkInputNumber(elem.children[1])
            });
        })
        // ограничение количества полей
        if (item.length === 3) {
            button.style.display = 'none';
        }

    }

    // ============================================================================================КОНЕЦ addExpensesBlock addIncomeBlock=========================




    // получение перечня обязательных расходов==========================================================НАЧАЛО getExpenses getIncome================

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
    // общий метод который получает и доходы и расходы
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0]
            const itemTitle = item.querySelector(`.${startStr}-title`).value
            const itemAmount = item.querySelector(`.${startStr}-amount`).value

            if (itemTitle && itemAmount) {
                this[startStr][itemTitle] = itemAmount;
            }

        }

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key]
        }
    }
    //===============================================================================================================  КОНЕЦ getExpenses getIncome==============




    // ==========================================================================================Начало getAddExpenses getAddIncome========================
    // этот метод разбивает строку на массив
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        // затем пробегается по массиву
        addExpenses.forEach(item => {
            item = item.trim();
            // если значение не пустое значение пушится в addExpenses
            if (item) {
                this.addExpenses.push(item);
            }
        })
    }

    // этот метод пробегается по коллекции полей и их значения помещает в массив addIncome
    getAddIncome() {
        additionalIncomeItems.forEach(item => {
            const itemValue = item.value.trim()
            if (itemValue) {
                this.addIncome.push(itemValue)
            }
        })
    }
    // так как функции getAddIncome и getAddExpenses принимают разные типы входных параметров
    // то нужно в начале создать проверку на тип входных данных
    getAddExpInc(value) {
        // если входной параметр - строка
        if (typeof value === 'string') {
            // разбиваем строку на массив
            const addExpenses = value.split(',');
            // затем пробегается по массиву
            addExpenses.forEach(item => {
                item = item.trim();
                // если значение не пустое значение пушится в addExpenses
                if (item) {
                    this.addExpenses.push(item);
                }
            })
            // иначе
        } else {
            // входной параметр будет массивом
            value.forEach(item => {
                const itemValue = item.value.trim()
                if (itemValue) {
                    this.addIncome.push(itemValue)
                }
            })
        }

    }

    // ==========================================================================================Конец getAddExpenses getAddIncome========================


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



    // метод получения списка обязательных расходов и 
    //суммы денег на эти расходы за месяц
    getExpensesMonth() {
        for (let key in this.expenses) {

            this.expensesMonth += +this.expenses[key];
        }

    }

    // метод получения цифры: доход минус расход
    getBudget() {

        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        // получаем месячный бюджет
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

   


    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

     // метод указания депозита====================================================================ДЕПОЗИТ==============================
     getInfoDeposit() {

        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent(){
        const valueSelect = this.value
        if (valueSelect === 'other'){
            depositPercent.style.display = 'inline-block'

        } else {
            depositPercent.style.display = 'none'
            depositPercent.value = valueSelect
            
        }
    }

    // метод изменения checkbox
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;

            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none'
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            depositPercent.style.boxShadow = '';
            this.deposit = false;

            depositBank.removeEventListener('change', this.changePercent);


        }
    }


    // вешаем события======================================================================СОБЫТИЯ--=========================================================
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
        plusExpensis.addEventListener('click', () => {
            this.addIncExpBlock(expensesItems, plusExpensis)
        })
        plusIncome.addEventListener('click', () => {
            this.addIncExpBlock(incomeItems, plusIncome)
        })
        // проверки полей
        salaryAmount.addEventListener('input', () => {
            this.checkInputNumber(salaryAmount)
        });
        targetAmount.addEventListener('input', () => {
            this.checkInputNumber(targetAmount)
        })
        incomeAmount.addEventListener('input', () => {
            this.checkInputNumber(incomeAmount)
        })
        expensesAmount.addEventListener('input', () => {
            this.checkInputNumber(expensesAmount)
        })

        additionalExpensesItem.addEventListener('input', () => {
            this.checkInputString(additionalExpensesItem)
        })

        incomeTitle.forEach(item => {
            item.addEventListener('input', () => {
                this.checkInputString(item)
            })
        })



        additionalIncomeItems.forEach(item => {
            item.addEventListener('input', () => {

                this.checkInputString(item)
            })
        })
        expensesTitle.addEventListener('input', () => {
            this.checkInputString(expensesTitle)
        })


        depositCheck.addEventListener('change', this.depositHandler.bind(this))


        // проверка поля процента банка
        depositPercent.addEventListener('change', () => { 
            if (!this.isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value <= 0){
                depositPercent.value = ''
                depositPercent.style.boxShadow = '0px 0px 5px 5px red';
                start.disabled = true
            } else {
                depositPercent.style.boxShadow = '';
                start.disabled = false
                this.percentDeposit = +depositPercent.value;
            }
        });
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

    checkInputString(elem) {
        if (!appData.isString(elem.value)) {
            elem.value = '';
        }
    }

    checkInputNumber(elem) {
        if (!appData.isNumber(elem.value)) {
            elem.value = '';
        }
    }
}

const appData = new AppData()
appData.eventsListeners(start, cancel, salaryAmount, periodSelect)