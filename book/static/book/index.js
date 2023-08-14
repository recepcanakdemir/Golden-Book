function bookSlider(){
    const bookContainers = [...document.querySelectorAll('#books-line')];
    const nxtBtn = document.querySelector('#nxt-btn');
    const preBtn = document.querySelector('#pre-btn');

    bookContainers.forEach((item) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
        console.log("l",containerDimensions)

        nxtBtn.addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })

        preBtn.addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
    })
}
function init(){
    bookSlider();
}

document.addEventListener('DOMContentLoaded',init)
