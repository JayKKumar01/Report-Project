// Array of available images and alignment images
const availableImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
const availableAllignImages = ["align1.jpg", "align2.jpg"];

// Helper function for selecting random images
function getRandomImage(array, exclude = null) {
    let image;
    do {
        image = array[Math.floor(Math.random() * array.length)];
    } while (image === exclude); // Ensure image is not the same as the excluded one
    return image;
}

// Create the itemImageMap with random images
const itemImageMap = new Map([
    ["Item A", {
        validationImages: [
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)]
        ],
        alignmentImages: [
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]]
        ]
    }],
    ["Item B", {
        validationImages: [
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)]
        ],
        alignmentImages: [
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]]
        ]
    }],
    ["Item C", {
        validationImages: [
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)]
        ],
        alignmentImages: [
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]]
        ]
    }],
    ["Item D", {
        validationImages: [
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)]
        ],
        alignmentImages: [
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]]
        ]
    }],
    ["Item E", {
        validationImages: [
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)],
            [getRandomImage(availableImages), getRandomImage(availableImages)]
        ],
        alignmentImages: [
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]],
            [availableAllignImages[0], availableAllignImages[1], availableAllignImages[1]]
        ]
    }]
]);

// Example: Log the map to check the result
console.log(itemImageMap);
