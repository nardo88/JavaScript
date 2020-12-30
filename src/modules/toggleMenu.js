const toggleMenu = () => {
    const menu = document.querySelector('menu');



    // функция открытия и закртия меню
    const actionMenu = () => {
        menu.classList.toggle('active-menu')
    }

    // усложненное задание
    document.body.addEventListener('click', e => {

        let target = e.target;
        // клик по бургеру
        if (target.closest('.menu')) {
            actionMenu()
            // клик по крестику
        } else if (target.classList.contains('close-btn')) {
            e.preventDefault();
            actionMenu();
            // клик по элементам меню
        } else if (target.matches('ul>li>a')) {
            e.preventDefault();
            actionMenu();
            let ScrollHeigth = document.querySelector(`#${e.target.href.split('#')[1]}`).offsetTop;
            // скролим плавно
            window.scrollTo({
                top: ScrollHeigth,
                behavior: 'smooth'
            });
            // клик мимо меню
        } else if (target.tagName !== 'MENU' && target.tagName !== 'LI') {
            
            menu.classList.remove('active-menu');
        }
    })

};

export default toggleMenu