const track = document.getElementById('image-container');

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

    // Limit nextPercentage to a minimum of -100 and a maximum of 0
    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

    // Update the dataset and apply the transformation
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

