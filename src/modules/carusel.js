'use strict';



class SliderCarusel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = [],
    }) {

        if (!main || !wrap) {
            console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"! ');
        }

        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            widthSlides: Math.floor(100 / this.slidesToShow),
            infinity,
            maxPosition: this.slides.length - this.slidesToShow
        }

        this.responsive = responsive
    }
    // инициализация слайдера
    init() {

        
        this.addGloClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();

        }
        if (this.responsive){
            
            this.responseInit();
        }
    }
    // добавляем классы
    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');

        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }
    // прописываем стили
    addStyle() {
        let style = document.getElementById('styleCarousel-style');

        if (!style){
            style = document.createElement('style');
            style.id = 'styleCarousel-style';
        }
        
        style.textContent = `
                .glo-slider{
                    overflow: hidden !important;
                }

                .glo-slider__wrap{
                    display: flex !important;
                    transition: transform 0.5s !important;
                    will-change: transform !important;
                }

                .glo-slider__item{
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center;
                    flex: 0 0 ${this.options.widthSlides}%;
                    margin: auto 0 !important;
                }

                .glo-slider__prev, .glo-slider__next{
                    margin: 0 10px;
                    border: 20px solid transparent;
                    background: transparent;
                    cursor: pointer;
                    outline: none;
                }

                .glo-slider__prev{
                    border-right-color: #19b5fe;
                }

                .glo-slider__next{
                    border-left-color: #19b5fe;
                }

                .glo-slider__prev,
                .glo-slider__next:hover{
                    background: transparent !important;
                }
                
                
            `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this))
        this.next.addEventListener('click', this.nextSlider.bind(this))
    }
    // показать следующий слайдер
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlides}%)`;
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }

            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlides}%)`;

        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.classList.add('glo-slider__prev');
        this.next.classList.add('glo-slider__next');

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breackpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse){
                for(let i = 0; i < allResponse.length; i++){
                    if (widthWindow < allResponse[i]){
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlides = Math.floor(100 / this.slidesToShow);
                        this.addStyle()
                    } 
                    
                } 
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlides = Math.floor(100 / this.slidesToShow);
                this.addStyle()
            }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse)
    }
}





export default SliderCarusel