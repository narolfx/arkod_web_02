// touchAndMouse.js

$(document).ready(function () {
    // Variables for handling touch and mouse events
    let startX, isTouching = false, isDragging = false;
    let currentIndex = 0;

    // Handle touch screen for mobile
    $('.product-view-container').on('touchstart', function (event) {
        isTouching = true;
        startX = event.touches[0].pageX;
    });

    $('.product-view-container').on('touchmove', function (event) {
        if (isTouching) {
            const viewer = $(this);
            const moveX = event.touches[0].pageX - startX;
            const imageCount = viewer.find('img').length;

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

    $(document).on('touchend', function () {
        isTouching = false;
    });

    // Handle mouse drag for desktops
    $('.product-view-container').on('mousedown', function (event) {
        isDragging = true;
        startX = event.pageX;
        event.preventDefault(); // Prevent text selection while dragging
    });

    $(document).on('mousemove', function (event) {
        if (isDragging) {
            const viewer = $('.product-view-container');
            const moveX = event.pageX - startX;
            const imageCount = viewer.find('img').length;

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

    $(document).on('mouseup', function () {
        isDragging = false;
    });

    // Prevent image dragging behavior
    $('.viewer-images img').on('dragstart', function (event) {
        event.preventDefault();
    });
});
