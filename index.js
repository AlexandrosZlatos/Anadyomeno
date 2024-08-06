document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Icon Hover Functionality
    const dropdownIcons = document.querySelectorAll('.dropdown-icon');
    const newImages = {
        "index.html": ["images/clothesSmoke.png", "images/aboutSmoke.png", "images/contactSmoke.png"],
        "contact.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/aboutSmoke.png"],
        "about.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "clothes.html": ["images/homeSmoke.png", "images/aboutSmoke.png", "images/contactSmoke.png"],
        "exoskeleton.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"]
    };

    const originalImages = {
        "index.html": ["images/clothes.png", "images/about.png", "images/contact.png"],
        "contact.html": ["images/home.png", "images/clothes.png", "images.about.png"],
        "about.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "clothes.html": ["images/home.png", "images/about.png", "images/contact.png"],
        "exoskeleton.html": ["images/home.png", "images/clothes.png", "images/contact.png"]
    };

    const currentPage = window.location.pathname.split("/").pop();

    dropdownIcons.forEach((icon, index) => {
        const targetImage = document.querySelector(`#image${index + 1}`);

        const handleMouseOver = (event) => {
            event.preventDefault();
            if (targetImage) {
                targetImage.classList.add('fade-out');
                setTimeout(() => {
                    targetImage.src = newImages[currentPage][index];
                    targetImage.classList.remove('fade-out');
                }, 500);
            } else {
                console.error(`Image #image${index + 1} not found`);
            }
        };

        const handleMouseLeave = (event) => {
            event.preventDefault();
            if (targetImage) {
                targetImage.classList.add('fade-out');
                setTimeout(() => {
                    targetImage.src = originalImages[currentPage][index];
                    targetImage.classList.remove('fade-out');
                }, 500);
            } else {
                console.error(`Image #image${index + 1} not found`);
            }
        };

        if (window.innerWidth > 600) {
            icon.addEventListener('mouseover', handleMouseOver);
            icon.addEventListener('mouseleave', handleMouseLeave);
        }
    });

    function loadImages() {
        fetch('http://localhost:3000/api/images')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched images:', data);
                if (Array.isArray(data)) {
                    const imagesContainer = document.getElementById('images-container');
                    imagesContainer.innerHTML = '';
                    data.forEach((image, index) => {
                        const imgElement = document.createElement('img');
                        imgElement.src = `http://localhost:3000${image.path}`;
                        imgElement.alt = 'Uploaded Image';
                        imgElement.className = 'uploaded-image';
                        imgElement.id = `image-${index}`; 
                        imgElement.dataset.details = image.details;
                        
                        if (index === 0) {
                            imgElement.onclick = function() {
                                window.location.href = 'exoskeleton.html';
                            };
                        } else {
                            imgElement.onclick = function(event) {
                                const targetPage = `exoskeleton.html?path=${encodeURIComponent(image.path)}`;
                                window.open(targetPage, '_blank');
                            };
                        }
                        
                        imagesContainer.appendChild(imgElement);

                        // Log the image ID to the console
                        console.log(`Created image with ID: image-${index}`);
                    });
                } else {
                    console.error('Error: Data is not an array', data);
                }
            })
            .catch(error => console.error('Error fetching images:', error));
    }
    window.onload = loadImages;

    // Add to Cart functionality
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');

    // Retrieve the cart count from localStorage and set it before showing the element
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    cartCountElement.textContent = cartCount;
    cartCountElement.style.visibility = 'visible';

    addToCartButton.addEventListener('click', () => {
        cartCount += 1;
        cartCountElement.textContent = cartCount;

        // Save the updated cart count to localStorage
        localStorage.setItem('cartCount', cartCount);

        // Create the checkmark element
        const checkmark = document.createElement('div');
        checkmark.className = 'checkmark';
        checkmark.innerHTML = '&#10003;'; // Unicode for checkmark

        // Append the checkmark next to the add to cart button
        addToCartButton.parentElement.appendChild(checkmark);

        // Remove the checkmark after the animation completes
        setTimeout(() => {
            checkmark.classList.add('fade-out');
        }, 1000); // Delay before starting fade out

        setTimeout(() => {
            checkmark.remove();
        }, 2000); // Total duration before removal
    });

    function changeImage(imageSrc) {
        const mainProductImage = document.getElementById('mainProductImage');
        mainProductImage.src = imageSrc;
    }
});
