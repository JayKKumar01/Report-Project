function showImage(imageFileName) {
    const imagePath = `items/${imageFileName}`;
    const displayedImage = document.getElementById("displayedImage");
    displayedImage.src = imagePath;
    displayedImage.alt = `Image for ${imageFileName}`;
}

// Zoom functionality
const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");

// Initialize scale and translation values
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

// Update the scale of the image based on the slider value
zoomSlider.addEventListener("input", () => {
    scale = zoomSlider.value;
    if(scale == 1){
        translateX = 0;
        translateY = 0;
        startX = 0;
        startY = 0;
    }
    updateTransform();
    
});

// Function to update image transform
function updateTransform() {
    displayedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Drag functionality
displayedImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    displayedImage.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // Calculate the movement
        translateX += (e.clientX - startX) / scale; // Adjust for scale
        translateY += (e.clientY - startY) / scale; // Adjust for scale

        // Update positions
        startX = e.clientX;
        startY = e.clientY;

        // Apply transformation
        updateTransform();
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    displayedImage.style.cursor = "grab";
});
