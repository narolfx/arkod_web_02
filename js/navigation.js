// navigation.js

$(document).ready(function () {
    // Event listeners for navigation buttons
    $('#nav-left').on('click', function() {
        const currentPage = window.location.pathname.split('/').pop();
        switch (currentPage) {
            case 'post2.html':
                navigateTo('post1.html');
                break;
            case 'post3.html':
                navigateTo('post2.html');
                break;
            case 'post4.html':
                navigateTo('post3.html');
                break;
            case 'post5.html':
                navigateTo('post4.html');
                break;
            case 'post6.html':
                navigateTo('post5.html');
                break;
            // Add more cases for additional posts
        }
    });

    $('#nav-right').on('click', function() {
        const currentPage = window.location.pathname.split('/').pop();
        switch (currentPage) {
            case 'post1.html':
                navigateTo('post2.html');
                break;
            case 'post2.html':
                navigateTo('post3.html');
                break;
            case 'post3.html':
                navigateTo('post4.html');
                break;
            case 'post4.html':
                navigateTo('post5.html');
                break;
            case 'post5.html':
                navigateTo('post6.html');
                break;
            // Add more cases for additional posts
        }
    });

    // Function to handle navigation between posts
    function navigateTo(page) {
        window.location.href = page;
    }
});
