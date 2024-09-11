document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality for signing in
    const slider = document.getElementById('slider');
    const sliderHandle = document.querySelector('.slider-handle');
    let isMouseDown = false;
    let startX = 0;
    let initialWidth = 40;

    slider.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        startX = e.clientX;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isMouseDown) return;

        let parentOffset = slider.parentNode.getBoundingClientRect();
        let sliderWidth = parentOffset.width;
        let newWidth = e.clientX - startX + initialWidth;

        if (newWidth < 40) newWidth = 40;
        if (newWidth > sliderWidth - sliderHandle.offsetWidth) newWidth = sliderWidth - sliderHandle.offsetWidth;

        slider.style.width = newWidth + 'px';
        sliderHandle.style.left = (newWidth - sliderHandle.offsetWidth) + 'px';

        if (newWidth >= sliderWidth - sliderHandle.offsetWidth) {
            slider.classList.add('success');
            slider.querySelector('.slider-text').textContent = 'Confirmed!';
            slider.querySelector('.slider-arrow').textContent = '✔';
            sliderHandle.style.left = (sliderWidth - sliderHandle.offsetWidth) + 'px';
            isMouseDown = false;
        }
    }

    function onMouseUp(e) {
        isMouseDown = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (!slider.classList.contains('success')) {
            slider.style.width = initialWidth + 'px';
            sliderHandle.style.left = '0';
        }
    }

    // Hero Carousel functionality
    let currentSet = 0;
    const sets = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');
    const heroText = document.getElementById('hero-text');
    const carousel = document.querySelector('.carousel');
    const carouselWrapper = document.querySelector('.carousel-wrapper');

    function showSet(index) {
        sets.forEach((set, idx) => {
            set.classList.remove('active');
            if (idx === index) {
                set.classList.add('active');
            }
        });

        const selectedSet = sets[index];
        const newHeroImage = selectedSet.getAttribute('data-hero-image');
        const newHeroTitle = selectedSet.getAttribute('data-hero-title');
        const newHeroText = selectedSet.getAttribute('data-hero-text');
        hero.style.backgroundImage = `url('${newHeroImage}')`;
        heroTitle.textContent = newHeroTitle;
        heroText.textContent = newHeroText;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSet = index;

        const itemWidth = sets[0].clientWidth + 30;
        const carouselWidth = carouselWrapper.clientWidth;

        let totalShift = (itemWidth * index) - (carouselWidth / 2) + (itemWidth / 2);
        if (index === 0) totalShift = 0;

        carousel.style.transform = `translateX(-${totalShift}px)`;
    }

    function autoCarousel() {
        let index = currentSet + 1;
        if (index >= sets.length) index = 0;
        showSet(index);
    }

    let autoSlide = setInterval(autoCarousel, 5000);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSet(index);
            autoSlide = setInterval(autoCarousel, 5000);
        });
    });

    showSet(currentSet);

    // Search form functionality
    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const query = document.getElementById("search-input").value.trim();
        if (query) {
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
        }
    });

    const carousel2 = document.querySelector('.carousel-2');
    const items2 = document.querySelectorAll('.carousel-item-2');
    const leftArrow2 = document.querySelector('.carousel-arrow-2.left');
    const rightArrow2 = document.querySelector('.carousel-arrow-2.right');

    let currentIndex2 = 0;
    const itemsPerView2 = 2; // Display two items at once
    const totalItems2 = items2.length;

    function updateCarousel2() {
        // Calculate the translateX based on the current index
        const translateX = -(currentIndex2 * (500 + 30)); // 500px width + 30px margin
        carousel2.style.transform = `translateX(${translateX}px)`;

        // Update the active class on the items
        items2.forEach((item, index) => {
            if (index >= currentIndex2 && index < currentIndex2 + itemsPerView2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Left arrow click
    leftArrow2.addEventListener('click', () => {
        if (currentIndex2 > 0) {
            currentIndex2--;
        } else {
            currentIndex2 = totalItems2 - itemsPerView2; // Loop to the end
        }
        updateCarousel2();
    });

    // Right arrow click
    rightArrow2.addEventListener('click', () => {
        if (currentIndex2 < totalItems2 - itemsPerView2) {
            currentIndex2++;
        } else {
            currentIndex2 = 0; // Loop back to the start
        }
        updateCarousel2();
    });

    // Initialize the carousel
    updateCarousel2();
});