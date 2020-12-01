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
// в задании не сказано каждый элементв  отдельную переменную
// первый вариант
const inputs = document.getElementsByTagName('input')
const inputsValue = []
for (let item of inputs){
    if(item.className.includes('-value')){
        inputsValue.push(item)
    }
}
// второй вариант так как все элементы в право части имеют общий класс result-total
const inputValue = document.getElementsByClassName('result-total')

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