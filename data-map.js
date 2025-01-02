// Map to store the item image data
const itemImageMap = new Map([
    ["Item A", {
        validationImages: [
            ["1.jpg", "2.jpg"],
            ["3.jpg", "4.jpg"],
            ["5.jpg", "6.jpg"],
            ["2.jpg", "3.jpg"],
            ["4.jpg", "5.jpg"],
        ],
        alignmentImages: [
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
        ]
    }],
    ["Item B", {
        validationImages: [
            ["1.jpg", "3.jpg"],
            ["2.jpg", "4.jpg"],
            ["5.jpg", "1.jpg"],
            ["3.jpg", "5.jpg"],
            ["4.jpg", "2.jpg"],
        ],
        alignmentImages: [
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
        ]
    }],
    ["Item C", {
        validationImages: [
            ["2.jpg", "3.jpg"],
            ["4.jpg", "5.jpg"],
            ["6.jpg", "1.jpg"],
            ["3.jpg", "4.jpg"],
            ["5.jpg", "6.jpg"],
        ],
        alignmentImages: [
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
        ]
    }],
    ["Item D", {
        validationImages: [
            ["1.jpg", "5.jpg"],
            ["2.jpg", "6.jpg"],
            ["3.jpg", "1.jpg"],
            ["4.jpg", "3.jpg"],
            ["5.jpg", "2.jpg"],
        ],
        alignmentImages: [
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
        ]
    }],
    ["Item E", {
        validationImages: [
            ["1.jpg", "3.jpg"],
            ["4.jpg", "2.jpg"],
            ["5.jpg", "6.jpg"],
            ["3.jpg", "5.jpg"],
            ["2.jpg", "4.jpg"],
        ],
        alignmentImages: [
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
            ["align1.jpg", "align2.jpg", "align2.jpg"],
        ]
    }]
]);

// Example: Log the map to check the result
console.log(itemImageMap);
