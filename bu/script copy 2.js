function showImage(imageFileName) {
    const imagePath = `items/${imageFileName}`;
    const displayedImage = document.getElementById("displayedImage");

    // Reset zoom and position when a new image is selected
    const zoomSlider = document.getElementById("zoom-slider");
    zoomSlider.value = 1;

    displayedImage.style.transform = `scale(1) translate(0px, 0px)`;
    displayedImage.src = imagePath;
    displayedImage.alt = `Image for ${imageFileName}`;
}

// Zoom functionality
const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");

// Fixed container dimensions
const containerWidth = 640;
const containerHeight = 360;

// Default values
let scale = 1; // Initial zoom level
let translateX = 0;
let translateY = 0;

// Calculate movement limits
function getMovementLimits() {
    const zoomedWidth = containerWidth * scale;
    const zoomedHeight = containerHeight * scale;

    const maxX = Math.max(0, (zoomedWidth - containerWidth) / 2);
    const maxY = Math.max(0, (zoomedHeight - containerHeight) / 2);

    return { maxX, maxY };
}

// Apply transform to the image
function updateTransform() {
    displayedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Handle zoom changes
zoomSlider.addEventListener("input", () => {
    scale = parseFloat(zoomSlider.value);
    const { maxX, maxY } = getMovementLimits();

    // Ensure the image stays within bounds when zoom changes
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

    updateTransform();
});

// Move buttons logic
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
