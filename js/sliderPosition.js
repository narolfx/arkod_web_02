// Function to check device orientation and show/hide rotation icon
function checkOrientation() {
    const rotationIcon = document.getElementById('rotation-icon');
    if (window.innerHeight > window.innerWidth) {
        // Portrait mode
        rotationIcon.style.display = 'block';
    } else {
        // Landscape mode
        rotationIcon.style.display = 'none';
    }
}

// Function to adjust the slider position dynamically
function adjustSliderPosition() {
    const container = document.getElementById('viewer-images-1');
    const slider = document.getElementById('slider-container');

    // Get the height of the container
    const containerHeight = container.offsetHeight;

    // Set the slider's position to be at the bottom of the container
    slider.style.top = `${containerHeight - slider.offsetHeight - 10}px`; // Adjust 10px margin as needed
    slider.style.left = '50%';
    slider.style.transform = 'translateX(-50%)';
}

// Event listeners to handle load, resize, and orientation change events
window.addEventListener('load', () => {
    checkOrientation();
    adjustSliderPosition();
});

window.addEventListener('resize', () => {
    checkOrientation();
    adjustSliderPosition();
});

window.addEventListener('orientationchange', () => {
    checkOrientation();
    adjustSliderPosition();
});
