// JavaScript to handle popup functionality
$(document).ready(function () {
    // Open the popup when the hotspot button is clicked
    $('#info-hotspot').on('click', function () {
        $('#info-popup').fadeIn();
    });

    // Close the popup when the close button or outside of the popup is clicked
    $('.close-popup').on('click', function () {
        $('#info-popup').fadeOut();
    });

    $(window).on('click', function (event) {
        if ($(event.target).is('#info-popup')) {
            $('#info-popup').fadeOut();
        }
    });
});
