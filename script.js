const titleName = document.querySelector('.title-name');
const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');
const usersList = document.querySelector('.users__list');

let state = JSON.parse(localStorage.getItem('usersData')) ? JSON.parse(localStorage.getItem('usersData')) : []

// проверка имени и фамилии
const chackFullName = (fullName) => {
    return  fullName !== null && fullName.split(' ').length === 2
}
// проверка поля логин
const chackLogin = (login) => {
    return  login !== null && login.trim() !== ''
}

// проверка поля пароль
const chackPassword = (password) => {
    return  password !== null && password.trim() !== ''
}

// отрисовка 
const render = () => {
    usersList.innerHTML = ''
    state.forEach((item, i) => {
        let li = document.createElement('li');
        li.classList.add('users__item');
        li.innerHTML = `
            <span class="users__name">${item.name}</span>
            <span class="users__surname">${item.surname}</span>
            <span class="users__date">${item.date}</span>
            <button data-id=${item.id} class="users__delete"></button>
        `
        usersList.insertAdjacentElement('afterbegin', li)
    })
}

// регистрация
const registration = () => {
    let fullName;
    let login;
    let password;
    let date = new Date();
    
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
    

    do {fullName = prompt('Введите через пробел ваше имя и фамилию', 'Максим Кузнецов');
    } while (!chackFullName(fullName))

    do {login = prompt('Введите login', 'max666');
    } while (!chackLogin(login))

    do {password = prompt('Введите пароль', '123456');
    } while (!chackPassword(password))
    
    state.push({
        name : fullName.split(' ')[0],
        surname : fullName.split(' ')[1],
        login: login,
        password: password,
        date: date.toLocaleString('ru', options),
        id: state.length + 1
    })

    render()

    localStorage.setItem('usersData', JSON.stringify(state));
}

const autentification = () => {
    let login;
    let password;

    do {login = prompt('Введите login', 'max666');
    } while (!chackLogin(login))

    do {password = prompt('Введите пароль', '123456');
    } while (!chackPassword(password) )

    let findedUser = state.find(item => item.login ===  login && item.password ===  password)
    
    if (findedUser){
        titleName.textContent = findedUser.name;
    } else {
        alert('Пользователь не найден');
        titleName.textContent = 'Аноним';
    }

}


signUp.addEventListener('click', registration);
signIn.addEventListener('click', autentification);

usersList.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target.closest('.users__delete');
    if (target){
        state = state.filter(item => item.id != target.dataset.id);
        render();
        localStorage.setItem('usersData', JSON.stringify(state));
    }
})

render()