// Введённый в поле текст должен отображаться внутри параграфа,
// но с задержкой в 300 мс.

// При этом каждый введённый пользователем в поле символ сбрасывает 
// предыдущий отложенный вызов и запускает новый.

// Таким образом программа должна ожидать завершения ввода
// пользователя и только после этого изменять текст в <p></p>


const input = document.querySelector('.input');
const text = document.querySelector('.text');

function inputText(){
    text.textContent = input.value
}

function throttle(func, ms) {

    let isThrottled = false,
      savedArgs,
      savedThis;
  
    function wrapper() {
  
      if (isThrottled) { 
        savedArgs = arguments;
        savedThis = this;
        return;
      }
  
      func.apply(this, arguments);
  
      isThrottled = true;
  
      setTimeout(function() {

        isThrottled = false; 
        
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
  }

let f1000 = throttle(inputText, 300);

input.addEventListener('input', f1000 )
