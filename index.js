// Кнопку "Рассчитать" через id
const start = document.getElementById('start');
// Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
const buttons = document.getElementsByTagName('button');
const plus1 = buttons[0];
const plus2 = buttons[1];

// Чекбокс по id через querySelector
const depositCheck = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
// доход за месяц 
const budgetMonth = document.getElementsByClassName('result-total')[0]
// Дневной бюджет
const budgetDay = document.getElementsByClassName('result-total')[1]
// Расход за месяц
const expensesMonth = document.getElementsByClassName('result-total')[2]
// Возможные доходы
const additionalIncome = document.getElementsByClassName('result-total')[3]
// Возможные расходы
const additionalExpenses = document.getElementsByClassName('result-total')[4]
// Накопления за период
const incomePeriod = document.getElementsByClassName('result-total')[5]
// Срок достижения цели в месяцах
const targetMonth = document.getElementsByClassName('result-total')[6]

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// оставшиеся поля в правой части? там 7 полей и все имеют -value


// поля ввода (input) с левой стороны и не забудьте про range.
// поля возможных доходов и checkbox мы получили ранее 
const salaryAmount = document.querySelector('.salary-amount')
const incomeTitle = document.querySelector('input.income-title')
const expensesTitle = document.querySelector('input.expenses-title')
const incomeAmount = document.querySelector('.income-amount')
const expensesAmount = document.querySelector('.expenses-amount')
const additionalExpensesItem = document.querySelector('.additional_expenses-item')
const targetAmount = document.querySelector('.target-amount')
// range
const periodSelect = document.querySelector('.period-select')