const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    track.dataset.mouseDownAt = "0"; // Reset mouse interaction states
    track.dataset.prevPercentage = "0"; // Reset movement
})
