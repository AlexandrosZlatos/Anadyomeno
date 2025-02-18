document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector(".main-image"); 
    const thumbnails = document.querySelectorAll(".thumbnail-container img"); 
    let magnifier;
    let isActive = false;

    // Function to change the main image when clicking thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            mainImage.src = this.src; // Instantly change the main image
            if (magnifier) {
                magnifier.style.backgroundImage = `url(${mainImage.src})`; // Update magnifier when image changes
            }
        });
    });

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
        magnifier.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`; // Zoom level
        moveMagnifier(e);
        magnifier.style.display = 'block';
    }

    function moveMagnifier(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        magnifier.style.left = `${e.pageX - 75}px`; // Centering magnifier
        magnifier.style.top = `${e.pageY - 75}px`;
        magnifier.style.backgroundPosition = `-${x * 2 - 75}px -${y * 2 - 75}px`; // Moves zoomed area
    }

    mainImage.addEventListener("click", (event) => {
        if (shouldEnableZoom()) { 
            event.stopPropagation();
            isActive = !isActive;

            if (isActive) {
                createMagnifier(event);
                mainImage.addEventListener("mousemove", moveMagnifier);
                mainImage.style.cursor = "zoom-out";
            } else {
                removeMagnifier();
            }
        }
    });

    mainImage.addEventListener("mouseleave", () => {
        if (isActive) {
            removeMagnifier();
        }
    });

    function removeMagnifier() {
        if (magnifier) {
            magnifier.style.display = "none";
            mainImage.removeEventListener("mousemove", moveMagnifier);
            mainImage.style.cursor = "zoom-in";
            isActive = false;
        }
    }
});
