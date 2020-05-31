let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let slides = document.querySelectorAll(".slide");
slides[0].classList.add("visible-slide");

let counter = 0;
rightArrow.addEventListener("click", () => {
    slides[counter].classList.toggle("visible-slide");
    if (counter === slides.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    slides[counter].classList.toggle("visible-slide");
});

leftArrow.addEventListener("click", () => {
    slides[counter].classList.toggle("visible-slide");
    if (counter === 0) {
        counter = slides.length - 1;
    } else {
        counter--;
    }
    slides[counter].classList.toggle("visible-slide");
});
