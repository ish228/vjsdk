const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-btn");

let current = 0;

function goToSlide(index){

    current = Math.max(
        0,
        Math.min(index, slides.length - 1)
    );

    slider.style.transition =
        "transform .35s ease";

    slider.style.transform =
        `translateX(-${current * window.innerWidth}px)`;
}

if(nextBtn){
    nextBtn.addEventListener("click", () => {
        goToSlide(current + 1);
    });
}

// клавиатура
document.addEventListener("keydown", (e) => {

    if(e.key === "ArrowRight"){
        goToSlide(current + 1);
    }

    if(e.key === "ArrowLeft"){
        goToSlide(current - 1);
    }

});

// свайпы
let startX = 0;
let currentX = 0;
let dragging = false;

document.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    dragging = true;

    slider.style.transition = "none";

});

document.addEventListener("touchmove", (e) => {

    if(!dragging) return;

    currentX = e.touches[0].clientX;

    const diff = currentX - startX;

    const offset =
        -current * window.innerWidth + diff;

    slider.style.transform =
        `translateX(${offset}px)`;

});

document.addEventListener("touchend", (e) => {

    if(!dragging) return;

    dragging = false;

    const endX =
        e.changedTouches[0].clientX;

    const diff = endX - startX;

    if(diff < -70 &&
        current < slides.length - 1){

        current++;
    }

    if(diff > 70 &&
        current > 0){

        current--;
    }

    slider.style.transition =
        "transform .35s ease";

    slider.style.transform =
        `translateX(-${current * window.innerWidth}px)`;

});