import Validator from './validator.js'

const sendingForm = () => {

    // валидация первой формы 
    const validForm1 = new Validator({
        selector: '#form1',
        pattern: {
            name: /^[а-яА-Я\s]+$/,
            phone: /^\+?(\d{11})$/
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

    // валидация формы popup
    const validForm3 = new Validator({
        selector: '#form3',
        pattern: {
            name: /^[а-яА-Я\s]+$/,
            phone: /^\+?(\d{11})$/

        },
        method: {
            'form3-phone': [
                ['notEmpty'],
                ['pattern', 'phone'],
            ],
            'form3-email': [
                ['notEmpty'],
                ['pattern', 'email'],
            ],
            'form3-name': [
                ['notEmpty'],
                ['pattern', 'name'],
            ],
            'form3-message': [
                ['notEmpty'],
                ['pattern', 'name'],
            ],
        }
    })
    validForm3.init();

    // валидация form 2
    const validForm2 = new Validator({
        selector: '#form2',
        pattern: {
            name: /^[а-яА-Я\s]+$/,
            phone: /^\+?(\d{11})$/

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

    // очищение input
    function clearInput(form) {
        [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button').forEach(item => item.value = '')
    }


    const loader = document.querySelector('.loader');

    // функция отправки формы
    function postData(body) {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    const showMessage = (form, text) => {
        const statusMessage = document.createElement('div');
        statusMessage.style.color ='#fff';
        statusMessage.textContent = text
        form.appendChild(statusMessage);

        setTimeout(() => {
            form.removeChild(statusMessage);
        }, 7000)
    }

    function sendForm(form) {
        let notValidate = 0
        
        const id = form.id;
        switch (id) {
            case 'form1':
                notValidate = validForm1.sayError().size;
                break;
            case 'form2':
                notValidate = validForm2.sayError().size;
                break;
            case 'form3':
                notValidate = validForm3.sayError().size;
                break;
        }

        if (!notValidate) {
            loader.classList.add('open');
            const formData = new FormData(form)
            let body = {};
            // заполняем объект body
            for (let val of formData.entries()) {
                body[val[0]] = val[1];
            }
            postData(body)
                .then(response => {
                    loader.classList.remove('open')
                    if (response.status !== 200) {
                        throw new Error('Что то пошло не так')
                    }
                    showMessage(form, 'Спасибо! Мы скоро с вами свяжемся!')
                    clearInput(form);
                })
                .catch(error => {
                    loader.classList.remove('open')
                    showMessage(form, 'Что то пошло не так')
                });
        }

    }
    // обрабатываем форму в main
    // const form = document.getElementById('form1');



    document.addEventListener('submit', (event) => {
        event.preventDefault();
        sendForm(event.target);
    })

};

export default sendingForm