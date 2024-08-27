// imageLoader.js

document.addEventListener("DOMContentLoaded", function () {
    // Function to load an image dynamically
    function loadImage(imagePath, targetElementId) {
        const img = new Image(); // Create a new image object

        img.onload = function () {
            // Image has loaded successfully
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                img.style.display = 'block'; // Ensures image is displayed as a block element
                img.style.margin = 'auto'; // Centers image horizontally in the container
                targetElement.appendChild(img); // Append the image to the target element
            }
        };

        img.onerror = function () {
            console.error(`Failed to load image at ${imagePath}`);
        };

        img.src = imagePath; // Set the source of the image to the provided path
    }

    // Example usage: Load an image into an element with ID 'viewer-images-1'
    loadImage('assets/icons/rotate-icon.png', 'viewer-images-1');
});
