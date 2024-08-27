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

    // Close the pop-up when clicking outside the pop-up content
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.popup-content').length && !$(event.target).is('#info-hotspot')) {
            $('#info-popup').fadeOut(function() {
                
            });
        }
    });
});