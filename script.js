const headerInput = document.querySelector('.header-input'),
headerButton = document.querySelector('.header-button'),
todoList = document.querySelector('.todo-list'),
todoControl = document.querySelector('.todo-control'),
todoContainer = document.querySelector('.todo-container'),
todoCompleted = document.querySelector('.todo-completed');


// отправть в хранилище
const setState = () => {
    localStorage.setItem('state', JSON.stringify(state))
}
// получить из хранилища
const getState = () => {
   return JSON.parse(localStorage.getItem('state'));
}
// заполняем state
let state = getState() ? getState() : []

// рендер страницы
const render = () => {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    state.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button data-id=${item.id} class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `;
    
        if (item.completed){
            todoCompleted.append(li)
            

        } else {
            todoList.append(li)

        }

        // смена статуса todo
        const todoCompleteBtn = li.querySelector('.todo-complete');
        todoCompleteBtn.addEventListener('click', () => {
            item.completed = !item.completed;
            setState()
            render()
        })

    })
}
   

// добавление нового TODO
todoControl.addEventListener('submit', e => {
    e.preventDefault()
    if (headerInput.value ){
        state.push({
            value: headerInput.value,
            completed: false,
            id : state.length + 1
        })
        headerInput.value = ''
        setState()
        render();
    }
    
})


// удаление элементов
todoContainer.addEventListener('click', e => {
    e.preventDefault()
    const target = e.target.closest('.todo-remove');
    if (target){
        let id = +target.dataset.id;
        state = state.filter(item => item.id !== id)
      
    }
    setState()
    render()
})
render()