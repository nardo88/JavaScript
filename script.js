// 1) Создать переменную num со значением 266219 (тип данных число)
let num = 266219;

// 2) Вывести в консоль произведение (умножение) цифр этого числа
num = String(num)
// 1 способ
let result1 = 1
for (let i = 0; i < num.length; i++){
    result1 *= Number(num[i])
}
console.log(result1);

// 2 способ
let result2 = 1
for(item of num){
    result2 *= item
}
console.log(result2);


// возвести в степень - 3
result1 = result1**3
console.log(result1);

// Вывести на экран первые 2 цифры полученного числа
console.log(String(result1).substring(0, 2));


// Ошибок в консоли нет!