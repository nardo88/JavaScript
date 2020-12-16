window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    


    // timer
    function countTimer (deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                second = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

                return {timeRemaining, hours, minutes, second};
        }
        
        function updateClock(){
            let timer = getTimeRemaining();
            // если акция закончилась то выключаем таймер
            if (timer.timeRemaining <= 0){
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

        let updateClockInterval = setInterval(updateClock, 1000)
    };

    countTimer('31 December  2020');

    // menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        

        // функция открытия и закртия меню
        const actionMenu = () => {
            menu.classList.toggle('active-menu')
        }

        // усложненное задание
        document.body.addEventListener('click', e => {

            let target = e.target;
            // клик по бургеру
            if (target.closest('.menu')){
                actionMenu()
            // клик по крестику
            } else if (target.classList.contains('close-btn')){
                e.preventDefault();
                actionMenu();
            // клик по элементам меню
            } else  if (target.matches('ul>li>a')){
                e.preventDefault();
                actionMenu();
                let ScrollHeigth = document.querySelector(`#${e.target.href.split('#')[1]}`).offsetTop;
                // скролим плавно
                window.scrollTo({top: ScrollHeigth, behavior: 'smooth'});
            // клик мимо меню
            } else if (target.tagName !== 'MENU'){
                menu.classList.remove('active-menu');
            }
        })
       
    };
    toggleMenu();


    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        const animatePopup = () => {
            popupContent.style.left = `-50%`;
            popupContent.style.transform = `translate(-50%)`;
            let count = -50;

            const move = () => {
                count +=5;
                popupContent.style.left = `${count}%`;
                let animate = requestAnimationFrame(move)

                if (count === 50){
                    cancelAnimationFrame(animate)
                }
            }

            requestAnimationFrame(move)
        }

        popupBtn.forEach(item => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
                if (window.innerWidth > 768){
                    animatePopup()
                }
                
            })
        })


        popup.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';

            } else {
                target = target.closest('.popup-content');
                if (!target){
                    popup.style.display = 'none';
                }
            }

            
        })
    }

    togglePopup();

    // scroll
    const scrollToDown = () => {
        const link = document.querySelector('main>a');
        link.addEventListener('click', (e) => {
            e.preventDefault()
            let ScrollHeigth = document.querySelector(`#${link.href.split('#')[1]}`).offsetTop;
            // скролим плавно
            window.scrollTo({top: ScrollHeigth, behavior: 'smooth'});
        })
    }
    scrollToDown()


    // табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i){
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    }
        tabHeader.addEventListener('click', e => {
            let target = e.target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if (item === target){
                        toggleTabContent(i)
                    }
                })
            }
                   
              
            
        })




    };

    tabs();







})