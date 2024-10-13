document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Icon Functionality
    const dropdownIcons = document.querySelectorAll('.dropdown-icon');
    
    const pathName = window.location.pathname;
    const currentPage = pathName.endsWith('/') || pathName.endsWith('index.html') 
        ? 'index.html' 
        : pathName.split("/").pop();

    // Images for Mobile View
    const mobileImages = {
        "index.html": ["images/clothes.png", "images/about.png", "images/contact.png"],
        "contact.html": ["images/home.png", "images/clothes.png", "images/about.png"],
        "about.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "clothes.html": ["images/home.png", "images/about.png", "images/contact.png"],
        "exoskeleton.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "exoskeleton-black.html": ["images/home.png", "images/clothes.png", "images/contact.png"]

    };

    // Images for Desktop Hover
    const newImages = {
        "index.html": ["images/clothesSmoke.png", "images/aboutSmoke.png", "images/contactSmoke.png"],
        "contact.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/aboutSmoke.png"],
        "about.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "clothes.html": ["images/homeSmoke.png", "images/aboutSmoke.png", "images/contactSmoke.png"],
        "exoskeleton.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "exoskeleton-black.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "midland.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "nf-fleece.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "nf-windproof.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"],
        "cart.html": ["images/homeSmoke.png", "images/clothesSmoke.png", "images/contactSmoke.png"]
    };

    
    const originalImages = {
        "index.html": ["images/clothes.png", "images/about.png", "images/contact.png"],
        "contact.html": ["images/home.png", "images/clothes.png", "images/about.png"],
        "about.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "clothes.html": ["images/home.png", "images/about.png", "images/contact.png"],
        "exoskeleton.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "midland.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "nf-fleece.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "nf-windproof.html": ["images/home.png", "images/clothes.png", "images/contact.png"],
        "cart.html": ["images/home.png", "images/clothes.png", "images/contact.png"]

    };

    if (window.innerWidth > 600) {
        // Only enable hover effect for desktop view
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
                }
            };

            icon.addEventListener('mouseover', handleMouseOver);
            icon.addEventListener('mouseleave', handleMouseLeave);
        });
    } else {
        // For mobile, no hover effect (images remain unchanged)
        console.log("Mobile view detected. Hover effect disabled.");
    }
      

    // Fetch Images and Add to Page Dynamically
    // TEMPORERALLY DEACTIVATED
    // const baseUrl = window.location.origin.replace('8080', '3000');
    // fetch(`${baseUrl}/uploads/images.json`)
    //     .then(response => response.json())
    //     .then(images => {
    //         const container = document.getElementById('images-container');
    //         container.innerHTML = ''; // Clear existing images
    //         images.forEach((image, index) => {
    //             const productDiv = document.createElement('div');
    //             productDiv.className = 'product';

    //             productDiv.innerHTML = `
    //                 <a href="${image.link}" target="_blank">
    //                     <img src="${image.path}" alt="Product Image ${index + 1}" class="product-image">
    //                 </a>
    //             `;

    //             container.appendChild(productDiv);
    //         });
    //     })
    //     .catch(error => console.error('Error fetching images:', error));

    // Add to Cart Functionality
     // Add to Cart Functionality
     const addToCartButton = document.getElementById('addToCartButton');
     const cartCountElement = document.querySelector('.cart-count');
     const productDetails = document.querySelector('.product-details');
     const productName = productDetails.dataset.name;
     addToCartButton.disabled = true;
     addToCartButton.textContent = 'NOT AVAILABLE';

 
     // Function to update the cart count display
    //  function updateCartCount() {
    //      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //      cartCountElement.textContent = cartItems.length;
    //      cartCountElement.style.visibility = cartItems.length > 0 ? 'visible' : 'hidden';
    //  }
 
    //  function isProductInCart(productName) {
    //      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //      return cartItems.some(item => item.name === productName);
    //  }

    //  function lockAddToCartButton() {
    //     addToCartButton.textContent = 'IN CART';
    //     addToCartButton.disabled = true;
    //     addToCartButton.classList.add('in-cart');
    // }

    // function unlockAddToCartButton() {
    //     addToCartButton.textContent = 'ADD TO CART';
    //     addToCartButton.disabled = false;
    //     addToCartButton.classList.remove('in-cart');
    // }

    //  function addToCart(productName) {
    //     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    //     let productImage;
    //     if (productName === "EXOSKELETON") {
    //         productImage = "images/exoskeleton-image.jpg";
    //     } else if (productName === "EXOSKELETON-BLACK") {
    //         productImage = "images/exoskeleton-black-image.jpg"; /
    //     }

    //     if (!isProductInCart(productName)) {
    //         cartItems.push(product);
    //         localStorage.setItem('cartItems', JSON.stringify(cartItems));

    //         lockAddToCartButton();

    //     }

    //     updateCartCount();
    // }

    // Check if the product is already in the cart when the page loads
    if (isProductInCart(productName)) {
        lockAddToCartButton(); // Lock the button if the product is in the cart
    } else {
        unlockAddToCartButton(); // Unlock the button if the product is not in the cart
    }

    // Event listener for Add to Cart button
    addToCartButton.addEventListener('click', () => {
        addToCart(productName);
    });

    // Initialize the cart count display when the page loads
    updateCartCount();

 
     // Add product to cart and update localStorage
     addToCartButton.addEventListener('click', () => {
         const productName = productDetails.dataset.name;
         const productPrice = productDetails.dataset.price;
         const productSize = productDetails.dataset.size;
         const productImage = productDetails.dataset.image;
 
         const cartItem = {
             name: productName,
             price: productPrice,
             size: productSize,
             image: productImage
         };
 
         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
 
         // Add the item to the cart if it's not already there
         if (!isProductInCart(productName)) {
             cartItems.push(cartItem);
             localStorage.setItem('cartItems', JSON.stringify(cartItems));
 
             addToCartButton.textContent = 'IN CART';
             addToCartButton.disabled = true;
             addToCartButton.classList.add('in-cart');
         }
 
         // Update cart count display
         updateCartCount();
     });
 
     // Initialize the cart count display when the page loads
     updateCartCount();

    // Overlay and Dropdown Menu Functionality
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const overlay = document.getElementById('dropdownOverlay');

    // Debugging log: Check if the overlay element is found
    if (!dropdownButton || !overlay || !dropdownMenu) {
        console.error('Dropdown or Overlay element not found in cart.html');
        return; // Stop execution if elements are missing
    }


    // Function to show overlay and dropdown
    function showDropdown() {
        console.log('Showing dropdown and overlay');  
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        document.body.classList.add('no-scroll'); 
    }

    // Function to hide overlay and dropdown (mobile only)
    function hideDropdown() {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        document.body.classList.remove('no-scroll');  // Restore scrolling

    }

    // Setup the event listeners for mobile view
    function setupMobileDropdown() {
        dropdownButton.addEventListener('click', handleDropdownClick);
        overlay.addEventListener('click', hideDropdown);
    }

    // Cleanup mobile event listeners when switching to desktop
    function removeMobileDropdown() {
        dropdownButton.removeEventListener('click', handleDropdownClick);
        overlay.removeEventListener('click', hideDropdown);
    }

    // Handle dropdown click for mobile view
    function handleDropdownClick(e) {
        e.preventDefault();
        if (overlay.style.visibility === 'visible') {
            hideDropdown();
        } else {
            showDropdown();
        }
    }
        dropdownButton.addEventListener('click', handleDropdownClick);
        overlay.addEventListener('click', hideDropdown);



    function switchView() {
        const isCurrentlyMobile = window.innerWidth <= 600;

        if (isCurrentlyMobile && !isMobileView) {
            // Switch to mobile view
            removeDesktopHover();
            setupMobileDropdown();
            hideDropdown(); // Ensure dropdown is hidden initially
            isMobileView = true;
        } else if (!isCurrentlyMobile && isMobileView) {
            // Switch to desktop view
            removeMobileDropdown();
            setupDesktopHover();
            hideDropdown(); // Ensure dropdown is hidden initially
            isMobileView = false;
        }
    }

    // Initialize on page load
    switchView();

    // Listen for window resize and adjust view accordingly
    window.addEventListener('resize', switchView);
});

// Image Change Function for Thumbnails
function changeImage(imageSrc) {
    const mainProductImage = document.getElementById('mainProductImage');
    if (mainProductImage) {
        mainProductImage.src = imageSrc;
    } else {
        console.error('Main product image not found');
    }
}

// Dropdown Toggle
function handleDropdownToggle(event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    const dropdownMenu = document.getElementById('dropdownMenu');
    const overlay = document.getElementById('dropdownOverlay');
    dropdownMenu.classList.toggle('show');

    overlay.style.opacity = isVisible ? '1' : '0';
    overlay.style.visibility = isVisible ? 'visible' : 'hidden';
    document.body.classList.toggle('no-scroll', isVisible);
}

// Document Click Handling for Dropdown
function handleDocumentClick(event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (!dropdownMenu.contains(event.target) && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.classList.remove('no-scroll');
    }
}

// Setup Dropdown Toggle on Resize
function setupDropdownToggle() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const overlay = document.getElementById('dropdownOverlay');
    const dropdownButton = document.getElementById('dropdownMenuButton');

    if (window.innerWidth < 600) {
        overlay.style.display = 'block';
        dropdownButton.addEventListener('click', handleDropdownToggle);
        document.addEventListener('click', handleDocumentClick);
    } else {
        overlay.style.display = 'none';
        dropdownButton.removeEventListener('click', handleDropdownToggle);
        document.removeEventListener('click', handleDocumentClick);

        // Ensure dropdown resets
        dropdownMenu.classList.remove('show');
        dropdownMenu.style.opacity = '';
        dropdownMenu.style.visibility = '';

        console.log('Resetting dropdown for larger screens');
    }
}

window.addEventListener('resize', setupDropdownToggle);
window.addEventListener('load', setupDropdownToggle);

document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('mainProductImage');
    let magnifierDiv;
    let isActive = false;

    // Function to create magnifier
    function createMagnifier(e) {
        magnifierDiv = document.createElement('div');
        magnifierDiv.style.position = 'absolute';
        magnifierDiv.style.border = '3px solid black';
        magnifierDiv.style.borderRadius = '50%';
        magnifierDiv.style.width = '150px';
        magnifierDiv.style.height = '150px';
        magnifierDiv.style.overflow = 'hidden';
        magnifierDiv.style.cursor = 'none';
        magnifierDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        magnifierDiv.style.backgroundRepeat = 'no-repeat';
        magnifierDiv.style.pointerEvents = 'none';
        magnifierDiv.style.backgroundImage = `url(${image.src})`;  // Use the same image for zooming
        magnifierDiv.style.backgroundSize = `${image.width * 2}px ${image.height * 2}px`; // Zoom factor

        // Set the initial position of the magnifier
        moveMagnifier(e);

        document.body.appendChild(magnifierDiv);
    }

    // Function to move magnifier
    function moveMagnifier(e) {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Move the magnifier with the mouse
        magnifierDiv.style.left = `${e.clientX - 75}px`;
        magnifierDiv.style.top = `${e.clientY - 75}px`;

        // Adjust background position for zoom effect
        magnifierDiv.style.backgroundPosition = `-${x * 2 - 75}px -${y * 2 - 75}px`;
    }

    // Toggle magnifier on image click
    image.addEventListener('click', function(event) {
        event.stopPropagation();
        isActive = !isActive;

        if (isActive) {
            createMagnifier(event); // Create the magnifier at the click position
            image.addEventListener('mousemove', moveMagnifier); // Move magnifier on mouse move
        } else {
            removeMagnifier();
        }
    });

    // Remove magnifier when clicking outside the image
    document.addEventListener('click', (e) => {
        if (!image.contains(e.target) && isActive) {
            removeMagnifier();
        }
    });

    // Remove magnifier when the mouse leaves the image area
    image.addEventListener('mouseleave', () => {
        if (isActive) {
            removeMagnifier();
        }
    });

    // Function to remove magnifier
    function removeMagnifier() {
        if (magnifierDiv) {
            document.body.removeChild(magnifierDiv);
            image.removeEventListener('mousemove', moveMagnifier);
            isActive = false;
        }
    }

    
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split("/").pop();
    
    // Overlay and Dropdown Menu Functionality (only for pages that have the dropdown)
    if (currentPage === 'clothes.html') {
        const dropdownButton = document.getElementById('dropdownMenuButton');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const overlay = document.getElementById('dropdownOverlay');

        // Ensure overlay and dropdown menu are hidden on page load
        function initializeDropdown() {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
        }

        // Function to show overlay and dropdown
        function showDropdown() {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        }

        // Function to hide overlay and dropdown
        function hideDropdown() {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
        }

        // Toggle the dropdown and overlay on button click
        dropdownButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (overlay.style.visibility === 'visible') {
                hideDropdown();
            } else {
                showDropdown();
            }
        });

        // Hide the dropdown and overlay when the overlay is clicked
        overlay.addEventListener('click', hideDropdown);

        // Initialize overlay and dropdown as hidden on page load
        
        initializeDropdown();
    }
}); 


// ABOUT
const imageStack = document.querySelector('.image-stack');
const images = Array.from(imageStack.querySelectorAll('.wtf'));
const imageTracker = document.getElementById('image-tracker');
let currentIndex = 0;
let startX = 0;
let isDragging = false;
let moveX = 0;
const switchThreshold = 100; // Drag distance to switch image
const dragThreshold = 30; // Minimum drag distance to consider it a drag action

// Function to update the image tracker
const updateTracker = () => {
    imageTracker.textContent = `${currentIndex + 1}/${images.length}`;
};

// Initialize images' initial position and visibility
const updateImageStack = () => {
    images.forEach((img, i) => {
        if (i === currentIndex) {
            img.style.transform = 'translateX(0) rotateY(0)';
            img.style.opacity = '1';
            img.style.zIndex = images.length; // Top image
        } else {
            img.style.transform = `translateX(${(i - currentIndex) * 20}px) rotateY(${(i - currentIndex) * -10}deg)`;
            img.style.opacity = '0.5';
            img.style.zIndex = images.length - i;
        }
    });
    updateTracker();
};

// Initialize the first display
updateImageStack();

// Start dragging
const startDragging = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    moveX = 0; // Reset moveX on drag start
    imageStack.style.cursor = 'grabbing';
};

// Dragging effect
const onDrag = (e) => {
    if (!isDragging) return;
    moveX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - startX;

    // Check if drag distance is sufficient to switch images
    if (moveX > switchThreshold && currentIndex > 0) {
        currentIndex -= 1;
        startX += switchThreshold; // Reset start point to continue dragging
        moveX = 0;
    } else if (moveX < -switchThreshold && currentIndex < images.length - 1) {
        currentIndex += 1;
        startX -= switchThreshold; // Reset start point to continue dragging
        moveX = 0;
    }
    updateImageStack();
};

// End dragging
const endDragging = () => {
    // Only process drag end if the drag distance is above the threshold
    if (Math.abs(moveX) > dragThreshold) {
        isDragging = false;
    }
    imageStack.style.cursor = 'grab';
};

// Mouse events
imageStack.addEventListener('mousedown', startDragging);
imageStack.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', endDragging);

// Touch events for mobile
imageStack.addEventListener('touchstart', startDragging);
imageStack.addEventListener('touchmove', onDrag);
document.addEventListener('touchend', endDragging);










    