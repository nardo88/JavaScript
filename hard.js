const trimString = (str) => typeof str !== 'string' 
        ? 'данные не корректны' 
        : str.length < 30 
            ? str.trim()
            : str.trim().substring(0, 30) + '...'


console.log(trimString(' строка '));
console.log(trimString(10));

let bigStr = '   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea repudiandae hic delectus ut eaque eveniet, optio nisi, quod fugit vero ipsum rerum vel. Reprehenderit commodi suscipit laborum facere. Optio voluptatem numquam eligendi iusto eveniet repellat quaerat sunt quis reiciendis quibusdam!   '

console.log(trimString(bigStr));

// проверка
console.log(trimString(bigStr).length);
