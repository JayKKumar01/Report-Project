// Sample data for items and their associated images
const itemImageMap = new Map([
    ["Item 1", ["4.jpg", "3.jpg", "5.jpg"]], // Random images for Item 1
    ["Item 2", ["2.jpg", "4.jpg"]],         // Random images for Item 2
    ["Item 3", ["2.jpg", "1.jpg", "4.jpg"]],// Random images for Item 3
    ["Item 4", ["3.jpg", "5.jpg"]],         // Random images for Item 4
    ["Item 5", ["1.jpg", "2.jpg", "3.jpg", "5.jpg"]] // Random images for Item 5
]);

// Default transformation values
let scale = 1; // Initial zoom level
let translateX = 0;
let translateY = 0;

// Fixed container dimensions
const containerWidth = 854;
const containerHeight = 480;

// Elements
const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

// Variables for pagination
let currentPageIndex = 0; // Current page index
let totalPages = 1; // Total pages for the current item
let currentImageSet = []; // Array to store images for the current item

// Function to calculate movement limits
function getMovementLimits() {
    const zoomedWidth = containerWidth * scale;
    const zoomedHeight = containerHeight * scale;

    const maxX = Math.max(0, (zoomedWidth - containerWidth) / 2);
    const maxY = Math.max(0, (zoomedHeight - containerHeight) / 2);

    return { maxX, maxY };
}

// Function to update the transform property of the image
function updateTransform() {
    displayedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Function to reset zoom and position
function resetTransform() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    zoomSlider.value = 1;
    updateTransform();
}

// Function to show a specific page
function showPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentPageIndex = pageIndex;
        displayedImage.src = currentImageSet[pageIndex];

        // Update page info
        pageInfo.innerText = `Page ${pageIndex + 1} of ${totalPages}`;

        // Enable/disable navigation buttons
        prevPageButton.disabled = pageIndex === 0;
        nextPageButton.disabled = pageIndex === totalPages - 1;

        // Reset zoom and position for the new image
        resetTransform();
    }
}

// Function to load a new image set for an item
function showImageSet(itemName) {
    const imageSet = itemImageMap.get(itemName);
    if (imageSet && imageSet.length > 0) {
        currentImageSet = imageSet.map(name => `items/${name}`);
        totalPages = currentImageSet.length;
        currentPageIndex = 0;

        // Show the first page
        showPage(currentPageIndex);
    } else {
        console.error(`No images found for item: ${itemName}`);
    }
}

// Zoom functionality
zoomSlider.addEventListener("input", () => {
    scale = parseFloat(zoomSlider.value);
    const { maxX, maxY } = getMovementLimits();

    // Keep translations within bounds when zoom changes
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

    updateTransform();
});

// Movement buttons logic
document.getElementById("move-left").addEventListener("click", () => {
    const { maxX } = getMovementLimits();
    translateX = Math.min(maxX, translateX + 10); // Move left
    updateTransform();
});

document.getElementById("move-right").addEventListener("click", () => {
    const { maxX } = getMovementLimits();
    translateX = Math.max(-maxX, translateX - 10); // Move right
    updateTransform();
});

document.getElementById("move-up").addEventListener("click", () => {
    const { maxY } = getMovementLimits();
    translateY = Math.min(maxY, translateY + 10); // Move up
    updateTransform();
});

document.getElementById("move-down").addEventListener("click", () => {
    const { maxY } = getMovementLimits();
    translateY = Math.max(-maxY, translateY - 10); // Move down
    updateTransform();
});

// Navigation buttons logic
prevPageButton.addEventListener("click", () => {
    if (currentPageIndex > 0) {
        showPage(currentPageIndex - 1);
    }
});

nextPageButton.addEventListener("click", () => {
    if (currentPageIndex < totalPages - 1) {
        showPage(currentPageIndex + 1);
    }
});

// Example: Assigning click events for the items in the list
document.querySelectorAll(".item-list li").forEach(li => {
    li.addEventListener("click", () => {
        // Remove 'selected' class from all items
        document.querySelectorAll(".item-list li").forEach(item => {
            item.classList.remove("selected");
        });

        // Add 'selected' class to the clicked item
        li.classList.add("selected");

        // Show the images for the selected item
        const itemName = li.innerText;
        showImageSet(itemName);
    });
});

// Automatically select and load the first item on page load
document.addEventListener("DOMContentLoaded", () => {
    const firstItem = document.querySelector(".item-list li");
    if (firstItem) {
        firstItem.classList.add("selected"); // Mark the first item as selected
        const firstItemName = firstItem.innerText; // Get the name of the first item
        showImageSet(firstItemName); // Load images for the first item
    }
});

