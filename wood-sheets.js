// Retrieve selected items from localStorage
const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));

// DOM Elements
const woodSheetDisplay = document.getElementById("wood-sheet-display");

// Standard wood sheet size (1224mm x 2440mm)
const woodSheetSize = { width: 1224, height: 2440 };

// Calculate total area of selected items
let totalArea = 0;
selectedItems.forEach((item) => {
  const size = item.size.split("x");
  const width = parseFloat(size[0]) * 10; // Convert cm to mm
  const height = parseFloat(size[1]) * 10; // Convert cm to mm
  totalArea += width * height * item.pieces;
});

// Calculate number of wood sheets required
const woodSheetArea = woodSheetSize.width * woodSheetSize.height;
const sheetsNeeded = Math.ceil(totalArea / woodSheetArea);

// Display wood sheet calculation
woodSheetDisplay.innerHTML = `
  <p><strong>Wood Sheet Size:</strong> 1224mm x 2440mm</p>
  <p><strong>Total Sheets Required:</strong> ${sheetsNeeded}</p>
`;

// Back to Selection button
document.getElementById("back-to-selection").addEventListener("click", () => {
  window.location.href = "index.html";
});