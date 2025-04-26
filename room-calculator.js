// Room Calculator for FurniCraft Pro
// Provides room size suggestions and material calculations

// Room size recommendation system
const roomSizeRecommendations = {
  // Recommended furniture based on room dimensions (in square meters)
  kitchen: {
    small: { // 5-10 sq meters
      maxItems: 4,
      recommended: ['kitchen_hood_with_cupboard.small', 'cupboard.small', 'cooker.small', 'dining_table.small'],
      notRecommended: ['dining_table.large', 'kitchen_hood_with_cupboard.large', 'cupboard.large']
    },
    medium: { // 10-15 sq meters
      maxItems: 6,
      recommended: ['kitchen_hood_with_cupboard.medium', 'cupboard.medium', 'cooker.medium', 'dining_table.medium', 'washbasin.small'],
      notRecommended: ['dining_table.large']
    },
    large: { // 15+ sq meters
      maxItems: 8,
      recommended: ['kitchen_hood_with_cupboard.large', 'cupboard.large', 'cooker.large', 'dining_table.large', 'washbasin.medium'],
      notRecommended: []
    }
  },
  living_room: {
    small: { // 10-15 sq meters
      maxItems: 4,
      recommended: ['sofa.small', 'coffee_table.small', 'cabinet.small'],
      notRecommended: ['sofa.large', 'coffee_table.large', 'cabinet.large']
    },
    medium: { // 15-25 sq meters
      maxItems: 6,
      recommended: ['sofa.medium', 'coffee_table.medium', 'cabinet.medium'],
      notRecommended: []
    },
    large: { // 25+ sq meters
      maxItems: 8,
      recommended: ['sofa.large', 'coffee_table.large', 'cabinet.large'],
      notRecommended: []
    }
  },
  bedroom: {
    small: { // 8-12 sq meters
      maxItems: 3,
      recommended: ['bed.small', 'wardrobe.small'],
      notRecommended: ['bed.large', 'wardrobe.large']
    },
    medium: { // 12-18 sq meters
      maxItems: 5,
      recommended: ['bed.medium', 'wardrobe.medium', 'cabinet.small'],
      notRecommended: ['bed.large']
    },
    large: { // 18+ sq meters
      maxItems: 7,
      recommended: ['bed.large', 'wardrobe.large', 'cabinet.medium'],
      notRecommended: []
    }
  },
  office: {
    small: { // 6-10 sq meters
      maxItems: 3,
      recommended: ['table.small', 'chair.small'],
      notRecommended: ['table.large', 'chair.large']
    },
    medium: { // 10-15 sq meters
      maxItems: 5,
      recommended: ['table.medium', 'chair.medium', 'cabinet.small'],
      notRecommended: ['table.large']
    },
    large: { // 15+ sq meters
      maxItems: 7,
      recommended: ['table.large', 'chair.large', 'cabinet.medium'],
      notRecommended: []
    }
  },
  restaurant: {
    small: { // 30-50 sq meters
      maxItems: 10,
      recommended: ['dining_table.small', 'chair.small', 'bar_stool.small'],
      notRecommended: ['reception_desk.large']
    },
    medium: { // 50-100 sq meters
      maxItems: 20,
      recommended: ['dining_table.medium', 'chair.medium', 'bar_stool.medium', 'reception_desk.small'],
      notRecommended: []
    },
    large: { // 100+ sq meters
      maxItems: 30,
      recommended: ['dining_table.large', 'chair.large', 'bar_stool.large', 'reception_desk.large'],
      notRecommended: []
    }
  },
  lobby: {
    small: { // 20-40 sq meters
      maxItems: 8,
      recommended: ['sofa.small', 'coffee_table.small', 'reception_desk.small'],
      notRecommended: ['reception_desk.large', 'sofa.large']
    },
    medium: { // 40-80 sq meters
      maxItems: 15,
      recommended: ['sofa.medium', 'coffee_table.medium', 'reception_desk.medium'],
      notRecommended: []
    },
    large: { // 80+ sq meters
      maxItems: 25,
      recommended: ['sofa.large', 'coffee_table.large', 'reception_desk.large'],
      notRecommended: []
    }
  }
};

// Get room size category based on area
function getRoomSizeCategory(roomType, area) {
  if (!roomType) return null;
  
  const sizeRanges = {
    kitchen: { small: 10, medium: 15 }, // small: <10, medium: 10-15, large: >15
    living_room: { small: 15, medium: 25 },
    bedroom: { small: 12, medium: 18 },
    office: { small: 10, medium: 15 },
    restaurant: { small: 50, medium: 100 },
    lobby: { small: 40, medium: 80 }
  };
  
  const ranges = sizeRanges[roomType] || { small: 10, medium: 20 };
  
  if (area < ranges.small) return 'small';
  if (area < ranges.medium) return 'medium';
  return 'large';
}

// Get furniture recommendations based on room type and dimensions
function getFurnitureRecommendations(roomType, length, width) {
  const area = length * width;
  const sizeCategory = getRoomSizeCategory(roomType, area);
  
  if (!roomType || !sizeCategory || !roomSizeRecommendations[roomType] || !roomSizeRecommendations[roomType][sizeCategory]) {
    return {
      roomSize: sizeCategory,
      area: area,
      maxItems: 5,
      recommended: [],
      notRecommended: []
    };
  }
  
  return {
    roomSize: sizeCategory,
    area: area,
    maxItems: roomSizeRecommendations[roomType][sizeCategory].maxItems,
    recommended: roomSizeRecommendations[roomType][sizeCategory].recommended,
    notRecommended: roomSizeRecommendations[roomType][sizeCategory].notRecommended
  };
}

// Calculate ceiling materials needed based on dimensions
function calculateCeilingMaterials(length, width) {
  const area = length * width;
  const plywoodSheetSize = 2.44 * 1.22; // Standard plywood sheet size in meters (8ft x 4ft)
  const plywoodSheetArea = plywoodSheetSize;
  
  // Calculate number of plywood sheets needed with 10% waste factor
  const plywoodSheetsNeeded = Math.ceil((area * 1.1) / plywoodSheetArea);
  
  // Calculate other materials based on area
  const nailsPerSqMeter = 15; // Approx. number of nails per square meter
  const screwsPerSqMeter = 10; // Approx. number of screws per square meter
  const jointsPerSqMeter = 0.5; // Approx. number of joints per square meter
  
  const totalNails = Math.ceil(area * nailsPerSqMeter);
  const totalScrews = Math.ceil(area * screwsPerSqMeter);
  const totalJoints = Math.ceil(area * jointsPerSqMeter);
  
  // Calculate paint or finish needed (1 liter covers about 10 sq meters)
  const paintNeeded = Math.ceil(area / 10);
  
  return {
    area: area.toFixed(2),
    plywoodSheets: plywoodSheetsNeeded,
    nails: totalNails,
    screws: totalScrews,
    joints: totalJoints,
    paint: paintNeeded
  };
}

// Display room recommendations in the UI
function displayRoomRecommendations(roomType, length, width) {
  const recommendations = getFurnitureRecommendations(roomType, length, width);
  const recommendationsDiv = document.getElementById('roomRecommendations');
  
  if (!recommendationsDiv) return;
  
  let html = `
    <h3>Room Size Analysis</h3>
    <p>Room Type: <strong>${roomType.replace('_', ' ')}</strong></p>
    <p>Dimensions: <strong>${length}m × ${width}m = ${recommendations.area.toFixed(2)} sq meters</strong></p>
    <p>Size Category: <strong>${recommendations.roomSize}</strong></p>
    <p>Recommended maximum number of furniture items: <strong>${recommendations.maxItems}</strong></p>
  `;
  
  if (recommendations.recommended.length > 0) {
    html += '<h4>Recommended Furniture:</h4><ul>';
    recommendations.recommended.forEach(item => {
      const [type, size] = item.split('.');
      html += `<li><strong>${type.replace('_', ' ')}</strong> (${size} size) <button class="view-3d-btn" data-furniture="${item}">View in 3D</button></li>`;
    });
    html += '</ul>';
  }
  
  if (recommendations.notRecommended.length > 0) {
    html += '<h4>Not Recommended (too large for this space):</h4><ul>';
    recommendations.notRecommended.forEach(item => {
      const [type, size] = item.split('.');
      html += `<li><strong>${type.replace('_', ' ')}</strong> (${size} size)</li>`;
    });
    html += '</ul>';
  }
  
  html += `<button id="view-all-3d" class="button">View All Recommended Furniture in 3D</button>`;
  
  recommendationsDiv.innerHTML = html;
  recommendationsDiv.style.display = 'block';
  
  // Add event listeners for 3D view buttons
  document.querySelectorAll('.view-3d-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const furnitureItem = this.getAttribute('data-furniture');
      const [type, size] = furnitureItem.split('.');
      initializeViewer();
      loadSingleFurnitureModel(type, size);
    });
  });
  
  // Add event listener for view all button
  document.getElementById('view-all-3d').addEventListener('click', function() {
    initializeViewer();
    loadAllRecommendedFurniture(recommendations.recommended);
  });
}

// Display ceiling materials calculation in the UI
function displayCeilingMaterials(length, width) {
  const materials = calculateCeilingMaterials(length, width);
  const materialsDiv = document.getElementById('ceilingMaterials');
  
  if (!materialsDiv) return;
  
  let html = `
    <h3>Ceiling Materials Required</h3>
    <p>Ceiling Area: <strong>${materials.area} sq meters</strong></p>
    <div class="materials-container">
  `;
  
  // Material cards with images
  const materialItems = [
    {
      name: 'Plywood Sheets',
      quantity: materials.plywoodSheets,
      unit: 'sheets',
      description: '2.44m × 1.22m standard size',
      image: 'assets/materials/wood-sheet.jpg',
      placeholder: '#E1C699'
    },
    {
      name: 'Nails',
      quantity: materials.nails,
      unit: 'pcs',
      description: 'For securing plywood sheets',
      image: 'assets/materials/nails.jpg',
      placeholder: '#B7B7B7'
    },
    {
      name: 'Screws',
      quantity: materials.screws,
      unit: 'pcs',
      description: 'For framework assembly',
      image: 'assets/materials/screws.jpg',
      placeholder: '#8C8C8C'
    },
    {
      name: 'Ceiling Joints',
      quantity: materials.joints,
      unit: 'pcs',
      description: 'For connecting framework',
      image: 'assets/materials/joints.jpg',
      placeholder: '#ADADAD'
    },
    {
      name: 'Paint/Finish',
      quantity: materials.paint,
      unit: 'liters',
      description: 'For final ceiling finish',
      image: 'assets/materials/wood-finish.jpg',
      placeholder: '#D4B483'
    }
  ];
  
  materialItems.forEach(item => {
    html += `
      <div class="material-card">
        <div class="material-image" style="background-color: ${item.placeholder};"></div>
        <div class="material-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        </div>
        <div class="material-quantity">
          ${item.quantity} ${item.unit}
        </div>
      </div>
    `;
  });
  
  html += `
    </div>
    <p><em>Note: Includes 10% extra material for waste</em></p>
    <button id="shop-materials" class="button secondary-button">Shop for These Materials</button>
  `;
  
  materialsDiv.innerHTML = html;
  materialsDiv.style.display = 'block';
  
  // Add event listener for shop button
  document.getElementById('shop-materials').addEventListener('click', function() {
    window.location.href = 'shop.html';
  });
}

// Initialize the room calculator functionality
function initRoomCalculator() {
  const calculatorForm = document.getElementById('roomCalculatorForm');
  
  if (!calculatorForm) return;
  
  calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const roomType = document.getElementById('roomType').value;
    const roomLength = parseFloat(document.getElementById('roomLength').value);
    const roomWidth = parseFloat(document.getElementById('roomWidth').value);
    const ceilingHeight = parseFloat(document.getElementById('ceilingHeight').value || 0);
    
    if (roomType && roomLength && roomWidth) {
      displayRoomRecommendations(roomType, roomLength, roomWidth);
    }
    
    if (roomLength && roomWidth && document.getElementById('calculateCeiling').checked) {
      displayCeilingMaterials(roomLength, roomWidth);
    } else {
      document.getElementById('ceilingMaterials').style.display = 'none';
    }
    
    // Hide 3D viewer when recalculating
    document.getElementById('3d-view-container').style.display = 'none';
  });
  
  // Initialize event listeners for 3D viewer controls if they exist
  const toggleWireframeBtn = document.getElementById('toggle-wireframe');
  const toggleMeasurementsBtn = document.getElementById('toggle-measurements');
  const resetCameraBtn = document.getElementById('reset-camera');
  
  if (toggleWireframeBtn) {
    toggleWireframeBtn.addEventListener('click', toggleWireframe);
  }
  
  if (toggleMeasurementsBtn) {
    toggleMeasurementsBtn.addEventListener('click', toggleMeasurements);
  }
  
  if (resetCameraBtn) {
    resetCameraBtn.addEventListener('click', function() {
      if (roomCamera && roomControls) {
        // Reset camera position
        roomCamera.position.set(0, 4, 6);
        roomControls.target.set(0, 0, 0);
        roomControls.update();
      }
    });
  }
  
  // Add CSS for material cards
  const style = document.createElement('style');
  style.textContent = `
    .materials-container {
      margin: 20px 0;
    }
    
    .material-card {
      display: flex;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin-bottom: 15px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .material-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .material-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      background-color: #f5f5f5;
    }
    
    .material-info {
      padding: 10px 15px;
      flex-grow: 1;
    }
    
    .material-info h4 {
      margin: 0 0 5px 0;
      color: #333;
    }
    
    .material-info p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    
    .material-quantity {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;
      font-weight: bold;
      color: #2980b9;
      background-color: #f8f9fa;
      min-width: 80px;
    }
  `;
  document.head.appendChild(style);
}

// 3D Viewer for Room Calculator
let roomScene, roomCamera, roomRenderer, roomControls;
let roomFurnitureModels = [];
let roomWireframeMode = false;
let roomMeasurementsVisible = false;
let roomMeasurementObjects = [];

// Initialize the 3D viewer
function initializeViewer() {
  try {
    const viewerContainer = document.getElementById('3d-view-container');
    if (viewerContainer) viewerContainer.style.display = 'block';
    
    // Check if viewer is already initialized
    if (roomScene) {
      // Clear existing models
      if (roomFurnitureModels && roomFurnitureModels.length > 0) {
        roomFurnitureModels.forEach(model => {
          if (model && roomScene) roomScene.remove(model);
        });
      }
      
      // Remove existing room floor
      const existingFloor = roomScene.getObjectByName('roomFloor');
      if (existingFloor) roomScene.remove(existingFloor);
      
      roomFurnitureModels = [];
      return;
    }
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'block';
  } catch (error) {
    console.error('Error in initializeViewer:', error);
  }
  
  // Create scene with better lighting
  roomScene = new THREE.Scene();
  roomScene.background = new THREE.Color(0xf0f0f0);
  
  // Add ambient occlusion for better shadows
  if (typeof THREE.AmbientLight !== 'undefined') {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    roomScene.add(ambientLight);
  }
  
  // Create camera
  const canvasContainer = document.querySelector('.canvas-container');
  const aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  roomCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  roomCamera.position.set(0, 1.5, 3);
  
  // Create renderer
  roomRenderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('3d-viewer'),
    antialias: true 
  });
  roomRenderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  roomRenderer.shadowMap.enabled = true;
  
  // Add orbit controls
  roomControls = new THREE.OrbitControls(roomCamera, roomRenderer.domElement);
  roomControls.enableDamping = true;
  roomControls.dampingFactor = 0.25;
  
  // Add lights with better shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  
  // Improve shadow quality
  if (directionalLight.shadow) {
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.0001;
  }
  
  roomScene.add(directionalLight);
  
  // Add hemisphere light for better ambient lighting
  const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0.5);
  roomScene.add(hemisphereLight);
  
  // Add floor
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc,
    roughness: 0.8,
    metalness: 0.2
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.5;
  floor.receiveShadow = true;
  roomScene.add(floor);
  
  // Add grid helper
  const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
  gridHelper.position.y = -0.49;
  roomScene.add(gridHelper);
  
  // Start animation loop
  animateRoom();
  
  // Handle window resize
  window.addEventListener('resize', onRoomWindowResize);
}

// Animation loop
function animateRoom() {
  try {
    if (!roomRenderer || !roomScene || !roomCamera) return;
    
    requestAnimationFrame(animateRoom);
    if (roomControls) roomControls.update();
    roomRenderer.render(roomScene, roomCamera);
  } catch (error) {
    console.error('Error in animation loop:', error);
  }
}

// Handle window resize
function onRoomWindowResize() {
  if (!roomCamera || !roomRenderer) return;
  
  const canvasContainer = document.querySelector('.canvas-container');
  roomCamera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  roomCamera.updateProjectionMatrix();
  roomRenderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

// Center camera on model
function roomCenterCameraOnModel(model) {
  if (!model || !roomCamera || !roomControls) return;
  
  try {
    // Get the bounding box of the model
    const boundingBox = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    
    // Set the controls target to the center of the model
    roomControls.target.copy(center);
    
    // Calculate the size of the bounding box
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    
    // Calculate the distance based on the size of the model
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = roomCamera.fov * (Math.PI / 180);
    let distance = (maxDim / 2) / Math.tan(fov / 2);
    
    // Add a bit of padding
    distance *= 1.5;
    
    // Calculate the camera position
    const direction = new THREE.Vector3();
    roomCamera.getWorldDirection(direction);
    direction.multiplyScalar(-distance);
    
    // Set camera position
    roomCamera.position.copy(center).add(direction);
    roomCamera.lookAt(center);
    
    // Update controls
    roomControls.update();
  } catch (error) {
    console.error('Error in roomCenterCameraOnModel:', error);
  }
}

// Load a single furniture model
function loadSingleFurnitureModel(furnitureType, size) {
  try {
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'block';
    
    // Clear existing models
    if (roomFurnitureModels && roomFurnitureModels.length > 0) {
      roomFurnitureModels.forEach(model => {
        if (model && roomScene) roomScene.remove(model);
      });
    }
    roomFurnitureModels = [];
    
    // Create new model
    const model = createBasicFurnitureModel(furnitureType, size);
    if (model && roomScene) {
      model.position.set(0, 0, 0);
      roomScene.add(model);
      roomFurnitureModels.push(model);
      
      // Center camera on model
      roomCenterCameraOnModel(model);
    }
    
    // Hide loading indicator
    if (loadingElement) loadingElement.style.display = 'none';
  } catch (error) {
    console.error('Error in loadSingleFurnitureModel:', error);
    // Hide loading indicator in case of error
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
  }
}

// Load all recommended furniture models
function loadAllRecommendedFurniture(recommendedItems) {
  try {
    // Clear existing models
    if (roomFurnitureModels && roomFurnitureModels.length > 0) {
      roomFurnitureModels.forEach(model => {
        if (model && roomScene) roomScene.remove(model);
      });
    }
    roomFurnitureModels = [];
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'block';
    
    // Create a room floor
    createRoomFloor();
    
    // Position offset for each furniture item
    let xOffset = -1.5;
    const zOffset = -1.5;
    const spacing = 1.5;
    
    // Limit the number of items to prevent performance issues
    const itemsToShow = recommendedItems.slice(0, 9); // Show max 9 items
    
    // Create models for each recommended furniture
    itemsToShow.forEach((item, index) => {
      try {
        const [type, size] = item.split('.');
        const model = createBasicFurnitureModel(type, size);
        
        if (model) {
          // Add a name label to the model
          addLabelToModel(model, type.replace('_', ' '));
          
          // Scale down models to fit better in the view
          model.scale.set(0.7, 0.7, 0.7);
          
          // Position furniture in a grid layout
          const row = Math.floor(index / 3);
          const col = index % 3;
          model.position.set(xOffset + col * spacing, 0, zOffset + row * spacing);
          
          if (roomScene) roomScene.add(model);
          roomFurnitureModels.push(model);
        }
      } catch (modelError) {
        console.error('Error creating model:', modelError);
      }
    });
    
    // Adjust camera to view all models
    if (roomCamera) {
      roomCamera.position.set(0, 4, 6);
      roomCamera.lookAt(0, 0, 0);
    }
    
    if (roomControls) {
      roomControls.target.set(0, 0, 0);
      roomControls.update();
    }
    
    // Add ambient occlusion for better shadows
    if (roomRenderer) {
      roomRenderer.shadowMap.enabled = true;
      roomRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    // Hide loading indicator
    if (loadingElement) loadingElement.style.display = 'none';
  } catch (error) {
    console.error('Error in loadAllRecommendedFurniture:', error);
    // Hide loading indicator in case of error
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
  }
}

// Create a room floor with walls
function createRoomFloor() {
  if (!roomScene) return;
  
  // Remove existing floor if any
  const existingFloor = roomScene.getObjectByName('roomFloor');
  if (existingFloor) roomScene.remove(existingFloor);
  
  // Create a group for the room
  const roomGroup = new THREE.Group();
  roomGroup.name = 'roomFloor';
  
  // Create floor with texture
  const floorSize = 10;
  const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, 10, 10);
  
  // Create a checkered texture for the floor
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  
  // Draw checkered pattern
  const tileSize = 64;
  for (let x = 0; x < canvas.width; x += tileSize) {
    for (let y = 0; y < canvas.height; y += tileSize) {
      const isEven = ((x / tileSize) + (y / tileSize)) % 2 === 0;
      context.fillStyle = isEven ? '#f0f0f0' : '#e0e0e0';
      context.fillRect(x, y, tileSize, tileSize);
    }
  }
  
  // Create texture from canvas
  const floorTexture = new THREE.CanvasTexture(canvas);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(2, 2);
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    map: floorTexture,
    roughness: 0.8,
    metalness: 0.2
  });
  
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.01;
  floor.receiveShadow = true;
  roomGroup.add(floor);
  
  // Create grid lines on floor
  const gridHelper = new THREE.GridHelper(floorSize, 20, 0x999999, 0xcccccc);
  gridHelper.position.y = 0.01;
  roomGroup.add(gridHelper);
  
  // Add subtle walls for better orientation
  const wallHeight = 2;
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, wallHeight / 2, -floorSize / 2);
  backWall.receiveShadow = true;
  roomGroup.add(backWall);
  
  // Right wall
  const rightWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight);
  const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
  rightWall.position.set(floorSize / 2, wallHeight / 2, 0);
  rightWall.rotation.y = Math.PI / 2;
  rightWall.receiveShadow = true;
  roomGroup.add(rightWall);
  
  // Add room to scene
  roomScene.add(roomGroup);
}

// Add a label to a model
function addLabelToModel(model, labelText) {
  if (!model) return;
  
  try {
    // Create a canvas for the label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    // Draw background
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(labelText, canvas.width / 2, canvas.height / 2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create sprite material
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true
    });
    
    // Create sprite
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 0.25, 1);
    
    // Get model dimensions
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // Position sprite above model
    sprite.position.set(0, size.y + 0.3, 0);
    
    // Add sprite to model
    model.add(sprite);
  } catch (error) {
    console.error('Error adding label to model:', error);
  }
}

// Export functions for use in other scripts
window.RoomCalculator = {
  getFurnitureRecommendations,
  calculateCeilingMaterials,
  displayRoomRecommendations,
  displayCeilingMaterials,
  initRoomCalculator,
  initializeViewer,
  loadSingleFurnitureModel,
  loadAllRecommendedFurniture
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initRoomCalculator);
