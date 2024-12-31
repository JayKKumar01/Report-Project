// Sample data for items and their associated images
const itemImageMap = new Map([
    ["Item 1", ["4.jpg", "3.jpg", "5.jpg"]],
    ["Item 2", ["2.jpg", "4.jpg"]],
    ["Item 3", ["2.jpg", "1.jpg", "4.jpg"]],
    ["Item 4", ["3.jpg", "5.jpg"]],
    ["Item 5", ["1.jpg", "2.jpg", "3.jpg", "5.jpg"]]
]);

// Default transformation values
let scale = 1;
let translateX = 0;
let translateY = 0;

const containerWidth = 854;
const containerHeight = 480;

const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

// Variables for pagination
let currentPageIndex = 0;
let totalPages = 1;
let currentImageSet = [];

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
        pageInfo.innerText = `Page ${pageIndex + 1} of ${totalPages}`;
        prevPageButton.disabled = pageIndex === 0;
        nextPageButton.disabled = pageIndex === totalPages - 1;
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
        showPage(currentPageIndex);
    } else {
        console.error(`No images found for item: ${itemName}`);
    }
}

// Populate the item list dynamically
document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.querySelector(".item-list ul");
    itemImageMap.forEach((images, itemName) => {
        const listItem = document.createElement("li");
        listItem.innerText = itemName;
        listItem.addEventListener("click", () => {
            document.querySelectorAll(".item-list li").forEach(li => li.classList.remove("selected"));
            listItem.classList.add("selected");
            showImageSet(itemName);
        });
        itemList.appendChild(listItem);
    });

    // Automatically select and load the first item
    const firstItem = itemList.querySelector("li");
    if (firstItem) {
        firstItem.classList.add("selected");
        showImageSet(firstItem.innerText);
    }
});

// Zoom slider functionality
zoomSlider.addEventListener("input", () => {
    scale = parseFloat(zoomSlider.value);
    const { maxX, maxY } = getMovementLimits();
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));
    updateTransform();
});

// Movement buttons logic
document.getElementById("move-left").addEventListener("click", () => {
    const { maxX } = getMovementLimits();
    translateX = Math.min(maxX, translateX + 10);
    updateTransform();
});

document.getElementById("move-right").addEventListener("click", () => {
    const { maxX } = getMovementLimits();
    translateX = Math.max(-maxX, translateX - 10);
    updateTransform();
});

document.getElementById("move-up").addEventListener("click", () => {
    const { maxY } = getMovementLimits();
    translateY = Math.min(maxY, translateY + 10);
    updateTransform();
});

document.getElementById("move-down").addEventListener("click", () => {
    const { maxY } = getMovementLimits();
    translateY = Math.max(-maxY, translateY - 10);
    updateTransform();
});

// Navigation buttons logic
prevPageButton.addEventListener("click", () => {
    if (currentPageIndex > 0) showPage(currentPageIndex - 1);
});

nextPageButton.addEventListener("click", () => {
    if (currentPageIndex < totalPages - 1) showPage(currentPageIndex + 1);
});
