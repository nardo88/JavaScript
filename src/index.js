'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrollToDown from './modules/scrollToDown';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calculator from './modules/calculator';
import sendingForm from './modules/sendingForm';
import SliderCarusel from './modules/carusel';

countTimer('31 December  2020');
// меню
toggleMenu();
// модальное окно
togglePopup();
// плавный скролл
scrollToDown();
// табы
tabs();
// slider
slider();
// наша команда (замена картинок)
changeImage();
// калькулятор
calculator(100);
// send ajax FORM
sendingForm();


const carousel = new SliderCarusel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    // prev: '#test-left',
    // next: '#test-right',
    slidesToShow: 4,
    infinity: true,

    responsive: [
        {
            breackpoint: 1024,
            slidesToShow: 3
        },
        {
            breackpoint: 768,
            slidesToShow: 2
        },
        {
            breackpoint: 576,
            slidesToShow: 1
        }
    ]
});
carousel.init();



