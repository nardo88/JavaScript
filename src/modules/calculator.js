const calculator = (price = 100) => {
    const calcItem = document.querySelectorAll('.calc-block>input'),
        calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    calcItem.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })

    const animateTotalValue = value => {
        let count = 0
        let interval = setInterval(() => {
            count += 50
            totalValue.textContent = count
            if (count > value) {
                clearInterval(interval)
                totalValue.textContent = value
            }
        }, 10)

    }



    const debounce = (fn, ms) => {
        let timeOut;
        return function () {
            const fnCall = () => fn.apply(null, arguments);
            clearTimeout(timeOut);
            timeOut = setTimeout(fnCall, ms)
        };
    }

    const f5000 = debounce(animateTotalValue, 1000);


    const countSum = () => {

        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        let squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            f5000(total)
        }

    }

    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
            countSum()
        }
    })


}


export default calculator

