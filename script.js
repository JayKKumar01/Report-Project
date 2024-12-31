// Default transformation values
let scale = 1;
let translateX = 0;
let translateY = 0;

let containerWidth = 854;
let containerHeight = 480;

const zoomSlider = document.getElementById("zoom-slider");
const displayedImage = document.getElementById("displayedImage");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const container = document.querySelector('.image-viewer');

const contentValidationButton = document.querySelector('.content-validation');
const alignmentValidationButton = document.querySelector('.alignment-validation');

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
        let src = currentImageSet[pageIndex];
        console.log(`src: ${src}`);
        loadImageAndAdjust(src);
        pageInfo.innerText = `Page ${pageIndex + 1} of ${totalPages}`;
        prevPageButton.disabled = pageIndex === 0;
        nextPageButton.disabled = pageIndex === totalPages - 1;
        resetTransform();
    }
}

// Function to load images for the selected item and section (validation or alignment)
// function showImageSet(itemName, validationType) {
//     const itemData = itemImageMap.get(itemName);
//     if (itemData && itemData[validationType] && itemData[validationType].length > 0) {
//         if (validationType === "validationImages") {
//             currentImageSet = itemData.validationImages.map(name => `items/${name}`);
//             totalPages = currentImageSet.length;
//         }
//         else if (validationType === "alignmentImages") {
//             // Load the first image of each pair in the alignmentImages array
//             currentImageSet = itemData.alignmentImages.map(pair => `items/${pair[0]}`);
//             totalPages = currentImageSet.length; // Total pages now equals the number of pairs
//         }
//         currentPageIndex = 0;
//         showPage(currentPageIndex);
//     } else {
//         console.error(`No images found for item: ${itemName} under ${validationType}`);
//     }
// }

// Generalized function to load the appropriate image set based on validation or alignment section
function showImageSet(itemName, section) {
    const itemData = itemImageMap.get(itemName);
    if (!itemData) {
        console.error("Item not found!");
        return;
    }

    const imageSet = (section === 'alignment') 
        ? itemData.alignmentImages.map(pair => `items/${pair[0]}`)  // Only first image of each pair for alignment
        : itemData.validationImages.map(name => `items/${name}`);     // Full set for validation

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
    containerHeight = Math.floor(Math.min(480, 854 / aspectRatio));
    containerWidth = Math.floor(containerHeight * aspectRatio);

    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;

    console.log(`Updated container size: Width = ${containerWidth}px, Height = ${containerHeight}px`);
}

// Variable to track the last clicked section (validation or alignment)
let lastClickedSection = 'validation';  // Default: 'validation'
let currentSelectedItem = null;  // This will hold the selected item

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
