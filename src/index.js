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



