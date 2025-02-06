document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal'); /* Select all elements */

    function revealOnScroll() {
        const windowHeight = window.innerHeight; /*Get the height of the viewport */
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top; /* Code review comment -> Get the distance of the element from the top of the viewport */
            const elementVisible = 150; /* Code review comment -> Threshold for when the element should become visible */

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible'); /* Code review comment -> Add 'visible' class if element is within the threshold */
            } else {
                element.classList.remove('visible'); /* Code review comment -> Remove 'visible' class if element is not within the threshold */
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll); /* Code review comment -> Attach the revealOnScroll function to the scroll event */
    revealOnScroll(); /* Code review comment -> Initial call to reveal elements already in view */
});
