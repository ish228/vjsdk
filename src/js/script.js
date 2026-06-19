const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");

let current = 0;
let startX = 0;
let isDragging = false;

let width = slides[0].offsetWidth;

function update(animated = true) {

    width = slides[0].offsetWidth;

    slider.style.transition =
        animated
            ? "transform .35s ease"
            : "none";

    slider.style.transform =
        `translateX(-${current * width}px)`;

    setActiveSlide();
}
// клавиатура
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") current++;
    if (e.key === "ArrowLeft") current--;

    current = Math.max(0, Math.min(current, slides.length - 1));
    update();
});

// свайп старт
document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    slider.style.transition = "none";
});

// свайп движение
document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    let diff = e.touches[0].clientX - startX;

    let move = -current * width + diff;

    slider.style.transform = `translateX(${move}px)`;
});

// свайп конец
document.addEventListener("touchend", (e) => {
    isDragging = false;

    let diff = e.changedTouches[0].clientX - startX;
    let threshold = 60;

    if (diff < -threshold) current++;
    if (diff > threshold) current--;

    current = Math.max(0, Math.min(current, slides.length - 1));

    update();
});


window.addEventListener("resize", () => {
    update(false);
});


update(false);

function setActiveSlide() {

    slides.forEach((slide, index) => {

        slide.classList.toggle(
            "active",
            index === current
        );

    });

}