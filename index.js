document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    let magnifier;
    let isActive = false;

    // Function to create and position magnifier
    function createMagnifier(e) {
        if (!magnifier) {
            magnifier = document.createElement('div');
            magnifier.classList.add('magnifier');
            document.body.appendChild(magnifier);
        }
        magnifier.style.backgroundImage = `url(${mainImage.src})`;
        magnifier.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`; // Adjust zoom factor
        moveMagnifier(e);
        magnifier.style.display = 'block'; // Show magnifier
    }

    // Function to move magnifier with mouse
    function moveMagnifier(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        magnifier.style.left = `${e.pageX - 75}px`; // Center magnifier on cursor
        magnifier.style.top = `${e.pageY - 75}px`;
        magnifier.style.backgroundPosition = `-${x * 2 - 75}px -${y * 2 - 75}px`; // Adjust background for zoom effect
    }

    // Attach magnifier functionality to the main image
    mainImage.addEventListener('click', (event) => {
        event.stopPropagation();
        isActive = !isActive;

        if (isActive) {
            createMagnifier(event); // Create and show magnifier
            mainImage.addEventListener('mousemove', moveMagnifier);
            mainImage.style.cursor = 'zoom-out';
        } else {
            removeMagnifier();
        }
    });

    mainImage.addEventListener('mouseleave', () => {
        if (isActive) {
            removeMagnifier();
        }
    });

    // Function to remove magnifier
    function removeMagnifier() {
        if (magnifier) {
            magnifier.style.display = 'none';
            mainImage.removeEventListener('mousemove', moveMagnifier);
            mainImage.style.cursor = 'zoom-in';
            isActive = false;
        }
    }

    // Change the main image when a thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            mainImage.src = thumbnail.src; // Update main image to clicked thumbnail's source
            if (isActive) {
                removeMagnifier(); 
            }
        });
    });
});

// Select the dropdown icon, content, and overlay
const dropdownIcon = document.querySelector('.dropdown-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const overlay = document.querySelector('.overlay');
dropdownIcon.addEventListener('click', function () {
    const isDropdownVisible = dropdownContent.classList.contains('show');
    dropdownContent.classList.toggle('show');
    document.body.classList.toggle('dropdown-active');

    if (isDropdownVisible) {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.pointerEvents = 'none';
        overlay.style.display = 'none';
    } else {
        dropdownContent.style.opacity = '1';
        dropdownContent.style.pointerEvents = 'auto';
        overlay.style.display = 'block';
    }
});

// Hide the dropdown and overlay when the overlay is clicked
overlay.addEventListener('click', function () {
    dropdownContent.classList.remove('show');
    dropdownContent.style.opacity = '0';
    dropdownContent.style.pointerEvents = 'none';
    document.body.classList.remove('dropdown-active');
    overlay.style.display = 'none';
});

// change the main image when a thumbnail is clicked
function changeMainImage(src) {
    document.querySelector('.main-image').src = src;
}


