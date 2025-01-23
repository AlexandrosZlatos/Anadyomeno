document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    let magnifier;
    let isActive = false;

    function shouldEnableZoom() {
        return window.innerWidth > 767;
    }

    function createMagnifier(e) {
        if (!magnifier) {
            magnifier = document.createElement('div');
            magnifier.classList.add('magnifier');
            document.body.appendChild(magnifier);
        }
        magnifier.style.backgroundImage = `url(${mainImage.src})`;
        magnifier.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`;
        moveMagnifier(e);
        magnifier.style.display = 'block';
    }

    function moveMagnifier(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        magnifier.style.left = `${e.pageX - 75}px`;
        magnifier.style.top = `${e.pageY - 75}px`;
        magnifier.style.backgroundPosition = `-${x * 2 - 75}px -${y * 2 - 75}px`;
    }

    mainImage.addEventListener('click', (event) => {
        if (shouldEnableZoom()) { 
            event.stopPropagation();
            isActive = !isActive;

            if (isActive) {
                createMagnifier(event);
                mainImage.addEventListener('mousemove', moveMagnifier);
                mainImage.style.cursor = 'zoom-out';
            } else {
                removeMagnifier();
            }
        }
    });

    mainImage.addEventListener('mouseleave', () => {
        if (isActive) {
            removeMagnifier();
        }
    });

    function removeMagnifier() {
        if (magnifier) {
            magnifier.style.display = 'none';
            mainImage.removeEventListener('mousemove', moveMagnifier);
            mainImage.style.cursor = 'zoom-in';
            isActive = false;
        }
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            mainImage.src = thumbnail.src;
            if (isActive) {
                removeMagnifier();
            }
        });
    });
});

const overlay = document.querySelector('.overlay');

function showOverlay() {
    if (window.innerWidth <= 767) { // Only show overlay for mobile views
        overlay.classList.add('active');
    }
}

function hideOverlay() {
    overlay.classList.remove('active');
}

const dropdownIcon = document.querySelector('.dropdown-icon');
dropdownIcon.addEventListener('click', showOverlay);

overlay.addEventListener('click', hideOverlay);
