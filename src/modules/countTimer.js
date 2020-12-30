function countTimer(deadLine) {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        let dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            second = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        return {
            timeRemaining,
            hours,
            minutes,
            second
        };
    }

    function updateClock() {
        let timer = getTimeRemaining();
        // если акция закончилась то выключаем таймер
        if (timer.timeRemaining <= 0) {
            // я бы здесь вообще указал timer-numbers display none
            clearInterval(updateClockInterval)
            timerHours.textContent = '00'
            timerMinutes.textContent = '00'
            timerSeconds.textContent = '00'
        } else {
            // иначе отображаем на странице часы, минуты и секунды
            timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours
            timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes
            timerSeconds.textContent = timer.second < 10 ? '0' + timer.second : timer.second
        }




    }

    let updateClockInterval = setInterval(updateClock, 10)
};

export default countTimer