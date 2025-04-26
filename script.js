// Array to store selected items
let selectedItems = [];
let currentLocation = "";
let currentFurniture = "";
let currentSize = "";

// DOM Elements
const locationSection = document.getElementById("location-section");
const furnitureSection = document.getElementById("furniture-section");
const sizeSection = document.getElementById("size-section");
const itemsSection = document.getElementById("items-section");
const selectedItemsSection = document.getElementById("selected-items-section");
const selectedItemsGrid = document.querySelector(".selected-items-grid");

// Event Listeners
document.querySelectorAll(".location-card").forEach((card) => {
  card.addEventListener("click", () => {
    const location = card.getAttribute("data-location");
    showFurniture(location);
  });
});

// Functions
function showFurniture(location) {
  locationSection.classList.add("hidden");
  furnitureSection.classList.remove("hidden");
  currentLocation = location;

  // Format location name for display
  const formattedLocation = location.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  document.querySelector("#furniture-section h2").textContent = `Choose Furniture for ${formattedLocation}`;

  const furnitureTypes = Object.keys(furnitureData[location]);
  const furnitureGrid = document.querySelector(".furniture-grid");
  furnitureGrid.innerHTML = furnitureTypes
    .map(
      (type) => {
        const displayType = type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
        return `
        <div class="furniture-card" data-furniture="${type}">
          <img src="assets/furniture/${type}.jpg" alt="${displayType}">
          <p>${displayType}</p>
        </div>
      `;
      }
    )
    .join("");

  document.querySelectorAll(".furniture-card").forEach((card) => {
    card.addEventListener("click", () => {
      const furniture = card.getAttribute("data-furniture");
      showSizes(location, furniture);
    });
  });
}

function showSizes(location, furniture) {
  furnitureSection.classList.add("hidden");
  sizeSection.classList.remove("hidden");
  currentFurniture = furniture;

  // Format furniture name for display
  const formattedFurniture = furniture.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  document.querySelector("#size-section h2").textContent = `Choose Size for ${formattedFurniture}`;

  // Set size descriptions based on furniture type
  const sizeDescription = document.querySelector(".size-description");
  sizeDescription.innerHTML = getSizeDescription(furniture);

  const sizes = Object.keys(furnitureData[location][furniture]);
  const sizeGrid = document.querySelector(".size-grid");
  sizeGrid.innerHTML = sizes
    .map(
      (size) => {
        const dimensions = getSizeDimensions(location, furniture, size);
        return `
        <div class="size-card" data-size="${size}">
          <img src="assets/sizes/${size}.jpg" alt="${size}">
          <p class="size-title">${size.toUpperCase()}</p>
          <p class="size-dimensions">${dimensions}</p>
        </div>
      `;
      }
    )
    .join("");

  document.querySelectorAll(".size-card").forEach((card) => {
    card.addEventListener("click", () => {
      const size = card.getAttribute("data-size");
      showItems(location, furniture, size);
    });
  });
}

function getSizeDescription(furniture) {
  const descriptions = {
    table: "<strong>Small:</strong> Suitable for 2-3 people<br><strong>Medium:</strong> Suitable for 4-6 people<br><strong>Large:</strong> Suitable for 6-8 people",
    chair: "<strong>Small:</strong> Compact size for tight spaces<br><strong>Medium:</strong> Standard size for most users<br><strong>Large:</strong> Spacious with backrest for comfort",
    bed: "<strong>Small:</strong> Single bed (90x190 cm)<br><strong>Medium:</strong> Double bed (140x190 cm)<br><strong>Large:</strong> King size bed (180x200 cm)",
    wardrobe: "<strong>Small:</strong> Basic storage with 4 shelves<br><strong>Medium:</strong> Added drawer storage<br><strong>Large:</strong> Full closet with drawers and hanging space",
    dining_table: "<strong>Small:</strong> Seats 4 people<br><strong>Medium:</strong> Seats 6 people<br><strong>Large:</strong> Seats 8 people",
    cabinet: "<strong>Small:</strong> Basic storage with 3 shelves<br><strong>Medium:</strong> 4 shelves with larger capacity<br><strong>Large:</strong> 6 shelves with maximum storage",
    coffee_table: "<strong>Small:</strong> Compact for small living rooms<br><strong>Medium:</strong> Standard size<br><strong>Large:</strong> Spacious for large living areas",
    sofa: "<strong>Small:</strong> 2-seater sofa<br><strong>Medium:</strong> 3-seater sofa<br><strong>Large:</strong> 4-seater sofa or sectional",
    bar_stool: "<strong>Small:</strong> Basic stool design<br><strong>Medium:</strong> Added comfort features<br><strong>Large:</strong> Premium design with backrest",
    reception_desk: "<strong>Small:</strong> Suitable for 1 person<br><strong>Medium:</strong> Space for 2 people<br><strong>Large:</strong> Full reception area setup",
    file_cabinet: "<strong>Small:</strong> 2-drawer cabinet (40x70x50 cm)<br><strong>Medium:</strong> 3-drawer cabinet (45x100x55 cm)<br><strong>Large:</strong> 4-drawer cabinet (50x130x60 cm)",
    shoe_rack: "<strong>Small:</strong> 2-tier rack (60x45x30 cm)<br><strong>Medium:</strong> 3-tier rack (80x70x30 cm)<br><strong>Large:</strong> 4-tier rack (100x90x30 cm)",
    side_drawer: "<strong>Small:</strong> 2-drawer unit (40x60x45 cm)<br><strong>Medium:</strong> 3-drawer unit (45x65x50 cm)<br><strong>Large:</strong> 4-drawer unit (50x70x55 cm)",
    bookshelf: "<strong>Small:</strong> 3-shelf unit (60x120x30 cm)<br><strong>Medium:</strong> 4-shelf unit (80x160x35 cm)<br><strong>Large:</strong> 5-shelf unit (100x200x40 cm)"
  };
  
  return descriptions[furniture] || "Select the size that best fits your space requirements:";
}

function getSizeDimensions(location, furniture, size) {
  // Get the first item that has dimensions (usually the main piece)
  const items = furnitureData[location][furniture][size].items;
  const mainItem = items.find(item => item.size.includes("x"));
  
  if (mainItem) {
    return mainItem.size;
  }
  
  return "";
}

function showItems(location, furniture, size) {
  sizeSection.classList.add("hidden");
  itemsSection.classList.remove("hidden");
  currentSize = size;

  // Format furniture and size for display
  const formattedFurniture = furniture.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  document.querySelector("#items-section h2").textContent = `Materials Required for ${size.toUpperCase()} ${formattedFurniture}`;

  // Display material information
  const materialInfo = document.querySelector(".material-info");
  materialInfo.innerHTML = `
    <h3>Material Requirements for ${size.toUpperCase()} ${formattedFurniture}</h3>
    <p>Below is a detailed list of all materials needed for your selected furniture. Click on any item to add it to your selection.</p>
    <div class="material-summary">
      <p><strong>Wood Types:</strong> ${getWoodTypes(location, furniture, size).join(", ")}</p>
      <p><strong>Hardware:</strong> ${getHardwareTypes(location, furniture, size).join(", ")}</p>
      <p><strong>Finishing Materials:</strong> ${getFinishingMaterials(location, furniture, size).join(", ")}</p>
    </div>
  `;

  const items = furnitureData[location][furniture][size].items;
  const itemsGrid = document.querySelector(".items-grid");
  itemsGrid.innerHTML = items
    .map(
      (item) => `
      <div class="item-card" data-item='${JSON.stringify(item)}'>
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p><strong>Material:</strong> ${item.wood !== "-" ? item.wood : "Hardware"}</p>
        <p><strong>Size:</strong> ${item.size}</p>
        <p><strong>Quantity:</strong> ${item.pieces}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <select class="item-option">
          <option value="Standard">Standard Quality</option>
          <option value="Premium">Premium Quality</option>
          <option value="Economy">Economy Option</option>
        </select>
        <button class="add-to-selection">Add to Selection</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".add-to-selection").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".item-card");
      const item = JSON.parse(card.getAttribute("data-item"));
      const selectedOption = card.querySelector(".item-option").value;
      item.option = selectedOption;
      item.location = location;
      item.furniture = furniture;
      item.furnitureSize = size;
      selectedItems.push(item);
      showSelectedItems();
      
      // Visual feedback
      button.textContent = "Added!";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = "Add to Selection";
        button.disabled = false;
      }, 2000);
    });
  });
}

function getWoodTypes(location, furniture, size) {
  const items = furnitureData[location][furniture][size].items;
  const woodTypes = new Set();
  
  items.forEach(item => {
    if (item.wood !== "-") {
      woodTypes.add(item.wood);
    }
  });
  
  return Array.from(woodTypes);
}

function getHardwareTypes(location, furniture, size) {
  const items = furnitureData[location][furniture][size].items;
  const hardwareTypes = [];
  
  items.forEach(item => {
    if (item.wood === "-" && 
        ["Wood Screws", "Hinges", "Door Handles", "Drawer Slides", "Corner Brackets", "Clothes Rail"].includes(item.name)) {
      hardwareTypes.push(item.name);
    }
  });
  
  return hardwareTypes;
}

function getFinishingMaterials(location, furniture, size) {
  const items = furnitureData[location][furniture][size].items;
  const finishingMaterials = [];
  
  items.forEach(item => {
    if (["Sandpaper", "Wood Glue", "Finishing Oil", "Chair Felt Pads", "Table Felt Pads"].includes(item.name)) {
      finishingMaterials.push(item.name);
    }
  });
  
  return finishingMaterials;
}

function showSelectedItems() {
  selectedItemsSection.classList.remove("hidden");
  selectedItemsGrid.innerHTML = selectedItems
    .map(
      (item, index) => `
      <div class="selected-item-card">
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p><strong>For:</strong> ${item.furniture ? (item.furniture.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()) + " (" + item.furnitureSize.toUpperCase() + ")") : ""}</p>
        <p><strong>Quality:</strong> ${item.option}</p>
        <p><strong>Material:</strong> ${item.wood}</p>
        <p><strong>Size:</strong> ${item.size}</p>
        <p><strong>Quantity:</strong> ${item.pieces}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `
    )
    .join("");

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      selectedItems.splice(index, 1);
      showSelectedItems();
    });
  });
}

// Event listener for "Calculate Wood Sheets" button
document.getElementById("calculate-wood").addEventListener("click", () => {
  if (selectedItems.length === 0) {
    alert("Please select at least one item first.");
    return;
  }
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  window.location.href = "wood-sheets.html";
});

// Event listener for "Generate Quotation" button
document.getElementById("generate-quotation").addEventListener("click", () => {
  if (selectedItems.length === 0) {
    alert("Please select at least one item first.");
    return;
  }
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  window.location.href = "quotation.html";
});

// Event listener for "View in 3D" button
document.getElementById("view-3d-model").addEventListener("click", () => {
  if (selectedItems.length === 0) {
    alert("Please select at least one item first.");
    return;
  }
  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  window.location.href = "3d-viewer.html";
});

// Event listener for "Back to Locations" button
document.getElementById("back-to-locations").addEventListener("click", () => {
  // Reset the view to show locations
  locationSection.classList.remove("hidden");
  furnitureSection.classList.add("hidden");
  sizeSection.classList.add("hidden");
  itemsSection.classList.add("hidden");
  
  // Clear current selections if desired
  // selectedItems = [];
  // selectedItemsSection.classList.add("hidden");
});

// Function to calculate total cost of selected items
function calculateTotalCost() {
  return selectedItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return total + (price * item.pieces);
  }, 0);
}