const changeImage = () => {
    const wrapperImages = document.querySelectorAll('.command__photo');
    const togleImage = (e) => {
        let old = e.target.src;
        e.target.src = e.target.dataset.img;
        e.target.dataset.img = old;
    };
    wrapperImages.forEach(item => {
        item.addEventListener('mouseenter', togleImage);
        item.addEventListener('mouseout', togleImage);
    });

}

export default changeImage
