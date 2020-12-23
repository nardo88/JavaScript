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



    // slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');
        
        // добавление dot в слайдер
        for (let i = 0; i < slide.length; i++){
            const dotItem = document.createElement('li');
            dotItem.classList.add('dot');
            portfolioDots.insertAdjacentElement('afterbegin', dotItem);
        };
        // только затем получаем все dot
        const dot = document.querySelectorAll('.dot');
        // и первому даем активный класс
        dot[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);

        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length){
                currentSlide = 0;
            };
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) =>{
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () =>{
            clearInterval(interval);
        };

        slider.addEventListener('click', e => {
            e.preventDefault();

            let target = e.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            };

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((item,i) => {
                    if (item === target){

                        currentSlide = i;
                    };
                });
            };

            if (currentSlide >= slide.length){
                currentSlide = 0;
            };

            if (currentSlide < 0){
                currentSlide = slide.length - 1;;
            };
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', e => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                stopSlide();
            };
        });

        slider.addEventListener('mouseout', e => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                startSlide(1500);
            };
        });

        startSlide(1500);
    };
    slider();



    // наша команда (замена картинок)

    const changeImage = () =>{
        const wrapperImages = document.querySelectorAll('.command__photo');
        const togleImage = (e) => {
            let old = e.target.src;
                e.target.src = e.target.dataset.img;
                e.target.dataset.img = old;
        };
        wrapperImages.forEach(item => {
            item.addEventListener('mouseenter', togleImage);
            item.addEventListener('mouseout', togleImage);
        });
       
    }
    changeImage();


    // калькулятор

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
                count+=50
                totalValue.textContent = count
                if(count > value){
                    clearInterval(interval)
                    totalValue.textContent = value
                }
            },10)

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

            if (calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5){
                dayValue *= 2 ;
            } else if(calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }

            if(typeValue && squareValue){
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
                f5000(total)
            } 
            
        }

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')){
                countSum()
            }
        })


    }
    calculator(100);


    // подключаем валидотор
    const validators = () => {

        // форма оставить заявку
        const validForm1 = new Validator({
            selector: '#form1',
            pattern: {
                name : /[^a-zA-Z]+/
            },
            method: {
                'form1-phone': [
                    ['notEmpty'],
                    ['pattern', 'phone'],
                ],
                'form1-email': [
                    ['notEmpty'],
                    ['pattern', 'email'],

                ],
                'form1-name': [
                    ['notEmpty'],
                    ['pattern', 'name'],

                ],
            }
        })

        validForm1.init();


        // Остались вопросы
        const validForm2 = new Validator({
            selector: '#form2',
            pattern: {
                name : /[^a-zA-Z]+/

            },
            method: {
                'form2-phone': [
                    ['notEmpty'],
                    ['pattern', 'phone'],
                ],
                'form2-email': [
                    ['notEmpty'],
                    ['pattern', 'email'],

                ],
                'form2-name': [
                    ['notEmpty'],
                    ['pattern', 'name'],

                ],
                'form2-message': [
                    ['notEmpty'],
                    ['pattern', 'name'],

                ],
            }
        })

        validForm2.init();
    }
    validators()
})