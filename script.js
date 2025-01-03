// Constants for screen resolution
const SCREEN_WIDTH = window.screen.width;  // Screen width in pixels
const SCREEN_HEIGHT = window.screen.height; // Screen height in pixels

const RES_FACTOR = 864;

// Default transformation values
let scale = 1;
let translateX = 0;
let translateY = 0;

let containerWidth = 640;
let containerHeight = 360;


const IDEAL_HEIGHT = Math.floor(SCREEN_HEIGHT * (480 / RES_FACTOR));
const IDEAL_WIDTH = IDEAL_HEIGHT * 1.42;

const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const container = document.querySelector('.image-viewer');

const contentValidationButton = document.querySelector('.content-validation');
const alignmentValidationButton = document.querySelector('.alignment-validation');
const actionModeButtons = document.getElementById("actionModeButtons");
const pressHoldButton = document.getElementById("pressHoldBtn");
const highlightButton = document.getElementById("highlightBtn");
const reportImageView = document.getElementById("report-image-view");
const reportImageElement = document.getElementById("reportImage");

// Variables for pagination
let currentPageIndex = 0;
let totalPages = 1;
let currentImageSet = [];

// Function to reset zoom and position
function resetTransform() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    zoomSlider.value = 1;
    updateTransform();
}

// Attach event listeners for page navigation
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

// Function to load and adjust the image
function loadImageAndAdjust(imageSrc) {
    let tempImage = new Image();
    tempImage.src = imageSrc;

    tempImage.onload = function () {
        adjustContainerSize(tempImage);
        displayedImage.src = imageSrc;
        tempImage.onload = null;
        tempImage = null;
    };
}

// Function to show a specific page
function showPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentPageIndex = pageIndex;

        if (lastClickedSection === 'validation') {
            const currentPair = currentImageSet[pageIndex];
            const mainImageSrc = currentPair[0]; // First image in the pair
            const reportImageSrc = currentPair[1]; // Second image in the pair

            console.log(`Main Image: ${mainImageSrc}, Report Image: ${reportImageSrc}`);

            // Load main image
            loadImageAndAdjust(mainImageSrc);

            // Load report image
            reportImageElement.src = reportImageSrc;
        } else {
            let src = currentImageSet[pageIndex];
            console.log(`src: ${src}`);
            loadImageAndAdjust(src);
        }



        pageInfo.innerText = `Page ${pageIndex + 1} of ${totalPages}`;
        prevPageButton.disabled = pageIndex === 0;
        nextPageButton.disabled = pageIndex === totalPages - 1;
        resetTransform();
    }
}

// Generalized function to load the appropriate image set based on validation or alignment section
function showImageSet(itemName, section) {
    const itemData = itemImageMap.get(itemName);
    if (!itemData) {
        console.error("Item not found!");
        return;
    }

    const getImageSet = (section, isPressAndHold, itemData) => {
        if (section === 'alignment') {
            return isPressAndHold
                ? itemData.alignmentImages.map(arr => `items/${arr[0]}`) // First image of each pair
                : itemData.alignmentImages.map(arr => `items/${arr[2]}`); // Third image of each pair (if exists)
        } else {
            return itemData.validationImages.map(arr => [`items/${arr[0]}`, `items/${arr[1]}`]); // First and second images for validation
        }
    };
    const imageSet = getImageSet(section, isPressAndHold, itemData);

    if (imageSet.length > 0) {
        currentImageSet = imageSet;
        totalPages = imageSet.length;
        currentPageIndex = 0;
        showPage(currentPageIndex);  // Display the first page/image
    }
}


// Function to adjust the container size based on the image ratio
function adjustContainerSize(image) {
    const aspectRatio = image.width / image.height;
    containerHeight = Math.floor(Math.min(IDEAL_HEIGHT, IDEAL_WIDTH / aspectRatio));
    containerWidth = Math.floor(containerHeight * aspectRatio);

    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;

    console.log(`Updated container size: Width = ${containerWidth}px, Height = ${containerHeight}px`);
}

// Variable to track the last clicked section (validation or alignment)
let lastClickedSection = 'validation';  // Default: 'validation'
let currentSelectedItem = null;  // This will hold the selected item
let isPressAndHold = true;

// Function to switch button styles
const switchButtonStyles = (activeButton, inactiveButton) => {
    activeButton.style.backgroundColor = "#4caf50";  // Active green
    inactiveButton.style.backgroundColor = "#9e9e9e";  // Inactive grey
};

// Event listener for section button clicks (both validation and alignment)
const sectionButtonHandler = (selectedSection, activeButton, inactiveButton) => {
    lastClickedSection = selectedSection;
    switchButtonStyles(activeButton, inactiveButton);
    showImageSet(currentSelectedItem, selectedSection);

    if (selectedSection === 'alignment') {
        actionModeButtons.style.display = "block";
        reportImageView.style.display = "none";
    } else {
        actionModeButtons.style.display = "none";
        reportImageView.style.display = "block";
    }
};



// Populate the item list dynamically
document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.querySelector(".item-list ul");
    itemImageMap.forEach((images, itemName) => {
        const listItem = document.createElement("li");
        listItem.innerText = itemName;
        listItem.addEventListener("click", () => {
            document.querySelectorAll(".item-list li").forEach(li => li.classList.remove("selected"));
            listItem.classList.add("selected");
            currentSelectedItem = itemName;  // Set the currently selected item
            showImageSet(itemName, lastClickedSection);  // Show the image set based on the last clicked section
        });
        itemList.appendChild(listItem);
    });

    const firstItem = itemList.querySelector("li");
    if (firstItem) {
        firstItem.classList.add("selected");
        currentSelectedItem = firstItem.innerText;  // Set the first item as selected
        showImageSet(firstItem.innerText, "validationImages");
    }

    // Set up the validation buttons
    // Attach events for Content Validation and Alignment buttons
    contentValidationButton.addEventListener("click", () => sectionButtonHandler('validation', contentValidationButton, alignmentValidationButton));
    alignmentValidationButton.addEventListener("click", () => sectionButtonHandler('alignment', alignmentValidationButton, contentValidationButton));

    // Attach event listeners
    pressHoldButton.addEventListener("click", () => handleActionMode("pressHold"));
    highlightButton.addEventListener("click", () => handleActionMode("highlight"));


    setupAlignmentHold();
});



// Function to update the transform property of the image
function updateTransform() {
    displayedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Zoom slider functionality
zoomSlider.addEventListener("input", () => {
    scale = parseFloat(zoomSlider.value);
    handleZoom();
});

function handleZoom() {
    const { maxX, maxY } = getMovementLimits();
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

    if (scale === 1) {
        translateX = 0;
        translateY = 0;
    }

    console.log("Zoom Adjusted:", { scale });
    updateTransform();
}

// Function to calculate movement limits
function getMovementLimits() {
    const zoomedWidth = containerWidth * scale;
    const zoomedHeight = containerHeight * scale;
    const maxX = Math.max(0, (zoomedWidth - containerWidth) / (scale * 2));
    const maxY = Math.max(0, (zoomedHeight - containerHeight) / (scale * 2));

    return { maxX, maxY };
}

// Function to handle movement and restrict boundaries
function moveImage(direction, factor) {
    const { maxX, maxY } = getMovementLimits();

    if (direction === "left") {
        translateX = Math.min(maxX, translateX + 10 * factor);
    } else if (direction === "right") {
        translateX = Math.max(-maxX, translateX - 10 * factor);
    } else if (direction === "up") {
        translateY = Math.min(maxY, translateY + 10 * factor);
    } else if (direction === "down") {
        translateY = Math.max(-maxY, translateY - 10 * factor);
    }

    console.log("Movement Debugging:", { translateX, translateY, maxX, maxY });
    updateTransform();
}

// Attach event listeners for movement buttons
document.getElementById("move-left").addEventListener("click", () => moveImage("left", 1));
document.getElementById("move-right").addEventListener("click", () => moveImage("right", 1));
document.getElementById("move-up").addEventListener("click", () => moveImage("up", 1));
document.getElementById("move-down").addEventListener("click", () => moveImage("down", 1));

// Keyboard event listeners for movement (arrow keys)
document.addEventListener("keydown", (event) => {
    const moveFactor = 0.2;
    switch (event.key) {
        case "ArrowLeft":
            moveImage("left", moveFactor);
            break;
        case "ArrowRight":
            moveImage("right", moveFactor);
            break;
        case "ArrowUp":
            moveImage("up", moveFactor);
            break;
        case "ArrowDown":
            moveImage("down", moveFactor);
            break;
        case "+":
            zoomImage("in");
            break;
        case "-":
            zoomImage("out");
            break;
        default:
            break;
    }
});

// Function to handle zoom in and zoom out
function zoomImage(action) {
    if (action === "in" && scale < 6) {  // Limit zoom in to 6x
        scale += 0.1;
    } else if (action === "out" && scale > 1) {  // Limit zoom out to 1x
        scale -= 0.1;
    }

    handleZoom();
    zoomSlider.value = scale;
}

function handleActionMode(mode) {
    isPressAndHold = mode === 'pressHold';
    console.log(`Action mode selected: ${mode}`);
    if (isPressAndHold) {
        switchButtonStyles(pressHoldButton, highlightButton);
    } else {
        switchButtonStyles(highlightButton, pressHoldButton);
    }
    showImageSet(currentSelectedItem, 'alignment');

}

// Function to handle alignment preview on hold
function setupAlignmentHold() {
    // Add event listeners for hold behavior
    displayedImage.addEventListener("mousedown", () => showSecondImage(currentPageIndex));
    displayedImage.addEventListener("mouseup", () => resetImage(currentPageIndex));
    displayedImage.addEventListener("mouseleave", () => resetImage(currentPageIndex));// Reset if the cursor leaves the image
}

// Function to show the second image of the pair
function showSecondImage(index) {
    if (!isPressAndHold || lastClickedSection !== 'alignment') return; // Ensure it's the alignment section
    const itemData = itemImageMap.get(currentSelectedItem);
    if (itemData && itemData.alignmentImages && index < itemData.alignmentImages.length) {
        const secondImage = itemData.alignmentImages[index][1];
        const src = `items/${secondImage}`; // Replace displayedImage source
        loadImageAndAdjust(src);
    }
}

// Function to reset the image to the first in the pair
function resetImage(index) {
    if (!isPressAndHold || lastClickedSection !== 'alignment') return; // Ensure it's the alignment section
    const itemData = itemImageMap.get(currentSelectedItem);
    if (itemData && itemData.alignmentImages && index < itemData.alignmentImages.length) {
        const firstImage = itemData.alignmentImages[index][0];
        const src = `items/${firstImage}`; // Replace displayedImage source
        loadImageAndAdjust(src);
    }
}