'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, container) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.container = document.querySelector(container);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));

    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            }

            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.form.reset()
        } else {
            alert('пустое дело добавить нельзя!');
        }

    }
    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this))
        this.render()
        this.handler()
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addStorage();
    }

    createItem = (todo) => {

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`)
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);

        }
    }

    addStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
    }

    delete(elem){
        elem.parentElement.style.position = 'relative'
        let count = 0
        let int = setInterval(() => {
            count += 5;
            elem.parentNode.style.left = count + '%';
            if (count > 100){
                clearInterval(int)
    
                this.todoData.delete(elem.parentElement.key)
                this.render()
            }
        }, 10)
        
    }

    completedItem(elem){
        elem.parentElement.style.position = 'relative'
        let count = 0
        let int = setInterval(() => {
            count += 5;
            elem.parentNode.style.left = count + '%';
            if (count > 100){
                clearInterval(int)
    
                this.todoData.forEach((val, key) => {
                    if (key === elem.parentElement.key){
                        val.completed = !val.completed
                    }
                })
                this.render()
            }
        }, 10)
        
    }

    edit(elem){
        elem.parentElement.children[0].contentEditable = "true";
        elem.parentElement.children[0].focus();

        elem.parentElement.children[0].addEventListener('blur', () => {
            if (elem.parentElement.children[0].textContent){
                this.todoData.forEach((val, key) => {
                    if (key === elem.parentElement.key){
                       val.value = elem.parentElement.children[0].textContent
                    }
                })
                elem.parentElement.children[0].contentEditable = "false";
                this.render()
            } else {
                alert('пустое дело добавить нельзя!');
                elem.parentElement.children[0].focus();
            }
            
        })
    }

    handler(){
        this.container.addEventListener('click', (e)=> {
            let target = e.target
            if (target.classList.contains('todo-remove')){
                this.delete(target.parentElement)
            } else if (target.classList.contains('todo-complete')){
                this.completedItem(target.parentElement )
            } else if (target.classList.contains('todo-edit')){
                this.edit(target.parentElement)
            }
        })
    }
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();