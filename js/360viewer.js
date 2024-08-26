$(document).ready(function() {
    // Configuration for each post's images
    const posts = {
        "Post 1": {
            imageCount: 61, // Total number of images
            path: 'assets/images/post1/', // Path to the images for Post 1
            containerId: '#viewer-images-1', // ID of the container where images will be loaded
        },
  "Post 2": {
            imageCount: 61, // Total number of images
            path: 'assets/images/post2/', // Path to the images for Post 2
            containerId: '#viewer-images-2', // ID of the container where images will be loaded
           },
"Post 3": {
            imageCount: 61, // Total number of images
            path: 'assets/images/post3/', // Path to the images for Post 3
            containerId: '#viewer-images-3', // ID of the container where images will be loaded
           },
        // Add configurations for Post 2, Post 3 if needed
    };

    // Function to load images for each post
    function loadImages(postName) {
        const post = posts[postName];
        const { imageCount, path, containerId } = post;
        const viewer = $(containerId);
        viewer.empty(); // Clear current images

        // Dynamically load images based on the path and image count
        for (let i = 0; i < imageCount; i++) {
            const imgElement = `<img src="${path}${i + 1}.jpg" alt="Product Image ${i + 1}" style="display: none;">`;
            viewer.append(imgElement);
        }
        viewer.find('img').first().show(); // Show the first image initially
        adjustImageSizes(); // Adjust image sizes after loading
    }

    // Function to adjust image sizes dynamically based on the viewport
    function adjustImageSizes() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        $('.product-view-container').each(function() {
            if (viewportWidth >= 768) { // Desktop or Tablet view
                $(this).css({
                    width: '100vw',  // Full viewport width
                    height: '100vh', // Full viewport height
                });

                $(this).find('img').css({
                    width: '100vw',   // Full viewport width
                    height: '100vh',  // Full viewport height
                    objectFit: 'cover' // Cover the entire container while maintaining aspect ratio
                });
            } else { // Mobile view
                $(this).css({
                    width: '100%',  // Full width of container
                    height: 'auto', // Height adjusts automatically based on width
                });

                $(this).find('img').css({
                    width: isPortrait ? '100%' : 'auto', // Full width for portrait, auto for landscape
                    height: 'auto', // Maintain aspect ratio
                    maxWidth: '100%', // Ensure it doesn't overflow container
                    maxHeight: '100%', // Ensure it doesn't overflow container
                });
            }
        });
    }

    // Call adjustImageSizes on window resize and orientation change
    $(window).on('resize orientationchange', function() {
        adjustImageSizes();
    });

    // Initialize viewers for all posts
    Object.keys(posts).forEach(postName => {
        loadImages(postName);
    });

    // Slider event for rotating images
    $('.rotation-slider').on('input', function () {
        const viewer = $(this).closest('.main-content').find('.viewer-images');
        const value = $(this).val();
        rotateBySlider(viewer, value);
    });

    // Function to rotate images based on slider value
    function rotateBySlider(viewer, value) {
        const images = viewer.find('img');
        images.hide(); // Hide all images
        images.eq(value).show(); // Show the image corresponding to slider value
    }

    // Variables for handling touch and mouse events
    let startX, isTouching = false, isDragging = false;

    // Handle touch screen for mobile
    $('.product-view-container').on('touchstart', function(event) {
        isTouching = true;
        startX = event.touches[0].pageX;
    });

    $('.product-view-container').on('touchmove', function(event) {
        if (isTouching) {
            const viewer = $(this).find('.viewer-images');
            const moveX = event.touches[0].pageX - startX;
            const imageCount = viewer.find('img').length;
            let currentIndex = viewer.find('img:visible').index();

            if (Math.abs(moveX) > 15) { // Adjust sensitivity
                if (moveX > 0) {
                    currentIndex = (currentIndex + 1) % imageCount;
                } else {
                    currentIndex = (currentIndex - 1 + imageCount) % imageCount;
                }
                startX = event.touches[0].pageX;
                viewer.find('img').hide();
                viewer.find('img').eq(currentIndex).show();
                viewer.siblings('.slider-container').find('.rotation-slider').val(currentIndex);
            }
        }
    });

    $(document).on('touchend', function() {
        isTouching = false;
    });

    // Handle mouse drag for desktops
    $('.product-view-container').on('mousedown', function(event) {
        isDragging = true;
        startX = event.pageX;
        event.preventDefault(); // Prevent text selection while dragging
    });

    $(document).on('mousemove', function(event) {
        if (isDragging) {
            const viewer = $('.product-view-container').find('.viewer-images');
            const moveX = event.pageX - startX;
            const imageCount = viewer.find('img').length;
            let currentIndex = viewer.find('img:visible').index();

            if (Math.abs(moveX) > 15) { // Adjust sensitivity
                if (moveX > 0) {
                    currentIndex = (currentIndex + 1) % imageCount;
                } else {
                    currentIndex = (currentIndex - 1 + imageCount) % imageCount;
                }
                startX = event.pageX;
                viewer.find('img').hide();
                viewer.find('img').eq(currentIndex).show();
                viewer.siblings('.slider-container').find('.rotation-slider').val(currentIndex);
            }
        }
    });

    $(document).on('mouseup', function() {
        isDragging = false;
    });

    // Prevent image dragging behavior
    $('.viewer-images img').on('dragstart', function(event) {
        event.preventDefault();
    });

    // Update slider value when images are rotated via mouse or touch
    function updateSlider(viewer, currentIndex) {
        viewer.siblings('.slider-container').find('.rotation-slider').val(currentIndex);
    }

    // Sync the slider position and image display for better UX
    $('.product-view-container').each(function() {
        const viewer = $(this).find('.viewer-images');
        const slider = $(this).find('.rotation-slider');
        slider.attr('max', viewer.find('img').length - 1); // Set the slider max value based on image count
    });
});
