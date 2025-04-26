// Main variables
let scene, camera, renderer, controls;
let furniture3DModel = null;
let wireframeMode = false;
let measurementsVisible = false;
let measurementObjects = [];
let selectedFurniture = null;
let selectedSize = null;
let maldivianThemeEnabled = false; // Flag for Maldivian theme

// Initialize the scene when the page loads
document.addEventListener('DOMContentLoaded', () => {
  init();
  loadFurnitureFromStorage();
  
  // Event listeners for buttons
  document.getElementById('back-to-selection')?.addEventListener('click', () => {
    window.location.href = 'selection.html';
  });
  
  document.getElementById('toggle-wireframe')?.addEventListener('click', toggleWireframe);
  document.getElementById('toggle-measurements')?.addEventListener('click', toggleMeasurements);
  document.getElementById('reset-camera')?.addEventListener('click', resetCamera);
  
  // Add Maldivian Theme toggle button
  const themeButton = document.createElement('button');
  themeButton.id = 'toggle-maldivian-theme';
  themeButton.className = 'control-button';
  themeButton.innerHTML = '<i class="fas fa-palette"></i> Maldivian Theme';
  themeButton.addEventListener('click', toggleMaldivianTheme);
  document.querySelector('.controls').appendChild(themeButton);
});

// Initialize the Three.js scene
function init() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // Create camera with better perspective
  camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(2, 2, 4); // Better initial position
  
  // Create renderer with improved quality
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('3d-viewer'),
    antialias: true,
    precision: 'highp'
  });
  renderer.setSize(document.querySelector('.canvas-container').clientWidth, 
                   document.querySelector('.canvas-container').clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
  renderer.outputEncoding = THREE.sRGBEncoding; // Better color rendering
  renderer.physicallyCorrectLights = true; // More realistic lighting
  
  // Add orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  
  // Enhanced lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Main directional light (sun-like)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  
  // Improve shadow quality
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001;
  
  // Set shadow camera boundaries
  const shadowSize = 15;
  directionalLight.shadow.camera.left = -shadowSize;
  directionalLight.shadow.camera.right = shadowSize;
  directionalLight.shadow.camera.top = shadowSize;
  directionalLight.shadow.camera.bottom = -shadowSize;
  
  scene.add(directionalLight);
  
  // Add a helper to visualize the light (uncomment for debugging)
  // const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
  // scene.add(helper);
  
  // Add secondary fill light from opposite side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Add a subtle warm rim light for depth
  const rimLight = new THREE.DirectionalLight(0xfff0e0, 0.3);
  rimLight.position.set(0, 3, -10);
  scene.add(rimLight);
  
  // Create a checkered floor texture instead of grid helper
  const floorSize = 20;
  const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
  floorGeometry.rotateX(-Math.PI / 2); // Rotate to be horizontal
  
  // Create checkered texture
  const textureSize = 512;
  const canvas = document.createElement('canvas');
  canvas.width = textureSize;
  canvas.height = textureSize;
  const context = canvas.getContext('2d');
  
  // Draw checkered pattern
  const tileSize = textureSize / 10;
  context.fillStyle = '#f0f0f0';
  context.fillRect(0, 0, textureSize, textureSize);
  context.fillStyle = '#d0d0d0';
  
  for (let x = 0; x < textureSize; x += tileSize * 2) {
    for (let y = 0; y < textureSize; y += tileSize * 2) {
      context.fillRect(x, y, tileSize, tileSize);
      context.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
    }
  }
  
  const floorTexture = new THREE.CanvasTexture(canvas);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(2, 2);
  
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.8,
    metalness: 0.2,
    side: THREE.DoubleSide
  });
  
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.position.y = -0.01; // Slightly below origin to avoid z-fighting
  scene.add(floor);
  
  // Add subtle room walls for better spatial orientation
  const wallHeight = 3;
  const wallColor = 0xf5f5f5;
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: wallColor,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.z = -floorSize/2;
  backWall.position.y = wallHeight/2;
  backWall.receiveShadow = true;
  scene.add(backWall);
  
  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.x = -floorSize/2;
  leftWall.position.y = wallHeight/2;
  leftWall.rotation.y = Math.PI/2;
  leftWall.receiveShadow = true;
  scene.add(leftWall);
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  const container = document.querySelector('.canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Load furniture data from localStorage
function loadFurnitureFromStorage() {
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems') || '[]');
  if (selectedItems.length === 0) {
    const furnitureDetails = document.getElementById('furniture-details');
    if (furnitureDetails) {
      furnitureDetails.innerHTML = '<p>No furniture selected. Please go back to the selection page.</p>';
    }
    
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    return;
  }
  
  // Get the first item for now (can be enhanced to show multiple items)
  const item = selectedItems[0];
  selectedFurniture = item.furniture;
  selectedSize = item.furnitureSize;
  
  // Display furniture details
  displayFurnitureDetails(item);
  
  // Display materials list
  displayMaterialsList(selectedItems);
  
  // Load 3D model based on furniture type
  loadFurnitureModel(item.furniture, item.furnitureSize);
}

// Display furniture details
function displayFurnitureDetails(item) {
  const formattedFurniture = item.furniture.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  let html = `
    <h3>${formattedFurniture} (${item.furnitureSize.toUpperCase()})</h3>
    <p><strong>Main Material:</strong> ${item.wood !== '-' ? item.wood : 'Various'}</p>
    <p><strong>Dimensions:</strong> ${item.size}</p>
  `;
  
  document.getElementById('furniture-details').innerHTML = html;
}

// Display materials list
function displayMaterialsList(items) {
  const materialsList = document.getElementById('materials-list');
  materialsList.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    
    // Create color sample for wood types
    let colorSample = '';
    if (item.wood !== '-') {
      const woodColor = getWoodColor(item.wood);
      colorSample = `<span class="material-color-sample" style="background-color: ${woodColor};"></span>`;
    }
    
    li.innerHTML = `
      ${colorSample}
      <span class="material-name">${item.name}</span>
      <span class="material-quantity">${item.pieces} pcs</span>
    `;
    
    materialsList.appendChild(li);
  });
}

// Get wood color for visualization
function getWoodColor(woodType) {
  // Standard wood colors
  const standardWoodColors = {
    'Oak': '#b68c59',
    'Pine': '#d9b380',
    'Birch': '#f2d2a9',
    'Plywood': '#d7bc91',
    'Maple': '#c19a6b',
    'Walnut': '#5c4033',
    'Teak': '#b38b6d',
    'Mahogany': '#7d3a2a'
  };
  
  // Maldivian-inspired tropical wood colors
  const maldivianWoodColors = {
    'Oak': '#d4a76a',      // Lighter, sun-bleached oak
    'Pine': '#e6c292',     // Tropical pine
    'Birch': '#f7e0b6',    // Whitewashed birch
    'Plywood': '#e8d1a9',  // Tropical plywood
    'Maple': '#d4b284',    // Island maple
    'Walnut': '#7d5c4d',   // Tropical walnut
    'Teak': '#c9a67d',     // Maldivian teak (lighter)
    'Mahogany': '#9e5c45'  // Tropical mahogany
  };
  
  // Choose color set based on theme
  const woodColors = maldivianThemeEnabled ? maldivianWoodColors : standardWoodColors;
  
  return woodColors[woodType] || (maldivianThemeEnabled ? '#d4a76a' : '#b68c59');
}

// Load furniture 3D model
function loadFurnitureModel(furnitureType, size) {
  // Store selected furniture and size for theme switching
  selectedFurniture = furnitureType;
  selectedSize = size;
  
  // Remove previous model if exists
  if (furniture3DModel) {
    scene.remove(furniture3DModel);
    furniture3DModel = null;
  }
  
  // Create basic geometry based on furniture type and size
  createBasicFurnitureModel(furnitureType, size);
  
  // Hide loading indicator
  document.getElementById('loading').style.display = 'none';
}

// Create basic furniture model using primitives
function createBasicFurnitureModel(furnitureType, size) {
  const group = new THREE.Group();
  
  // Get dimensions based on furniture type and size
  const dimensions = getFurnitureDimensions(furnitureType, size);
  
  // Create model based on furniture type
  switch (furnitureType) {
    case 'table':
      createTableModel(group, dimensions);
      break;
    case 'chair':
      createChairModel(group, dimensions);
      break;
    case 'bed':
      createBedModel(group, dimensions);
      break;
    case 'wardrobe':
      createWardrobeModel(group, dimensions);
      break;
    case 'dining_table':
      createTableModel(group, dimensions);
      break;
    case 'cabinet':
      createCabinetModel(group, dimensions);
      break;
    case 'coffee_table':
      createCoffeeTableModel(group, dimensions);
      break;
    case 'sofa':
      createSofaModel(group, dimensions);
      break;
    case 'bar_stool':
      createBarStoolModel(group, dimensions);
      break;
    case 'reception_desk':
      createReceptionDeskModel(group, dimensions);
      break;
    case 'kitchen_hood_with_cupboard':
      createKitchenHoodWithCupboardModel(group, dimensions);
      break;
    case 'cupboard':
      createCupboardModel(group, dimensions);
      break;
    case 'washbasin':
      createWashbasinModel(group, dimensions);
      break;
    case 'cooker':
      createCookerModel(group, dimensions);
      break;
    case 'file_cabinet':
      createFileCabinetModel(group, dimensions);
      break;
    case 'shoe_rack':
      createShoeRackModel(group, dimensions);
      break;
    case 'side_drawer':
      createSideDrawerModel(group, dimensions);
      break;
    case 'bookshelf':
      createBookshelfModel(group, dimensions);
      break;
    default:
      createDefaultBox(group, dimensions);
  }
  
  // Add to scene
  scene.add(group);
  furniture3DModel = group;
  
  // Center camera on model
  centerCameraOnModel(group);
  
  // Add measurements
  addMeasurements(group, dimensions);
}

// Get furniture dimensions based on type and size
function getFurnitureDimensions(furnitureType, size) {
  // Realistic default dimensions based on furniture type and size (in meters)
  const realisticDimensions = {
    table: {
      small: { width: 1.2, depth: 0.6, height: 0.75 },
      medium: { width: 1.5, depth: 0.8, height: 0.75 },
      large: { width: 1.8, depth: 0.9, height: 0.75 }
    },
    chair: {
      small: { width: 0.4, depth: 0.4, height: 0.45 },
      medium: { width: 0.45, depth: 0.45, height: 0.45 },
      large: { width: 0.5, depth: 0.5, height: 0.45 }
    },
    bed: {
      small: { width: 0.9, depth: 1.9, height: 0.4 },     // Single bed
      medium: { width: 1.4, depth: 1.9, height: 0.4 },    // Double bed
      large: { width: 1.8, depth: 2.0, height: 0.4 }      // King size bed
    },
    wardrobe: {
      small: { width: 0.8, depth: 0.6, height: 1.8 },
      medium: { width: 1.2, depth: 0.6, height: 1.9 },
      large: { width: 1.6, depth: 0.6, height: 2.0 }
    },
    dining_table: {
      small: { width: 1.2, depth: 0.8, height: 0.75 },    // 4-person
      medium: { width: 1.6, depth: 0.9, height: 0.75 },    // 6-person
      large: { width: 2.0, depth: 1.0, height: 0.75 }      // 8-person
    },
    cabinet: {
      small: { width: 0.6, depth: 0.4, height: 0.9 },
      medium: { width: 0.8, depth: 0.4, height: 1.2 },
      large: { width: 1.0, depth: 0.5, height: 1.5 }
    },
    coffee_table: {
      small: { width: 0.8, depth: 0.5, height: 0.4 },
      medium: { width: 1.0, depth: 0.6, height: 0.4 },
      large: { width: 1.2, depth: 0.7, height: 0.4 }
    },
    sofa: {
      small: { width: 1.5, depth: 0.85, height: 0.85 },    // 2-seater
      medium: { width: 2.0, depth: 0.85, height: 0.85 },    // 3-seater
      large: { width: 2.5, depth: 0.9, height: 0.85 }      // 4-seater
    },
    bar_stool: {
      small: { width: 0.35, depth: 0.35, height: 0.75 },
      medium: { width: 0.4, depth: 0.4, height: 0.75 },
      large: { width: 0.45, depth: 0.45, height: 0.75 }
    },
    file_cabinet: {
      small: { width: 0.4, depth: 0.6, height: 1.0 },     // 2-drawer
      medium: { width: 0.45, depth: 0.6, height: 1.3 },    // 3-drawer
      large: { width: 0.5, depth: 0.6, height: 1.6 }      // 4-drawer
    },
    shoe_rack: {
      small: { width: 0.6, depth: 0.3, height: 0.9 },
      medium: { width: 0.8, depth: 0.3, height: 1.2 },
      large: { width: 1.0, depth: 0.3, height: 1.5 }
    },
    side_drawer: {
      small: { width: 0.4, depth: 0.4, height: 0.5 },
      medium: { width: 0.5, depth: 0.45, height: 0.6 },
      large: { width: 0.6, depth: 0.5, height: 0.7 }
    },
    bookshelf: {
      small: { width: 0.8, depth: 0.3, height: 1.5 },
      medium: { width: 1.0, depth: 0.35, height: 1.8 },
      large: { width: 1.2, depth: 0.4, height: 2.1 }
    },
    reception_desk: {
      small: { width: 1.4, depth: 0.6, height: 0.75 },
      medium: { width: 1.8, depth: 0.7, height: 0.75 },
      large: { width: 2.2, depth: 0.8, height: 0.75 }
    }
  };
  
  // Try to get dimensions from the realistic dimensions first
  if (realisticDimensions[furnitureType] && realisticDimensions[furnitureType][size]) {
    return realisticDimensions[furnitureType][size];
  }
  
  // If not found in realistic dimensions, try to get from database
  try {
    // Find the location by searching through all locations
    let foundLocation = null;
    for (const location in furnitureData) {
      if (furnitureData[location][furnitureType] && 
          furnitureData[location][furnitureType][size]) {
        foundLocation = location;
        break;
      }
    }
    
    if (foundLocation) {
      const items = furnitureData[foundLocation][furnitureType][size].items;
      const mainItem = items.find(item => item.size.includes('x'));
      
      if (mainItem) {
        const dimensions = mainItem.size.split('x').map(dim => parseFloat(dim));
        
        if (dimensions.length >= 3) {
          return {
            width: dimensions[0] / 100, // Convert cm to meters
            depth: dimensions[1] / 100,
            height: dimensions[2] / 100
          };
        }
      }
    }
  } catch (error) {
    console.log('Error getting dimensions from database:', error);
  }
  
  // Default dimensions if nothing else works
  const defaultDimensions = {
    width: 1,
    depth: 0.6,
    height: 0.75
  };
  
  return defaultDimensions;
}

// Create table model
function createTableModel(group, dimensions) {
  // Create tabletop with realistic thickness
  const topThickness = 0.03; // 3cm thickness for tabletop
  const tableTopGeometry = new THREE.BoxGeometry(dimensions.width, topThickness, dimensions.depth);
  const tableTopMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Birch') });
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  tableTop.position.y = dimensions.height; // Position at correct height
  group.add(tableTop);
  
  // Create legs with realistic proportions
  const legThickness = Math.min(0.05, dimensions.width * 0.04); // Scale leg thickness with table size
  const legHeight = dimensions.height;
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
  const legMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Oak') });
  
  // Position legs at corners with proper inset
  const legInset = legThickness * 1.5;
  const legPositions = [
    { x: dimensions.width / 2 - legInset, z: dimensions.depth / 2 - legInset },
    { x: -dimensions.width / 2 + legInset, z: dimensions.depth / 2 - legInset },
    { x: dimensions.width / 2 - legInset, z: -dimensions.depth / 2 + legInset },
    { x: -dimensions.width / 2 + legInset, z: -dimensions.depth / 2 + legInset }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, legHeight / 2, pos.z);
    group.add(leg);
  });
  
  // Add support structure for larger tables
  if (dimensions.width > 1.4) {
    const supportThickness = legThickness * 0.8;
    const supportWidth = dimensions.width - legInset * 4;
    const supportDepth = dimensions.depth - legInset * 4;
    
    // Cross supports
    const crossSupportGeometry = new THREE.BoxGeometry(supportWidth, supportThickness, supportThickness);
    const crossSupport = new THREE.Mesh(crossSupportGeometry, legMaterial);
    crossSupport.position.set(0, dimensions.height * 0.25, 0);
    group.add(crossSupport);
    
    const crossSupport2 = new THREE.Mesh(
      new THREE.BoxGeometry(supportThickness, supportThickness, supportDepth),
      legMaterial
    );
    crossSupport2.position.set(0, dimensions.height * 0.25, 0);
    group.add(crossSupport2);
  }
}

// Create chair model
function createChairModel(group, dimensions) {
  // Create seat with realistic thickness
  const seatThickness = 0.03; // 3cm thickness for seat
  const seatGeometry = new THREE.BoxGeometry(dimensions.width, seatThickness, dimensions.depth);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Pine') });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = dimensions.height; // Seat at proper height
  group.add(seat);
  
  // Create legs with proper thickness
  const legThickness = Math.min(0.03, dimensions.width * 0.06); // Scale with chair size
  const legHeight = dimensions.height;
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
  const legMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Pine') });
  
  // Position legs at corners with proper inset
  const legInset = legThickness * 1.2;
  const legPositions = [
    { x: dimensions.width / 2 - legInset, z: dimensions.depth / 2 - legInset },
    { x: -dimensions.width / 2 + legInset, z: dimensions.depth / 2 - legInset },
    { x: dimensions.width / 2 - legInset, z: -dimensions.depth / 2 + legInset },
    { x: -dimensions.width / 2 + legInset, z: -dimensions.depth / 2 + legInset }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, legHeight / 2, pos.z);
    group.add(leg);
  });
  
  // Add backrest for all chairs with different heights based on size
  const backrestHeight = selectedSize === 'small' ? 0.25 : 
                        selectedSize === 'medium' ? 0.35 : 0.45;
  const backrestThickness = 0.02;
  const backrestWidth = dimensions.width * 0.9;
  
  // Main backrest
  const backrestGeometry = new THREE.BoxGeometry(backrestWidth, backrestHeight, backrestThickness);
  const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
  backrest.position.set(0, dimensions.height + backrestHeight / 2 + seatThickness / 2, -dimensions.depth / 2 + backrestThickness / 2);
  group.add(backrest);
  
  // Add backrest supports
  const supportThickness = legThickness * 0.8;
  const supportHeight = backrestHeight * 0.8;
  const supportGeometry = new THREE.BoxGeometry(supportThickness, supportHeight, supportThickness);
  
  // Left support
  const leftSupport = new THREE.Mesh(supportGeometry, legMaterial);
  leftSupport.position.set(-backrestWidth / 2 + supportThickness, 
                          dimensions.height + supportHeight / 2 + seatThickness / 2, 
                          -dimensions.depth / 2 + supportThickness);
  group.add(leftSupport);
  
  // Right support
  const rightSupport = new THREE.Mesh(supportGeometry, legMaterial);
  rightSupport.position.set(backrestWidth / 2 - supportThickness, 
                           dimensions.height + supportHeight / 2 + seatThickness / 2, 
                           -dimensions.depth / 2 + supportThickness);
  group.add(rightSupport);
  
  // For large chairs, add armrests
  if (selectedSize === 'large') {
    const armrestHeight = 0.2;
    const armrestWidth = 0.05;
    const armrestLength = dimensions.depth * 0.7;
    const armrestGeometry = new THREE.BoxGeometry(armrestWidth, armrestHeight, armrestLength);
    
    // Left armrest
    const leftArmrest = new THREE.Mesh(armrestGeometry, seatMaterial);
    leftArmrest.position.set(-dimensions.width / 2 + armrestWidth / 2, 
                            dimensions.height + armrestHeight / 2 + seatThickness / 2, 
                            -dimensions.depth * 0.15);
    group.add(leftArmrest);
    
    // Right armrest
    const rightArmrest = new THREE.Mesh(armrestGeometry, seatMaterial);
    rightArmrest.position.set(dimensions.width / 2 - armrestWidth / 2, 
                             dimensions.height + armrestHeight / 2 + seatThickness / 2, 
                             -dimensions.depth * 0.15);
    group.add(rightArmrest);
    
    // Armrest supports
    const armSupportGeometry = new THREE.BoxGeometry(supportThickness, armrestHeight * 0.8, supportThickness);
    
    // Left armrest support
    const leftArmSupport = new THREE.Mesh(armSupportGeometry, legMaterial);
    leftArmSupport.position.set(-dimensions.width / 2 + armrestWidth / 2, 
                               dimensions.height + armrestHeight * 0.4 + seatThickness / 2, 
                               -dimensions.depth / 2 + supportThickness * 2);
    group.add(leftArmSupport);
    
    // Right armrest support
    const rightArmSupport = new THREE.Mesh(armSupportGeometry, legMaterial);
    rightArmSupport.position.set(dimensions.width / 2 - armrestWidth / 2, 
                                dimensions.height + armrestHeight * 0.4 + seatThickness / 2, 
                                -dimensions.depth / 2 + supportThickness * 2);
    group.add(rightArmSupport);
  }
}

// Create bed model
function createBedModel(group, dimensions) {
  // Create bed frame with realistic proportions
  const frameHeight = dimensions.height * 0.7; // Frame height (without mattress)
  const frameThickness = 0.04; // Side frame thickness
  const frameBorderWidth = 0.08; // Width of the frame border
  
  // Base frame (platform for mattress)
  const baseFrameGeometry = new THREE.BoxGeometry(dimensions.width, frameHeight, dimensions.depth);
  const frameMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Oak') });
  const baseFrame = new THREE.Mesh(baseFrameGeometry, frameMaterial);
  baseFrame.position.y = frameHeight / 2;
  group.add(baseFrame);
  
  // Frame borders (sides)
  // Front border
  const frontBorderGeometry = new THREE.BoxGeometry(dimensions.width, frameBorderWidth, frameThickness);
  const frontBorder = new THREE.Mesh(frontBorderGeometry, frameMaterial);
  frontBorder.position.set(0, frameHeight - frameBorderWidth / 2, dimensions.depth / 2 - frameThickness / 2);
  group.add(frontBorder);
  
  // Back border
  const backBorderGeometry = new THREE.BoxGeometry(dimensions.width, frameBorderWidth, frameThickness);
  const backBorder = new THREE.Mesh(backBorderGeometry, frameMaterial);
  backBorder.position.set(0, frameHeight - frameBorderWidth / 2, -dimensions.depth / 2 + frameThickness / 2);
  group.add(backBorder);
  
  // Left border
  const leftBorderGeometry = new THREE.BoxGeometry(frameThickness, frameBorderWidth, dimensions.depth);
  const leftBorder = new THREE.Mesh(leftBorderGeometry, frameMaterial);
  leftBorder.position.set(-dimensions.width / 2 + frameThickness / 2, frameHeight - frameBorderWidth / 2, 0);
  group.add(leftBorder);
  
  // Right border
  const rightBorderGeometry = new THREE.BoxGeometry(frameThickness, frameBorderWidth, dimensions.depth);
  const rightBorder = new THREE.Mesh(rightBorderGeometry, frameMaterial);
  rightBorder.position.set(dimensions.width / 2 - frameThickness / 2, frameHeight - frameBorderWidth / 2, 0);
  group.add(rightBorder);
  
  // Create mattress with realistic proportions
  const mattressHeight = dimensions.height * 0.3; // 30% of total height is mattress
  const mattressGeometry = new THREE.BoxGeometry(
    dimensions.width - frameBorderWidth * 2, 
    mattressHeight, 
    dimensions.depth - frameBorderWidth * 2
  );
  
  // Create mattress with a slightly rounded top using BufferGeometry
  const mattressRoundedGeometry = new THREE.BoxGeometry(
    dimensions.width - frameBorderWidth * 2, 
    mattressHeight, 
    dimensions.depth - frameBorderWidth * 2,
    1, 4, 1 // More segments for y-axis to allow rounding
  );
  
  // Round the top vertices of the mattress
  const positionAttribute = mattressRoundedGeometry.attributes.position;
  const roundingFactor = 0.02; // How much to round the top
  
  for (let i = 0; i < positionAttribute.count; i++) {
    const y = positionAttribute.getY(i);
    if (y > 0) { // Only round the top vertices
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      const distanceFromCenter = Math.sqrt(x * x + z * z) / (dimensions.width / 2);
      positionAttribute.setY(i, y - roundingFactor * distanceFromCenter);
    }
  }
  
  const mattressMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xf0f0f0,
    roughness: 0.7,
    metalness: 0.1
  });
  const mattress = new THREE.Mesh(mattressRoundedGeometry, mattressMaterial);
  mattress.position.y = frameHeight + mattressHeight / 2;
  group.add(mattress);
  
  // Create legs with proper proportions
  const legThickness = Math.min(0.05, dimensions.width * 0.03);
  const legHeight = 0.15;
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
  const legMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Oak') });
  
  // Position legs at corners with proper inset
  const legInset = legThickness * 2;
  const legPositions = [
    { x: dimensions.width / 2 - legInset, z: dimensions.depth / 2 - legInset },
    { x: -dimensions.width / 2 + legInset, z: dimensions.depth / 2 - legInset },
    { x: dimensions.width / 2 - legInset, z: -dimensions.depth / 2 + legInset },
    { x: -dimensions.width / 2 + legInset, z: -dimensions.depth / 2 + legInset }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, legHeight / 2, pos.z);
    group.add(leg);
  });
  
  // Add headboard for medium and large beds
  if (selectedSize === 'medium' || selectedSize === 'large') {
    const headboardHeight = selectedSize === 'large' ? 0.6 : 0.4;
    const headboardThickness = 0.05;
    
    // Main headboard
    const headboardGeometry = new THREE.BoxGeometry(dimensions.width, headboardHeight, headboardThickness);
    const headboard = new THREE.Mesh(headboardGeometry, frameMaterial);
    headboard.position.set(0, frameHeight + headboardHeight / 2, -dimensions.depth / 2 - headboardThickness / 2);
    group.add(headboard);
    
    // For large beds, add decorative elements to headboard
    if (selectedSize === 'large') {
      // Add decorative top piece
      const topPieceHeight = 0.1;
      const topPieceGeometry = new THREE.BoxGeometry(dimensions.width + 0.1, topPieceHeight, headboardThickness + 0.02);
      const topPiece = new THREE.Mesh(topPieceGeometry, frameMaterial);
      topPiece.position.set(0, frameHeight + headboardHeight + topPieceHeight / 2, -dimensions.depth / 2 - headboardThickness / 2);
      group.add(topPiece);
      
      // Add decorative vertical elements
      const verticalCount = 5; // Number of vertical decorative elements
      const verticalWidth = dimensions.width / (verticalCount + 1);
      const verticalHeight = headboardHeight * 0.8;
      const verticalDepth = 0.02;
      
      for (let i = 0; i < verticalCount; i++) {
        const x = -dimensions.width / 2 + verticalWidth * (i + 1);
        const verticalGeometry = new THREE.BoxGeometry(0.03, verticalHeight, verticalDepth);
        const vertical = new THREE.Mesh(verticalGeometry, frameMaterial);
        vertical.position.set(x, frameHeight + verticalHeight / 2, -dimensions.depth / 2 - headboardThickness - verticalDepth / 2);
        group.add(vertical);
      }
    }
  }
  
  // Add pillows for all bed sizes
  const pillowWidth = dimensions.width * 0.25;
  const pillowHeight = 0.1;
  const pillowDepth = dimensions.depth * 0.2;
  const pillowGeometry = new THREE.BoxGeometry(pillowWidth, pillowHeight, pillowDepth);
  const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  
  // Left pillow
  const leftPillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
  leftPillow.position.set(-dimensions.width / 4, frameHeight + mattressHeight + pillowHeight / 2, -dimensions.depth / 2 + pillowDepth / 2);
  group.add(leftPillow);
  
  // Right pillow (for medium and large beds)
  if (selectedSize === 'medium' || selectedSize === 'large') {
    const rightPillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    rightPillow.position.set(dimensions.width / 4, frameHeight + mattressHeight + pillowHeight / 2, -dimensions.depth / 2 + pillowDepth / 2);
    group.add(rightPillow);
  }
}

// Create wardrobe model
function createWardrobeModel(group, dimensions) {
  // Create main body
  const bodyGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = dimensions.height / 2;
  group.add(body);
  
  // Create doors
  const doorWidth = dimensions.width / 2 - 0.01;
  const doorGeometry = new THREE.BoxGeometry(doorWidth, dimensions.height * 0.98, 0.02);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  
  // Left door
  const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  leftDoor.position.set(-doorWidth / 2, dimensions.height / 2, dimensions.depth / 2 + 0.01);
  group.add(leftDoor);
  
  // Right door
  const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  rightDoor.position.set(doorWidth / 2, dimensions.height / 2, dimensions.depth / 2 + 0.01);
  group.add(rightDoor);
  
  // Add door handles
  const handleGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8);
  const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  
  const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
  leftHandle.rotation.z = Math.PI / 2;
  leftHandle.position.set(-doorWidth + 0.1, dimensions.height / 2, dimensions.depth / 2 + 0.03);
  group.add(leftHandle);
  
  const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
  rightHandle.rotation.z = Math.PI / 2;
  rightHandle.position.set(doorWidth - 0.1, dimensions.height / 2, dimensions.depth / 2 + 0.03);
  group.add(rightHandle);
  
  // Add shelves for medium and large wardrobes
  if (selectedSize === 'medium' || selectedSize === 'large') {
    const shelfCount = selectedSize === 'medium' ? 3 : 5;
    const shelfHeight = 0.02;
    const shelfSpacing = (dimensions.height - shelfHeight) / (shelfCount + 1);
    
    for (let i = 1; i <= shelfCount; i++) {
      const shelfGeometry = new THREE.BoxGeometry(dimensions.width - 0.04, shelfHeight, dimensions.depth - 0.04);
      const shelf = new THREE.Mesh(shelfGeometry, bodyMaterial);
      shelf.position.set(0, i * shelfSpacing, 0);
      group.add(shelf);
    }
  }
}

// Create cabinet model
function createCabinetModel(group, dimensions) {
  // Create main body
  const bodyGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = dimensions.height / 2;
  group.add(body);
  
  // Create doors
  const doorWidth = dimensions.width / 2 - 0.01;
  const doorGeometry = new THREE.BoxGeometry(doorWidth, dimensions.height * 0.98, 0.02);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  
  // Left door
  const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  leftDoor.position.set(-doorWidth / 2, dimensions.height / 2, dimensions.depth / 2 + 0.01);
  group.add(leftDoor);
  
  // Right door
  const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  rightDoor.position.set(doorWidth / 2, dimensions.height / 2, dimensions.depth / 2 + 0.01);
  group.add(rightDoor);
  
  // Add door handles
  const handleGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8);
  const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  
  const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
  leftHandle.rotation.z = Math.PI / 2;
  leftHandle.position.set(-doorWidth + 0.1, dimensions.height / 2, dimensions.depth / 2 + 0.03);
  group.add(leftHandle);
  
  const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
  rightHandle.rotation.z = Math.PI / 2;
  rightHandle.position.set(doorWidth - 0.1, dimensions.height / 2, dimensions.depth / 2 + 0.03);
  group.add(rightHandle);
  
  // Add shelves
  const shelfCount = selectedSize === 'small' ? 2 : selectedSize === 'medium' ? 3 : 4;
  const shelfHeight = 0.02;
  const shelfSpacing = (dimensions.height - shelfHeight) / (shelfCount + 1);
  
  for (let i = 1; i <= shelfCount; i++) {
    const shelfGeometry = new THREE.BoxGeometry(dimensions.width - 0.04, shelfHeight, dimensions.depth - 0.04);
    const shelf = new THREE.Mesh(shelfGeometry, bodyMaterial);
    shelf.position.set(0, i * shelfSpacing, 0);
    group.add(shelf);
  }
}

// Create coffee table model
function createCoffeeTableModel(group, dimensions) {
  // Create tabletop
  const tableTopGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
  const tableTopMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Walnut') });
  const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
  tableTop.position.y = 0.4; // Lower height for coffee table
  group.add(tableTop);
  
  // Create legs
  const legThickness = 0.04;
  const legHeight = 0.4;
  const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
  const legMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Walnut') });
  
  // Position legs at corners
  const legPositions = [
    { x: dimensions.width / 2 - legThickness, z: dimensions.depth / 2 - legThickness },
    { x: -dimensions.width / 2 + legThickness, z: dimensions.depth / 2 - legThickness },
    { x: dimensions.width / 2 - legThickness, z: -dimensions.depth / 2 + legThickness },
    { x: -dimensions.width / 2 + legThickness, z: -dimensions.depth / 2 + legThickness }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, legHeight / 2, pos.z);
    group.add(leg);
  });
}

// Create sofa model
function createSofaModel(group, dimensions) {
  // Create base
  const baseGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height / 3, dimensions.depth);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Pine') });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = dimensions.height / 6;
  group.add(base);
  
  // Create seat cushion
  const cushionGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height / 4, dimensions.depth * 0.8);
  const cushionMaterial = new THREE.MeshStandardMaterial({ color: 0x6b8e23 }); // Olive green
  const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
  cushion.position.set(0, dimensions.height / 3 + dimensions.height / 8, -dimensions.depth * 0.1);
  group.add(cushion);
  
  // Create backrest
  const backrestGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height / 2, dimensions.depth / 5);
  const backrest = new THREE.Mesh(backrestGeometry, cushionMaterial);
  backrest.position.set(0, dimensions.height / 2, -dimensions.depth / 2 + dimensions.depth / 10);
  group.add(backrest);
  
  // Create armrests
  const armrestGeometry = new THREE.BoxGeometry(dimensions.width / 10, dimensions.height / 3, dimensions.depth * 0.7);
  
  // Left armrest
  const leftArmrest = new THREE.Mesh(armrestGeometry, cushionMaterial);
  leftArmrest.position.set(-dimensions.width / 2 + dimensions.width / 20, dimensions.height / 3, -dimensions.depth * 0.15);
  group.add(leftArmrest);
  
  // Right armrest
  const rightArmrest = new THREE.Mesh(armrestGeometry, cushionMaterial);
  rightArmrest.position.set(dimensions.width / 2 - dimensions.width / 20, dimensions.height / 3, -dimensions.depth * 0.15);
  group.add(rightArmrest);
  
  // Add legs
  const legHeight = 0.1;
  const legRadius = 0.03;
  const legGeometry = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 8);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  
  // Position legs at corners
  const legPositions = [
    { x: dimensions.width / 2 - legRadius * 2, z: dimensions.depth / 2 - legRadius * 2 },
    { x: -dimensions.width / 2 + legRadius * 2, z: dimensions.depth / 2 - legRadius * 2 },
    { x: dimensions.width / 2 - legRadius * 2, z: -dimensions.depth / 2 + legRadius * 2 },
    { x: -dimensions.width / 2 + legRadius * 2, z: -dimensions.depth / 2 + legRadius * 2 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, -legHeight / 2, pos.z);
    group.add(leg);
  });
}

// Create bar stool model
function createBarStoolModel(group, dimensions) {
  // Create seat
  const seatRadius = dimensions.width / 2;
  const seatHeight = 0.05;
  const seatGeometry = new THREE.CylinderGeometry(seatRadius, seatRadius, seatHeight, 32);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Oak') });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = 0.75; // Bar stool height
  group.add(seat);
  
  // Create leg
  const legRadius = 0.03;
  const legHeight = 0.75;
  const legGeometry = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const leg = new THREE.Mesh(legGeometry, legMaterial);
  leg.position.y = legHeight / 2;
  group.add(leg);
  
  // Create base
  const baseRadius = seatRadius * 0.8;
  const baseHeight = 0.02;
  const baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight, 32);
  const base = new THREE.Mesh(baseGeometry, legMaterial);
  base.position.y = baseHeight / 2;
  group.add(base);
  
  // Add backrest for large bar stool
  if (selectedSize === 'large') {
    const backrestHeight = 0.3;
    const backrestWidth = seatRadius * 1.5;
    const backrestDepth = 0.03;
    const backrestGeometry = new THREE.BoxGeometry(backrestWidth, backrestHeight, backrestDepth);
    const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
    backrest.position.set(0, 0.75 + backrestHeight / 2 + 0.05, -seatRadius + backrestDepth / 2);
    group.add(backrest);
    
    // Add backrest support
    const supportRadius = 0.015;
    const supportHeight = 0.3;
    const supportGeometry = new THREE.CylinderGeometry(supportRadius, supportRadius, supportHeight, 8);
    const support = new THREE.Mesh(supportGeometry, legMaterial);
    support.position.set(0, 0.75 + supportHeight / 2, -seatRadius + backrestDepth / 2);
    group.add(support);
  }
}

// Create reception desk model
function createReceptionDeskModel(group, dimensions) {
  // Create desktop with realistic thickness
  const desktopThickness = 0.04; // 4cm thickness for desktop
  const desktopGeometry = new THREE.BoxGeometry(dimensions.width, desktopThickness, dimensions.depth);
  const desktopMaterial = new THREE.MeshStandardMaterial({ 
    color: getWoodColor('Mahogany'),
    roughness: 0.3,
    metalness: 0.1
  });
  const desktop = new THREE.Mesh(desktopGeometry, desktopMaterial);
  desktop.position.y = dimensions.height; // Position at correct height
  group.add(desktop);
  
  // Add front panel with realistic dimensions
  const panelHeight = dimensions.height * 0.9;
  const panelThickness = 0.03;
  const panelGeometry = new THREE.BoxGeometry(dimensions.width, panelHeight, panelThickness);
  const panelMaterial = new THREE.MeshStandardMaterial({ 
    color: getWoodColor('Mahogany'),
    roughness: 0.4,
    metalness: 0.1
  });
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(0, panelHeight / 2, dimensions.depth / 2 - panelThickness / 2);
  group.add(panel);
  
  // Create side panels with proper dimensions
  const sidePanelDepth = selectedSize === 'small' ? dimensions.depth * 0.7 : 
                         selectedSize === 'medium' ? dimensions.depth * 0.8 : 
                         dimensions.depth;
  const sidePanelThickness = 0.03;
  const sidePanelGeometry = new THREE.BoxGeometry(sidePanelThickness, panelHeight, sidePanelDepth);
  
  // Left panel
  const leftPanel = new THREE.Mesh(sidePanelGeometry, panelMaterial);
  leftPanel.position.set(-dimensions.width / 2 + sidePanelThickness / 2, panelHeight / 2, 0);
  group.add(leftPanel);
  
  // Right panel
  const rightPanel = new THREE.Mesh(sidePanelGeometry, panelMaterial);
  rightPanel.position.set(dimensions.width / 2 - sidePanelThickness / 2, panelHeight / 2, 0);
  group.add(rightPanel);
  
  // Add desk base/cabinet
  const baseHeight = dimensions.height - desktopThickness;
  const baseWidth = dimensions.width - sidePanelThickness * 2;
  const baseDepth = dimensions.depth - panelThickness;
  const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: getWoodColor('Mahogany'),
    roughness: 0.5,
    metalness: 0.1
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(0, baseHeight / 2, -panelThickness / 2);
  group.add(base);
  
  // Add raised counter section for medium and large reception desks
  if (selectedSize === 'medium' || selectedSize === 'large') {
    const counterHeight = 0.2;
    const counterDepth = dimensions.depth * 0.3;
    const counterWidth = selectedSize === 'large' ? dimensions.width * 0.7 : dimensions.width * 0.5;
    const counterPosition = selectedSize === 'large' ? dimensions.width * 0.15 : 0;
    
    const counterGeometry = new THREE.BoxGeometry(counterWidth, counterHeight, counterDepth);
    const counterMaterial = new THREE.MeshStandardMaterial({ 
      color: getWoodColor('Mahogany'),
      roughness: 0.3,
      metalness: 0.1
    });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(counterPosition, dimensions.height + counterHeight / 2, dimensions.depth / 2 - counterDepth / 2 - 0.05);
    group.add(counter);
    
    // Add counter supports
    const supportWidth = 0.04;
    const supportHeight = counterHeight;
    const supportDepth = counterDepth;
    const supportGeometry = new THREE.BoxGeometry(supportWidth, supportHeight, supportDepth);
    
    // Left support
    const leftSupport = new THREE.Mesh(supportGeometry, panelMaterial);
    leftSupport.position.set(counterPosition - counterWidth / 2 + supportWidth / 2, 
                           dimensions.height + supportHeight / 2, 
                           dimensions.depth / 2 - counterDepth / 2 - 0.05);
    group.add(leftSupport);
    
    // Right support
    const rightSupport = new THREE.Mesh(supportGeometry, panelMaterial);
    rightSupport.position.set(counterPosition + counterWidth / 2 - supportWidth / 2, 
                            dimensions.height + supportHeight / 2, 
                            dimensions.depth / 2 - counterDepth / 2 - 0.05);
    group.add(rightSupport);
    
    // Middle support for large desks
    if (selectedSize === 'large') {
      const middleSupport = new THREE.Mesh(supportGeometry, panelMaterial);
      middleSupport.position.set(counterPosition, 
                               dimensions.height + supportHeight / 2, 
                               dimensions.depth / 2 - counterDepth / 2 - 0.05);
      group.add(middleSupport);
    }
  }
  
  // Add decorative horizontal strip
  const stripHeight = 0.05;
  const stripGeometry = new THREE.BoxGeometry(dimensions.width, stripHeight, panelThickness + 0.01);
  const stripMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a3a3a, // Dark accent color
    roughness: 0.4,
    metalness: 0.3
  });
  const strip = new THREE.Mesh(stripGeometry, stripMaterial);
  strip.position.set(0, panelHeight * 0.7, dimensions.depth / 2 - panelThickness / 2);
  group.add(strip);
  
  // Add drawers for large reception desks
  if (selectedSize === 'large') {
    const drawerWidth = baseWidth / 3;
    const drawerHeight = 0.15;
    const drawerDepth = 0.02;
    const drawerGeometry = new THREE.BoxGeometry(drawerWidth, drawerHeight, drawerDepth);
    const drawerMaterial = new THREE.MeshStandardMaterial({ 
      color: getWoodColor('Mahogany'),
      roughness: 0.4,
      metalness: 0.1
    });
    
    // Create three drawers
    for (let i = 0; i < 3; i++) {
      const drawer = new THREE.Mesh(drawerGeometry, drawerMaterial);
      drawer.position.set((i - 1) * drawerWidth, baseHeight * 0.6, -baseDepth / 2 + drawerDepth / 2);
      group.add(drawer);
      
      // Add drawer handle
      const handleWidth = drawerWidth * 0.3;
      const handleHeight = 0.02;
      const handleDepth = 0.01;
      const handleGeometry = new THREE.BoxGeometry(handleWidth, handleHeight, handleDepth);
      const handleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888, // Metal color
        roughness: 0.2,
        metalness: 0.8
      });
      const handle = new THREE.Mesh(handleGeometry, handleMaterial);
      handle.position.set((i - 1) * drawerWidth, baseHeight * 0.6, -baseDepth / 2 + drawerDepth + handleDepth / 2);
      group.add(handle);
    }
  }
}

// Create default box model
function createDefaultBox(group, dimensions) {
  const geometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
  const material = new THREE.MeshStandardMaterial({ color: 0xb68c59 });
  const box = new THREE.Mesh(geometry, material);
  box.position.y = dimensions.height / 2;
  group.add(box);
}

// Center camera on model
function centerCameraOnModel(model) {
  // Create bounding box
  const boundingBox = new THREE.Box3().setFromObject(model);
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());
  
  // Position camera to view the entire model
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
  
  // Set camera position and target
  camera.position.set(center.x, center.y + maxDim / 2, center.z + cameraZ);
  controls.target.set(center.x, center.y, center.z);
  camera.updateProjectionMatrix();
  controls.update();
}

// Reset camera to default position
function resetCamera() {
  if (furniture3DModel) {
    // Create bounding box
    const boundingBox = new THREE.Box3().setFromObject(furniture3DModel);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    
    // Position camera to view the entire model
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
    
    // Set camera position and target
    camera.position.set(center.x, center.y + maxDim / 2, center.z + cameraZ);
    controls.target.set(center.x, center.y, center.z);
    camera.updateProjectionMatrix();
    controls.update();
  }
}

// Add measurements to model
function addMeasurements(model, dimensions) {
  // Clear previous measurements
  measurementObjects.forEach(obj => scene.remove(obj));
  measurementObjects = [];
  
  if (!measurementsVisible) return;
  
  // Create measurement lines and labels
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe74c3c });
  
  // Width measurement
  const widthPoints = [
    new THREE.Vector3(-dimensions.width / 2, 0, dimensions.depth / 2 + 0.1),
    new THREE.Vector3(dimensions.width / 2, 0, dimensions.depth / 2 + 0.1)
  ];
  const widthGeometry = new THREE.BufferGeometry().setFromPoints(widthPoints);
  const widthLine = new THREE.Line(widthGeometry, lineMaterial);
  scene.add(widthLine);
  measurementObjects.push(widthLine);
  
  // Height measurement
  const heightPoints = [
    new THREE.Vector3(dimensions.width / 2 + 0.1, 0, 0),
    new THREE.Vector3(dimensions.width / 2 + 0.1, dimensions.height, 0)
  ];
  const heightGeometry = new THREE.BufferGeometry().setFromPoints(heightPoints);
  const heightLine = new THREE.Line(heightGeometry, lineMaterial);
  scene.add(heightLine);
  measurementObjects.push(heightLine);
  
  // Depth measurement
  const depthPoints = [
    new THREE.Vector3(-dimensions.width / 2 - 0.1, 0, -dimensions.depth / 2),
    new THREE.Vector3(-dimensions.width / 2 - 0.1, 0, dimensions.depth / 2)
  ];
  const depthGeometry = new THREE.BufferGeometry().setFromPoints(depthPoints);
  const depthLine = new THREE.Line(depthGeometry, lineMaterial);
  scene.add(depthLine);
  measurementObjects.push(depthLine);
  
  // Add measurement labels using HTML elements
  const widthLabel = document.createElement('div');
  widthLabel.className = 'measurement-label';
  widthLabel.textContent = `${(dimensions.width * 100).toFixed(0)} cm`;
  widthLabel.style.position = 'absolute';
  widthLabel.style.color = '#e74c3c';
  widthLabel.style.fontWeight = 'bold';
  document.querySelector('.canvas-container').appendChild(widthLabel);
  measurementObjects.push(widthLabel);
  
  const heightLabel = document.createElement('div');
  heightLabel.className = 'measurement-label';
  heightLabel.textContent = `${(dimensions.height * 100).toFixed(0)} cm`;
  heightLabel.style.position = 'absolute';
  heightLabel.style.color = '#e74c3c';
  heightLabel.style.fontWeight = 'bold';
  document.querySelector('.canvas-container').appendChild(heightLabel);
  measurementObjects.push(heightLabel);
  
  const depthLabel = document.createElement('div');
  depthLabel.className = 'measurement-label';
  depthLabel.textContent = `${(dimensions.depth * 100).toFixed(0)} cm`;
  depthLabel.style.position = 'absolute';
  depthLabel.style.color = '#e74c3c';
  depthLabel.style.fontWeight = 'bold';
  document.querySelector('.canvas-container').appendChild(depthLabel);
  measurementObjects.push(depthLabel);
  
  // Update label positions in animation loop
  function updateLabelPositions() {
    // Get screen positions for labels
    const widthCenter = new THREE.Vector3(0, 0, dimensions.depth / 2 + 0.1);
    const heightCenter = new THREE.Vector3(dimensions.width / 2 + 0.1, dimensions.height / 2, 0);
    const depthCenter = new THREE.Vector3(-dimensions.width / 2 - 0.1, 0, 0);
    
    // Project to screen coordinates
    const widthScreenPos = toScreenPosition(widthCenter);
    const heightScreenPos = toScreenPosition(heightCenter);
    const depthScreenPos = toScreenPosition(depthCenter);
    
    // Update label positions
    widthLabel.style.left = `${widthScreenPos.x}px`;
    widthLabel.style.top = `${widthScreenPos.y}px`;
    
    heightLabel.style.left = `${heightScreenPos.x}px`;
    heightLabel.style.top = `${heightScreenPos.y}px`;
    
    depthLabel.style.left = `${depthScreenPos.x}px`;
    depthLabel.style.top = `${depthScreenPos.y}px`;
    
    requestAnimationFrame(updateLabelPositions);
  }
  
  updateLabelPositions();
}

// Helper function to convert 3D position to screen coordinates
function toScreenPosition(position) {
  const vector = position.clone();
  const canvas = renderer.domElement;
  
  vector.project(camera);
  
  vector.x = Math.round((vector.x + 1) * canvas.width / 2);
  vector.y = Math.round((-vector.y + 1) * canvas.height / 2);
  
  return { x: vector.x, y: vector.y };
}

// Toggle wireframe mode
function toggleWireframe() {
  wireframeMode = !wireframeMode;
  
  if (furniture3DModel) {
    furniture3DModel.traverse(child => {
      if (child.isMesh) {
        child.material.wireframe = wireframeMode;
      }
    });
  }
}

// Create file cabinet model
function createFileCabinetModel(group, dimensions) {
  const { width, height, depth } = dimensions;
  
  // Cabinet body
  const cabinetMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Teak'),
    roughness: 0.7,
    metalness: 0.2
  });
  
  const cabinetGeometry = new THREE.BoxGeometry(width, height, depth);
  const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
  cabinet.position.y = height / 2;
  cabinet.castShadow = true;
  cabinet.receiveShadow = true;
  group.add(cabinet);
  
  // Add drawers
  const numDrawers = 4; // Standard file cabinet has 4 drawers
  const drawerHeight = height / numDrawers * 0.85;
  const drawerGap = height / numDrawers - drawerHeight;
  const drawerDepth = depth * 0.95;
  
  const drawerMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Teak'),
    roughness: 0.5,
    metalness: 0.3
  });
  
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.8
  });
  
  for (let i = 0; i < numDrawers; i++) {
    // Drawer face
    const drawerFaceGeometry = new THREE.BoxGeometry(width * 0.9, drawerHeight, depth * 0.05);
    const drawerFace = new THREE.Mesh(drawerFaceGeometry, drawerMaterial);
    drawerFace.position.set(0, (i + 0.5) * (drawerHeight + drawerGap), depth / 2 - depth * 0.025);
    drawerFace.castShadow = true;
    group.add(drawerFace);
    
    // Drawer handle
    const handleWidth = width * 0.4;
    const handleHeight = drawerHeight * 0.1;
    const handleDepth = depth * 0.05;
    
    const handleGeometry = new THREE.BoxGeometry(handleWidth, handleHeight, handleDepth);
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0, (i + 0.5) * (drawerHeight + drawerGap), depth / 2 + handleDepth / 2);
    handle.castShadow = true;
    group.add(handle);
    
    // Label holder
    const labelHolderGeometry = new THREE.BoxGeometry(width * 0.3, drawerHeight * 0.2, depth * 0.01);
    const labelHolder = new THREE.Mesh(labelHolderGeometry, handleMaterial);
    labelHolder.position.set(0, (i + 0.5) * (drawerHeight + drawerGap) - drawerHeight * 0.3, depth / 2 + depth * 0.01);
    labelHolder.castShadow = true;
    group.add(labelHolder);
  }
}

// Create shoe rack model
function createShoeRackModel(group, dimensions) {
  const { width, height, depth } = dimensions;
  
  // Frame material
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Walnut'),
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Create the main frame
  const frameThickness = width * 0.05;
  
  // Left side
  const leftSideGeometry = new THREE.BoxGeometry(frameThickness, height, depth);
  const leftSide = new THREE.Mesh(leftSideGeometry, frameMaterial);
  leftSide.position.set(-width/2 + frameThickness/2, height/2, 0);
  leftSide.castShadow = true;
  leftSide.receiveShadow = true;
  group.add(leftSide);
  
  // Right side
  const rightSideGeometry = new THREE.BoxGeometry(frameThickness, height, depth);
  const rightSide = new THREE.Mesh(rightSideGeometry, frameMaterial);
  rightSide.position.set(width/2 - frameThickness/2, height/2, 0);
  rightSide.castShadow = true;
  rightSide.receiveShadow = true;
  group.add(rightSide);
  
  // Top
  const topGeometry = new THREE.BoxGeometry(width, frameThickness, depth);
  const top = new THREE.Mesh(topGeometry, frameMaterial);
  top.position.set(0, height - frameThickness/2, 0);
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);
  
  // Bottom
  const bottomGeometry = new THREE.BoxGeometry(width, frameThickness, depth);
  const bottom = new THREE.Mesh(bottomGeometry, frameMaterial);
  bottom.position.set(0, frameThickness/2, 0);
  bottom.castShadow = true;
  bottom.receiveShadow = true;
  group.add(bottom);
  
  // Add shelves
  const numShelves = 4;
  const shelfHeight = height * 0.8 / numShelves;
  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Walnut'),
    roughness: 0.6,
    metalness: 0.1
  });
  
  for (let i = 0; i < numShelves; i++) {
    const shelfGeometry = new THREE.BoxGeometry(width - frameThickness * 2, frameThickness, depth);
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(0, frameThickness + shelfHeight * (i + 0.5), 0);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    group.add(shelf);
  }
}

// Create side drawer model
function createSideDrawerModel(group, dimensions) {
  const { width, height, depth } = dimensions;
  
  // Main body
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Maple'),
    roughness: 0.6,
    metalness: 0.2
  });
  
  const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = height / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);
  
  // Add drawers
  const numDrawers = 3; // Standard side drawer has 3 drawers
  const drawerHeight = height / numDrawers * 0.85;
  const drawerGap = height / numDrawers - drawerHeight;
  
  const drawerMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Birch'),
    roughness: 0.5,
    metalness: 0.1
  });
  
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.3,
    metalness: 0.7
  });
  
  for (let i = 0; i < numDrawers; i++) {
    // Drawer face
    const drawerFaceGeometry = new THREE.BoxGeometry(width * 0.9, drawerHeight, depth * 0.05);
    const drawerFace = new THREE.Mesh(drawerFaceGeometry, drawerMaterial);
    drawerFace.position.set(0, (i + 0.5) * (drawerHeight + drawerGap), depth / 2 - depth * 0.025);
    drawerFace.castShadow = true;
    group.add(drawerFace);
    
    // Drawer handles - two knobs
    const knobRadius = width * 0.03;
    const knobGeometry = new THREE.SphereGeometry(knobRadius, 16, 16);
    
    // Left knob
    const leftKnob = new THREE.Mesh(knobGeometry, handleMaterial);
    leftKnob.position.set(-width * 0.2, (i + 0.5) * (drawerHeight + drawerGap), depth / 2 + knobRadius);
    leftKnob.castShadow = true;
    group.add(leftKnob);
    
    // Right knob
    const rightKnob = new THREE.Mesh(knobGeometry, handleMaterial);
    rightKnob.position.set(width * 0.2, (i + 0.5) * (drawerHeight + drawerGap), depth / 2 + knobRadius);
    rightKnob.castShadow = true;
    group.add(rightKnob);
  }
  
  // Add legs
  const legHeight = height * 0.1;
  const legWidth = width * 0.1;
  const legMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Maple'),
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Create 4 legs
  const positions = [
    [-width/2 + legWidth/2, -legHeight/2, -depth/2 + legWidth/2],
    [width/2 - legWidth/2, -legHeight/2, -depth/2 + legWidth/2],
    [-width/2 + legWidth/2, -legHeight/2, depth/2 - legWidth/2],
    [width/2 - legWidth/2, -legHeight/2, depth/2 - legWidth/2]
  ];
  
  positions.forEach(pos => {
    const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legWidth);
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos[0], pos[1], pos[2]);
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);
  });
}

// Create bookshelf model
function createBookshelfModel(group, dimensions) {
  const { width, height, depth } = dimensions;
  
  // Frame material
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Oak'),
    roughness: 0.6,
    metalness: 0.1
  });
  
  // Create the main frame
  const frameThickness = width * 0.05;
  
  // Left side
  const leftSideGeometry = new THREE.BoxGeometry(frameThickness, height, depth);
  const leftSide = new THREE.Mesh(leftSideGeometry, frameMaterial);
  leftSide.position.set(-width/2 + frameThickness/2, height/2, 0);
  leftSide.castShadow = true;
  leftSide.receiveShadow = true;
  group.add(leftSide);
  
  // Right side
  const rightSideGeometry = new THREE.BoxGeometry(frameThickness, height, depth);
  const rightSide = new THREE.Mesh(rightSideGeometry, frameMaterial);
  rightSide.position.set(width/2 - frameThickness/2, height/2, 0);
  rightSide.castShadow = true;
  rightSide.receiveShadow = true;
  group.add(rightSide);
  
  // Top
  const topGeometry = new THREE.BoxGeometry(width, frameThickness, depth);
  const top = new THREE.Mesh(topGeometry, frameMaterial);
  top.position.set(0, height - frameThickness/2, 0);
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);
  
  // Bottom
  const bottomGeometry = new THREE.BoxGeometry(width, frameThickness, depth);
  const bottom = new THREE.Mesh(bottomGeometry, frameMaterial);
  bottom.position.set(0, frameThickness/2, 0);
  bottom.castShadow = true;
  bottom.receiveShadow = true;
  group.add(bottom);
  
  // Back panel
  const backPanelGeometry = new THREE.BoxGeometry(width - frameThickness, height - frameThickness * 2, frameThickness / 2);
  const backPanelMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Oak'),
    roughness: 0.7,
    metalness: 0.1
  });
  const backPanel = new THREE.Mesh(backPanelGeometry, backPanelMaterial);
  backPanel.position.set(0, height/2, -depth/2 + frameThickness/4);
  backPanel.castShadow = true;
  backPanel.receiveShadow = true;
  group.add(backPanel);
  
  // Add shelves
  const numShelves = 5;
  const shelfHeight = (height - frameThickness * 2) / numShelves;
  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: getWoodColor('Oak'),
    roughness: 0.6,
    metalness: 0.1
  });
  
  for (let i = 1; i < numShelves; i++) {
    const shelfGeometry = new THREE.BoxGeometry(width - frameThickness * 2, frameThickness, depth - frameThickness);
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(0, frameThickness + shelfHeight * i, 0);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    group.add(shelf);
  }
  
  // Add some books for visual interest
  const bookColors = [0x1e88e5, 0xd81b60, 0x8e24aa, 0x43a047, 0xfdd835, 0xf4511e];
  const shelfPositions = [1, 2, 3, 4]; // Which shelves to put books on
  
  shelfPositions.forEach(shelfIndex => {
    const numBooks = Math.floor(Math.random() * 5) + 5; // 5-10 books per shelf
    const bookWidth = (width - frameThickness * 2) / numBooks * 0.8;
    const bookHeight = shelfHeight * 0.8;
    const bookDepth = depth * 0.7;
    
    for (let i = 0; i < numBooks; i++) {
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: bookColors[Math.floor(Math.random() * bookColors.length)],
        roughness: 0.7,
        metalness: 0.1
      });
      
      const bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      
      // Position the book on the shelf with some randomness
      const xOffset = -width/2 + frameThickness + bookWidth/2 + (width - frameThickness * 2 - bookWidth) * (i / numBooks);
      const yOffset = frameThickness + shelfHeight * shelfIndex + bookHeight/2 + frameThickness/2;
      const zOffset = (Math.random() - 0.5) * (depth * 0.2);
      
      book.position.set(xOffset, yOffset, zOffset);
      book.rotation.y = (Math.random() - 0.5) * 0.2; // Slight random rotation
      book.castShadow = true;
      book.receiveShadow = true;
      group.add(book);
    }
  });
}

// Toggle Maldivian theme
function toggleMaldivianTheme() {
  maldivianThemeEnabled = !maldivianThemeEnabled;
  
  // Update button appearance
  const themeButton = document.getElementById('toggle-maldivian-theme');
  if (maldivianThemeEnabled) {
    themeButton.classList.add('active');
    themeButton.innerHTML = '<i class="fas fa-palette"></i> Standard Theme';
  } else {
    themeButton.classList.remove('active');
    themeButton.innerHTML = '<i class="fas fa-palette"></i> Maldivian Theme';
  }
  
  // Reload the current furniture model with new theme
  if (selectedFurniture && selectedSize) {
    loadFurnitureModel(selectedFurniture, selectedSize);
  }
}

// Toggle measurements visibility
function toggleMeasurements() {
  measurementsVisible = !measurementsVisible;
  
  if (furniture3DModel) {
    // Clear existing measurements
    measurementObjects.forEach(obj => {
      if (obj instanceof THREE.Line) {
        scene.remove(obj);
      } else if (obj instanceof HTMLElement) {
        obj.remove();
      }
    });
    measurementObjects = [];
    
    // Get dimensions from the model
    const boundingBox = new THREE.Box3().setFromObject(furniture3DModel);
    const size = boundingBox.getSize(new THREE.Vector3());
    
    // Add new measurements if enabled
    if (measurementsVisible) {
      addMeasurements(furniture3DModel, {
        width: size.x,
        height: size.y,
        depth: size.z
      });
    }
  }
}