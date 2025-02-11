

// Define the media query
const mediaQuery = window.matchMedia("(max-width: 800px)");

// Select all elements with the class
const elements = document.querySelectorAll(".intro-panel");

// Function to apply styles
function handleScreenChange(e) {
    elements.forEach(element => {
        if (e.matches) {
            element.style.width = "80%"; // Set width to 20%
        } else {

            element.style.width = "20%"; // Reset width
        }
    });
}

// Initial check
handleScreenChange(mediaQuery);

// Listen for changes
mediaQuery.addEventListener("change", handleScreenChange);
