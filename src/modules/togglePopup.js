const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

    const animatePopup = () => {
        popupContent.style.left = `-50%`;
        popupContent.style.transform = `translate(-50%)`;
        let count = -50;

        const move = () => {
            count += 5;
            popupContent.style.left = `${count}%`;
            let animate = requestAnimationFrame(move)

            if (count === 50) {
                cancelAnimationFrame(animate)
            }
        }

        requestAnimationFrame(move)
    }

    popupBtn.forEach(item => {
        item.addEventListener('click', () => {
            popup.style.display = 'block';
            if (window.innerWidth > 768) {
                animatePopup()
            }

        })
    })


    popup.addEventListener('click', e => {
        let target = e.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';

        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
            }
        }


    })
}

export default togglePopup