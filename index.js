// Select the dropdown icon, content, and overlay
const dropdownIcon = document.querySelector('.dropdown-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const overlay = document.querySelector('.overlay');

// Toggle dropdown and background effect when icon is clicked
dropdownIcon.addEventListener('click', function () {
    const isDropdownVisible = dropdownContent.classList.contains('show');

    // Toggle the 'show' class for dropdown content and overlay visibility
    dropdownContent.classList.toggle('show');
    document.body.classList.toggle('dropdown-active');

    // If the dropdown is visible, make it hidden by adjusting opacity and pointer-events
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
