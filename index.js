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


    const dropdownIcon = document.querySelector('.dropdown-icon');
    const dropdownContent = document.querySelector('.dropdown-content');
    const overlay = document.querySelector('.overlay');

    dropdownIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        document.body.classList.toggle('dropdown-active');
        document.body.classList.toggle('no-scroll');

        if (document.body.classList.contains('dropdown-active')) {
            dropdownContent.style.display = 'flex';
            overlay.style.display = 'block';
        } else {
            dropdownContent.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!dropdownIcon.contains(event.target) && !dropdownContent.contains(event.target)) {
            document.body.classList.remove('dropdown-active');
            document.body.classList.remove('no-scroll');
            dropdownContent.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    overlay.addEventListener('click', () => {
        document.body.classList.remove('dropdown-active');
        document.body.classList.remove('no-scroll');
        dropdownContent.style.display = 'none';
        overlay.style.display = 'none';
    });



