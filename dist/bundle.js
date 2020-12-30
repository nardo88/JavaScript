(function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const n=function(){function n(t){var r,o=t.selector,a=t.pattern,i=void 0===a?{}:a,c=t.method;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.form=document.querySelector(o),this.pattern=i,this.method=c,this.elementsForm=(r=this.form.elements,function(t){if(Array.isArray(t))return e(t)}(r)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(r)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return"button"!==e.tagName.toLowerCase()&&"button"!==e.type})),this.error=new Set}var r,o;return r=n,(o=[{key:"init",value:function(){var e=this;this.applyStyle(),this.setPattern(),this.elementsForm.forEach((function(t){return t.addEventListener("change",e.checkIt.bind(e))})),this.form.addEventListener("submit",(function(t){return e.elementsForm.forEach((function(t){e.checkIt({target:t})})),e.error.size&&t.preventDefault(),"error"}))}},{key:"sayError",value:function(){return this.error}},{key:"isValid",value:function(e){var t=this,n={notEmpty:function(e){return""!==e.value.trim()},pattern:function(e,t){return t.test(e.value)}};if(this.method){var r=this.method[e.id];if(r)return r.every((function(r){return n[r[0]](e,t.pattern[r[1]])}))}else console.warn("Необходимо передать id полей ввода и методы проверки этих полей!");return!0}},{key:"checkIt",value:function(e){var t=e.target;this.isValid(t)?(this.showSuccess(t),this.error.delete(t)):(this.showError(t),this.error.add(t))}},{key:"showError",value:function(e){if(e.classList.remove("success"),e.classList.add("error"),!e.nextElementSibling||!e.nextElementSibling.classList.contains("validator-error")){var t=document.createElement("div");t.textContent="Ошибка в этом поле",t.classList.add("validator-error"),e.insertAdjacentElement("afterend",t)}}},{key:"showSuccess",value:function(e){e.classList.remove("error"),e.classList.add("success"),e.nextElementSibling&&e.nextElementSibling.classList.contains("validator-error")&&e.nextElementSibling.remove()}},{key:"applyStyle",value:function(){var e=document.createElement("style");e.textContent="\n            input.success{\n                border: 2px solid green;\n            }\n\n            input.error{\n                border: 2px solid red;\n                box-shadow: 0 0 10px 10px red;\n                \n            }\n            .validator-error{\n                font-size: 12px;\n                color: red;\n                font-family: sans-serif;\n                position: absolute;\n                bottom: -20px;\n                padding: 5px 10px;\n                background: #fff;\n                border-radius: 5px;\n                border: 2px solid black;\n                z-index: 100;\n                \n            }\n\n            .validator-error:after{\n                content: '';\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                background: #fff;\n                top: -7px;\n                transform: rotate(-135deg);\n                left: 20px;\n                border-right: 2px solid black;\n                border-bottom: 2px solid black;\n            }\n        ",document.head.appendChild(e)}},{key:"setPattern",value:function(){this.pattern.phone||(this.pattern.phone=/^\+?[78]([-()]*\d){10}$/),this.pattern.email||(this.pattern.email=/\w+@\w+\.\w{2,3}/)}}])&&t(r.prototype,o),n}();function r(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var a,i,c,s,l,u,m,d,f,p,v,h,y,b,g,E;h="31 December  2020",y=document.querySelector("#timer-hours"),b=document.querySelector("#timer-minutes"),g=document.querySelector("#timer-seconds"),E=setInterval((function(){var e,t,n,r=(e=(new Date(h).getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),n=Math.floor(e/60%60),{timeRemaining:e,hours:Math.floor(e/60/60),minutes:n,second:t});r.timeRemaining<=0?(clearInterval(E),y.textContent="00",b.textContent="00",g.textContent="00"):(y.textContent=r.hours<10?"0"+r.hours:r.hours,b.textContent=r.minutes<10?"0"+r.minutes:r.minutes,g.textContent=r.second<10?"0"+r.second:r.second)}),1e3),p=document.querySelector("menu"),v=function(){p.classList.toggle("active-menu")},document.body.addEventListener("click",(function(e){var t=e.target;if(t.closest(".menu"))v();else if(t.classList.contains("close-btn"))e.preventDefault(),v();else if(t.matches("ul>li>a")){e.preventDefault(),v();var n=document.querySelector("#".concat(e.target.href.split("#")[1])).offsetTop;window.scrollTo({top:n,behavior:"smooth"})}else"MENU"!==t.tagName&&p.classList.remove("active-menu")})),m=document.querySelector(".popup"),d=document.querySelectorAll(".popup-btn"),f=document.querySelector(".popup-content"),d.forEach((function(e){e.addEventListener("click",(function(){m.style.display="block",window.innerWidth>768&&function(){f.style.left="-50%",f.style.transform="translate(-50%)";var e=-50;requestAnimationFrame((function t(){e+=5,f.style.left="".concat(e,"%");var n=requestAnimationFrame(t);50===e&&cancelAnimationFrame(n)}))}()}))})),m.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?m.style.display="none":(t=t.closest(".popup-content"))||(m.style.display="none")})),(u=document.querySelector("main>a")).addEventListener("click",(function(e){e.preventDefault();var t=document.querySelector("#".concat(u.href.split("#")[1])).offsetTop;window.scrollTo({top:t,behavior:"smooth"})})),c=document.querySelector(".service-header"),s=c.querySelectorAll(".service-header-tab"),l=document.querySelectorAll(".service-tab"),c.addEventListener("click",(function(e){var t=e.target.closest(".service-header-tab");t&&s.forEach((function(e,n){e===t&&function(e){for(var t=0;t<l.length;t++)e===t?(s[t].classList.add("active"),l[t].classList.remove("d-none")):(s[t].classList.remove("active"),l[t].classList.add("d-none"))}(n)}))})),function(){for(var e=document.querySelectorAll(".portfolio-item"),t=document.querySelector(".portfolio-content"),n=document.querySelector(".portfolio-dots"),r=0;r<e.length;r++){var o=document.createElement("li");o.classList.add("dot"),n.insertAdjacentElement("afterbegin",o)}var a=document.querySelectorAll(".dot");a[0].classList.add("dot-active");var i,c=0,s=function(e,t,n){e[t].classList.remove(n)},l=function(e,t,n){e[t].classList.add(n)},u=function(){s(e,c,"portfolio-item-active"),s(a,c,"dot-active"),++c>=e.length&&(c=0),l(e,c,"portfolio-item-active"),l(a,c,"dot-active")},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;i=setInterval(u,e)};t.addEventListener("click",(function(t){t.preventDefault();var n=t.target;n.matches(".portfolio-btn, .dot")&&(s(e,c,"portfolio-item-active"),s(a,c,"dot-active"),n.matches("#arrow-right")?c++:n.matches("#arrow-left")?c--:n.matches(".dot")&&a.forEach((function(e,t){e===n&&(c=t)})),c>=e.length&&(c=0),c<0&&(c=e.length-1),l(e,c,"portfolio-item-active"),l(a,c,"dot-active"))})),t.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(i)})),t.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&m(1500)})),m(1500)}(),a=document.querySelectorAll(".command__photo"),i=function(e){var t=e.target.src;e.target.src=e.target.dataset.img,e.target.dataset.img=t},a.forEach((function(e){e.addEventListener("mouseenter",i),e.addEventListener("mouseout",i)})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelectorAll(".calc-block>input"),n=document.querySelector(".calc-block"),r=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),a=document.querySelector(".calc-day"),i=document.querySelector(".calc-count"),c=document.getElementById("total");t.forEach((function(e){e.addEventListener("input",(function(){e.value=e.value.replace(/\D/,"")}))}));var s=function(e){var t=0,n=setInterval((function(){t+=50,c.textContent=t,t>e&&(clearInterval(n),c.textContent=e)}),10)},l=function(e,t){var n;return function(){var r=arguments,o=function(){return e.apply(null,r)};clearTimeout(n),n=setTimeout(o,t)}},u=l(s,1e3),m=function(){var t=0,n=1,c=1,s=r.options[r.selectedIndex].value,l=+o.value;i.value>1&&(n+=(i.value-1)/10),a.value&&a.value<5?c*=2:a.value&&a.value<10&&(c*=1.5),s&&l&&(t=Math.floor(e*s*l*n*c),u(t))};n.addEventListener("change",(function(e){var t=e.target;(t.matches(".calc-type")||t.matches(".calc-square")||t.matches(".calc-day")||t.matches(".calc-count"))&&m()}))}(100),function(){var e=new n({selector:"#form1",pattern:{name:/^[а-яА-Я\s]+$/,phone:/^\+?(\d{11})$/},method:{"form1-phone":[["notEmpty"],["pattern","phone"]],"form1-email":[["notEmpty"],["pattern","email"]],"form1-name":[["notEmpty"],["pattern","name"]]}});e.init();var t=new n({selector:"#form3",pattern:{name:/^[а-яА-Я\s]+$/,phone:/^\+?(\d{11})$/},method:{"form3-phone":[["notEmpty"],["pattern","phone"]],"form3-email":[["notEmpty"],["pattern","email"]],"form3-name":[["notEmpty"],["pattern","name"]],"form3-message":[["notEmpty"],["pattern","name"]]}});t.init();var a=new n({selector:"#form2",pattern:{name:/^[а-яА-Я\s]+$/,phone:/^\+?(\d{11})$/},method:{"form2-phone":[["notEmpty"],["pattern","phone"]],"form2-email":[["notEmpty"],["pattern","email"]],"form2-name":[["notEmpty"],["pattern","name"]],"form2-message":[["notEmpty"],["pattern","name"]]}});a.init();var i=document.querySelector(".loader");function c(n){var c=0,s=n.id;switch(s){case"form1":c=e.sayError().size;break;case"form2":c=a.sayError().size;break;case"form3":c=t.sayError().size}if(!c){i.classList.add("open");var u,m={},d=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=r(e))){n&&(e=n);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){s=!0,i=e},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}(new FormData(n).entries());try{for(d.s();!(u=d.n()).done;){var f=u.value;m[f[0]]=f[1]}}catch(e){d.e(e)}finally{d.f()}(function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})})(m).then((function(e){if(i.classList.remove("open"),200!==e.status)throw new Error("Что то пошло не так");"form1"===s?l.textContent="Спасибо! Мы скоро с вами свяжемся!":alert("ваше сообщение отправлено"),function(e){var t;(t=e.elements,function(e){if(Array.isArray(e))return o(e)}(t)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(t)||r(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return"button"!==e.tagName.toLowerCase()&&"button"!==e.type})).forEach((function(e){return e.value=""}))}(n)})).catch((function(e){i.classList.remove("open"),"form1"===s?l.textContent="Что то пошло не так":alert("ваше сообщение не отправлено"),console.log(e)}))}}var s=document.getElementById("form1"),l=document.createElement("div");s.appendChild(l),document.addEventListener("submit",(function(e){e.preventDefault(),c(e.target)}))}()})();