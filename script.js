const block = document.querySelector('.block');
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const wrapper = document.querySelector('.wrapper');

let count = 0;
let isMove = false;

function move() {
    if (count > Number(wrapper.offsetWidth) - Number(block.offsetWidth)){
        count = 0;
    } 
    count += 5
    block.style.left = count + 'px';
    interval = requestAnimationFrame(move)
}

start.addEventListener('click', () => {
    if (!isMove){
        interval = requestAnimationFrame(move)
        isMove = true
    }  else {
        cancelAnimationFrame(interval)
        isMove = false;
    }
})

reset.addEventListener('click', () => {
    cancelAnimationFrame(interval);
    isMove = false;
    count = 0;
    block.style.left = count + 'px';
})
