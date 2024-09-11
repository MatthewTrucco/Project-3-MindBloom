document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselItems = document.querySelector('.carousel-items');
    let items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let totalItems = items.length;

    // Function to detect if a string is a valid YouTube URL
    function isYouTubeUrl(url) {
        return url.includes("youtube.com") || url.includes("youtu.be");
    }

    // Convert YouTube URL to embeddable URL
    function convertToYouTubeEmbed(url) {
        let videoId = "";
        if (url.includes("youtube.com")) {
            const urlParams = new URLSearchParams(new URL(url).search);
            videoId = urlParams.get("v");
        } else if (url.includes("youtu.be")) {
            videoId = url.split("/").pop();
        }
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Update Carousel Display
    function updateCarousel() {
        const offset = currentIndex * -100; // Each item takes up 100% width
        carouselItems.style.transform = `translateX(${offset}%)`;
    }

    // Add New Item to Carousel
    function addCarouselItem(content) {
        const newItem = document.createElement('div');
        newItem.classList.add('carousel-item');

        // Check if the content is a valid YouTube URL
        if (isYouTubeUrl(content)) {
            const embedUrl = convertToYouTubeEmbed(content);
            newItem.innerHTML = `
                <iframe width="100%" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>Video</p>
            `;
        } else {
            // Otherwise, it's plain text
            newItem.innerHTML = `<p><strong>${content}</strong></p>`;
        }

        // Append the new item and update the carousel
        carouselItems.appendChild(newItem);
        updateTotalItems();
    }

    // Remove Last Item from Carousel
    function removeLastCarouselItem() {
        const lastItem = document.querySelector('.carousel-item:last-child');
        if (lastItem) {
            lastItem.remove();
            updateTotalItems();
        }
    }

    // Update total items and reset carousel position
    function updateTotalItems() {
        items = document.querySelectorAll('.carousel-item');
        totalItems = items.length;
        currentIndex = 0; // Reset to the first item after adding/removing
        updateCarousel();
    }

    // Event listeners for the next and previous buttons
    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Handle add new item form submission
    const addItemForm = document.getElementById('addItemForm');
    addItemForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting traditionally
        const content = document.getElementById('contentTitle').value;

        addCarouselItem(content);  // Add content (text or YouTube URL)

        addItemForm.reset(); // Clear the form after adding the item
    });

    // Handle remove last item button click
    const removeLastItemButton = document.getElementById('removeLastItem');
    removeLastItemButton.addEventListener('click', function () {
        removeLastCarouselItem();
    });

    // Initial setup
    updateTotalItems(); // Ensure carousel starts at the correct index
});
