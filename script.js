// Sample data for items and their associated images
const itemImageMap = new Map([
    ["Item 1", ["4.jpg", "3.jpg", "5.jpg"]],
    ["Item 2", ["2.jpg", "4.jpg", "6.jpg"]],
    ["Item 3", ["2.jpg", "1.jpg", "4.jpg"]],
    ["Item 4", ["3.jpg", "5.jpg"]],
    ["Item 5", ["1.jpg", "2.jpg", "3.jpg", "5.jpg"]]
]);

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

function loadImageAndAdjust(imageSrc) {
    // Create a temporary image element to calculate dimensions
    let tempImage = new Image();
    tempImage.src = imageSrc;

    tempImage.onload = function () {
        // Adjust the container size based on the image dimensions
        adjustContainerSize(tempImage);

        // After the temp image loads, update the src of the displayed image
        displayedImage.src = imageSrc;  // Assign the actual source to the displayed image

        // Remove the temporary image from memory (this is optional but recommended)
        tempImage.onload = null;  // Unbind the event handler
        tempImage = null;  // Clean up the temporary image object
    };
}

// Function to show a specific page
function showPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentPageIndex = pageIndex;
        loadImageAndAdjust(currentImageSet[pageIndex]);
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

// Function to adjust the container size based on the image ratio
function adjustContainerSize(image) {
    // Calculate aspect ratio of the image (width / height)
    const aspectRatio = image.width / image.height;

    containerHeight = Math.floor(Math.min(480, 854 / aspectRatio));
    containerWidth = Math.floor(containerHeight * aspectRatio);


    // Set the new dimensions on the container
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;

    console.log(`Updated container size: Width = ${containerWidth}px, Height = ${containerHeight}px`);
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

// Function to update the transform property of the image
function updateTransform() {
    displayedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

// Zoom slider functionality
zoomSlider.addEventListener("input", () => {
    scale = parseFloat(zoomSlider.value);


    // Get movement limits
    const { maxX, maxY } = getMovementLimits();

    // Adjust translation based on limits
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));

    // Reset translation for scale 1
    if (scale === 1) {
        translateX = 0;
        translateY = 0;
    }



    // Log details
    console.log("Zoom Adjusted:");
    console.log("Scale:", scale);

    // Apply the transformation
    updateTransform();
});


function getMovementLimits() {
    // Zoomed dimensions of the displayed image
    const zoomedWidth = containerWidth * scale;
    const zoomedHeight = containerHeight * scale;

    // Calculate the visible movement limits
    const maxX = Math.max(0, ((zoomedWidth - containerWidth) / (scale * 2)));
    const maxY = Math.max(0, ((zoomedHeight - containerHeight) / (scale * 2)));

    return { maxX, maxY };
}

// Function to handle movement and restrict beyond image boundaries
function moveImage(direction) {
    const { maxX, maxY } = getMovementLimits();

    if (direction === "left") {
        translateX = Math.min(maxX, translateX + 10); // Move left
    } else if (direction === "right") {
        translateX = Math.max(-maxX, translateX - 10); // Move right
    } else if (direction === "up") {
        // Move up but restricted by maxY
        translateY = Math.min(maxY, translateY + 10);
    } else if (direction === "down") {
        // Move down but restricted by maxY
        translateY = Math.max(-maxY, translateY - 10);
    }

    console.log('Movement Debugging:');
    console.log('translateX:', translateX, 'translateY:', translateY);
    console.log('maxX:', maxX, 'maxY:', maxY);
    updateTransform();
}


// Attach event listeners for movement buttons
document.getElementById("move-left").addEventListener("click", () => moveImage("left"));
document.getElementById("move-right").addEventListener("click", () => moveImage("right"));
document.getElementById("move-up").addEventListener("click", () => moveImage("up"));
document.getElementById("move-down").addEventListener("click", () => moveImage("down"));