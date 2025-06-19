const track = document.getElementById('image-container');

track.dataset.prevPercentage = "-50"; // Ensuring the images start centered
window.onmousedown = event => {
    track.dataset.mouseDownAt = event.clientX;
}

window.onmousemove = event => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
    const maxDelta = window.innerWidth / 2;

    // Linear interpolation to calculate the percentage
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Limit nextPercentage
    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

    //apply transformation
    track.dataset.percentage = nextPercentage;
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: 'forwards'}); 

    for(const image of track.getElementsByClassName('travelImage')) {
        image.animate({
        objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 1200, fill: 'forwards' })
    }
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

// Mobile 
// touchstart = tr 
track.addEventListener('touchstart', event => {
    track.dataset.mouseDownAt = event.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchmove', event => {
    if (track.dataset.mouseDownAt === "0") return;

    const touchX = event.touches[0].clientX;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - touchX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage || "0") + percentage;

    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: 'forwards' });

    for (const image of track.getElementsByClassName('travelImage')) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 1200, fill: 'forwards' });
    }
}, { passive: true });

track.addEventListener('touchend', () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
});


