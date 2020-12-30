const scrollToDown = () => {
    const link = document.querySelector('main>a');
    link.addEventListener('click', (e) => {
        e.preventDefault()
        let ScrollHeigth = document.querySelector(`#${link.href.split('#')[1]}`).offsetTop;
        // скролим плавно
        window.scrollTo({
            top: ScrollHeigth,
            behavior: 'smooth'
        });
    })
}

export default scrollToDown