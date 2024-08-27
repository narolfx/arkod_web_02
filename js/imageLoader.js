$(document).ready(function () {
    // Configuration for each post's images
    const posts = {
        "Post 1": {
            imageCount: 61,  // Number of images in the folder
            path: 'assets/images/post1/',  // Path to the folder containing images
            containerId: '#viewer-images-1',
        },
        "Post 2": {
            imageCount: 61,
            path: 'assets/images/post2/',
            containerId: '#viewer-images-2',
        },
        "Post 3": {
            imageCount: 61,
            path: 'assets/images/post3/',
            containerId: '#viewer-images-3',
        },
        "Post 4": {
            imageCount: 61,
            path: 'assets/images/post4/',
            containerId: '#viewer-images-4',
        },
        "Post 5": {
            imageCount: 61,
            path: 'assets/images/post5/',
            containerId: '#viewer-images-5',
        },
        "Post 6": {
            imageCount: 61,
            path: 'assets/images/post6/',
            containerId: '#viewer-images-6',
        },
        // Add more posts as needed
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

    // Call adjustImageSizes on window resize and orientation change
    $(window).on('resize orientationchange', function () {
        adjustImageSizes();
    });

    // Initialize viewers for all posts
    Object.keys(posts).forEach(postName => {
        loadImages(postName);
    });

    // Adjust images sizes dynamically based on the viewport
    function adjustImageSizes() {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            $('.rotate-message').show();
            $('.landscape-content').hide();
        } else {
            $('.rotate-message').hide();
            $('.landscape-content').show();
        }

        $('.product-view-container').each(function () {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (viewportWidth >= 768) { // Desktop or Tablet view
                $(this).css({
                    width: '100vw',
                    height: '100vh'
                });

                $(this).find('img').css({
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover'
                });
            } else { // Mobile view in landscape
                $(this).css({
                    width: '100vw',
                    height: '100vh'
                });

                $(this).find('img').css({
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%'
                });
            }
        });
    }
});
