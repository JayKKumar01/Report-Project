// Array of available images
const availableImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
const availableAllignImages = ["align1.jpg", "align2.jpg"];

// Function to generate random data for the item
function generateRandomItem(itemName) {
    // Generate a random number of validation images (between 2 and 6)
    const numValidationPairs = Math.floor(Math.random() * 5) + 2; // Between 2 and 6
    const validationImages = [];

    // Generate random pairs for validation images
    while (validationImages.length < numValidationPairs) {
        const img1 = availableImages[Math.floor(Math.random() * availableImages.length)];
        let img2;

        // Ensure the second image in the pair is different from the first
        do {
            img2 = availableImages[Math.floor(Math.random() * availableImages.length)];
        } while (img2 === img1);

        validationImages.push([img1, img2]); // Add the pair
    }


    // Generate alignment pairs equal to the number of validation images
    const alignmentImages = validationImages.map(() => {
        // const img1 = availableImages[Math.floor(Math.random() * availableImages.length)];
        // const img2 = availableImages[Math.floor(Math.random() * availableImages.length)];
        const img1 = availableAllignImages[0];
        const img2 = availableAllignImages[1];
        return [img1, img2, img2];
    });

    // Add the item data to the map
    itemImageMap.set(itemName, {
        validationImages: validationImages,
        alignmentImages: alignmentImages,
    });
}

// Create a map and populate it with random items
const itemImageMap = new Map();

// Generate random items and add to the map
generateRandomItem("Item A");
generateRandomItem("Item B");
generateRandomItem("Item C");
generateRandomItem("Item D");
generateRandomItem("Item E");

// Example: Log the map to check the result
console.log(itemImageMap);
