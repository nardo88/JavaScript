document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const promise = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) return
                if (request.status === 200 && select.value !== 'no'){
                    resolve(JSON.parse(request.responseText))
                } else {
                    reject('Произошла ошибка')
                }
            })
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        })

        promise
            .then(data => {
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch(data => output.innerHTML = data)
    
    });

});