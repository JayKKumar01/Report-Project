const itemImageMap = new Map([
    ["Item A", {
        validationImages: ["1.jpg", "2.jpg", "3.jpg"], // Example images to show for validation
        alignmentImages: [
            ["1.jpg", "2.jpg"],
            ["2.jpg", "3.jpg"],
            ["3.jpg", "4.jpg"]
        ]
    }],
    ["Item B", {
        validationImages: ["4.jpg", "5.jpg", "6.jpg"], 
        alignmentImages: [
            ["4.jpg", "5.jpg"],
            ["5.jpg", "6.jpg"],
            ["4.jpg", "6.jpg"]
        ]
    }],
    ["Item C", {
        validationImages: ["2.jpg", "1.jpg", "5.jpg"],
        alignmentImages: [
            ["2.jpg", "1.jpg"],
            ["1.jpg", "5.jpg"],
            ["5.jpg", "2.jpg"]
        ]
    }],
    ["Item D", {
        validationImages: ["3.jpg", "4.jpg", "1.jpg"],
        alignmentImages: [
            ["3.jpg", "4.jpg"],
            ["4.jpg", "1.jpg"],
            ["1.jpg", "3.jpg"]
        ]
    }],
    ["Item E", {
        validationImages: ["6.jpg", "2.jpg", "5.jpg"],
        alignmentImages: [
            ["6.jpg", "2.jpg"],
            ["2.jpg", "5.jpg"],
            ["5.jpg", "6.jpg"]
        ]
    }]
]);