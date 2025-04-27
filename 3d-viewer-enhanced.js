// Enhanced 3D Viewer for FurniCraft Pro
// This script extends the functionality of the original 3d-viewer.js with improved rendering

// Store original initialization function
const originalInit = window.init || function() {};
const originalCreateBasicFurnitureModel = window.createBasicFurnitureModel || function() {};

// Override the initialization function
window.init = function() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // Create camera with better perspective
  camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(3, 3, 5); // Improved initial position for better overview
  
  // Create renderer with enhanced quality settings
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('3d-viewer'),
    antialias: true,
    precision: 'highp',
    alpha: true
  });
  renderer.setSize(document.querySelector('.canvas-container').clientWidth, 
                   document.querySelector('.canvas-container').clientHeight);
  
  // Enhanced shadow settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer, more realistic shadows
  renderer.outputEncoding = THREE.sRGBEncoding; // Better color rendering
  renderer.physicallyCorrectLights = true; // More realistic lighting
  
  // Add tone mapping for more realistic rendering if available
  if (THREE.ACESFilmicToneMapping) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
  }
  
  // Enhanced orbit controls with better user experience
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.rotateSpeed = 0.8; // Smoother rotation
  controls.zoomSpeed = 1.2; // Faster zoom
  controls.panSpeed = 0.8; // Smoother panning
  controls.minDistance = 1; // Prevent zooming too close
  controls.maxDistance = 20; // Prevent zooming too far
  controls.maxPolarAngle = Math.PI / 1.8; // Limit vertical rotation to prevent going below floor
  
  // Advanced lighting setup for photorealistic rendering
  
  // Base ambient light for global illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  // Main directional light (sun-like) with enhanced shadows
  const directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.0); // Warm white light
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  
  // Ultra high quality shadow settings
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
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
  
  // Add secondary fill light from opposite side (cooler tone)
  const fillLight = new THREE.DirectionalLight(0xf0f8ff, 0.5); // Slight blue tint
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  
  // Add a subtle warm rim light for depth and edge definition
  const rimLight = new THREE.DirectionalLight(0xfff0e0, 0.4);
  rimLight.position.set(0, 3, -10);
  scene.add(rimLight);
  
  // Add a soft spotlight to highlight the furniture
  const spotLight = new THREE.SpotLight(0xffffff, 0.6);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.5; // Soft edge
  spotLight.decay = 2;
  spotLight.distance = 30;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);
  
  // Create a high-quality floor
  createEnhancedFloor();
  
  // Create enhanced room environment
  createEnhancedRoom();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
};

// Create enhanced floor with better textures
function createEnhancedFloor() {
  const floorSize = 20;
  const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize, 32, 32);
  floorGeometry.rotateX(-Math.PI / 2); // Rotate to be horizontal
  
  // Create checkered texture
  const textureSize = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = textureSize;
  canvas.height = textureSize;
  const context = canvas.getContext('2d');
  
  // Draw enhanced checkered pattern with subtle grain
  const tileSize = textureSize / 12;
  context.fillStyle = '#f5f5f5';
  context.fillRect(0, 0, textureSize, textureSize);
  
  // Add subtle noise to the base color for realism
  for (let x = 0; x < textureSize; x++) {
    for (let y = 0; y < textureSize; y++) {
      if (Math.random() > 0.97) {
        context.fillStyle = `rgba(0,0,0,${Math.random() * 0.03})`;
        context.fillRect(x, y, 1, 1);
      }
    }
  }
  
  // Draw checkered pattern
  context.fillStyle = '#e0e0e0';
  for (let x = 0; x < textureSize; x += tileSize * 2) {
    for (let y = 0; y < textureSize; y += tileSize * 2) {
      context.fillRect(x, y, tileSize, tileSize);
      context.fillRect(x + tileSize, y + tileSize, tileSize, tileSize);
    }
  }
  
  const floorTexture = new THREE.CanvasTexture(canvas);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(3, 3);
  
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.8,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.position.y = -0.01; // Slightly below origin to avoid z-fighting
  scene.add(floor);
}

// Create enhanced room environment
function createEnhancedRoom() {
  const floorSize = 20;
  const wallHeight = 3.5;
  
  // Create wall texture with subtle pattern
  const wallTextureSize = 1024;
  const wallCanvas = document.createElement('canvas');
  wallCanvas.width = wallTextureSize;
  wallCanvas.height = wallTextureSize;
  const wallContext = wallCanvas.getContext('2d');
  
  // Base wall color
  wallContext.fillStyle = '#f8f8f8';
  wallContext.fillRect(0, 0, wallTextureSize, wallTextureSize);
  
  // Add subtle texture pattern
  wallContext.fillStyle = '#f0f0f0';
  const patternSize = 64;
  for (let x = 0; x < wallTextureSize; x += patternSize) {
    for (let y = 0; y < wallTextureSize; y += patternSize) {
      if (Math.random() > 0.5) {
        wallContext.fillRect(x, y, patternSize, patternSize);
      }
    }
  }
  
  // Create wall texture
  const wallTexture = new THREE.CanvasTexture(wallCanvas);
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(4, 2);
  
  // Create wall material
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    map: wallTexture,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight, 10, 10);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.z = -floorSize/2;
  backWall.position.y = wallHeight/2;
  backWall.receiveShadow = true;
  scene.add(backWall);
  
  // Add window to back wall
  const windowWidth = 3;
  const windowHeight = 2;
  const windowGeometry = new THREE.PlaneGeometry(windowWidth, windowHeight);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xadd8e6,
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    metalness: 0.2,
    side: THREE.DoubleSide
  });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.set(1, wallHeight/2 + 0.2, -floorSize/2 + 0.01);
  scene.add(windowMesh);
  
  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight, 10, 10);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.x = -floorSize/2;
  leftWall.position.y = wallHeight/2;
  leftWall.rotation.y = Math.PI/2;
  leftWall.receiveShadow = true;
  scene.add(leftWall);
  
  // Add baseboard to walls
  const baseboardHeight = 0.15;
  const baseboardDepth = 0.05;
  const baseboardMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x5c4033, // Brown color
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Back wall baseboard
  const backBaseboardGeometry = new THREE.BoxGeometry(floorSize, baseboardHeight, baseboardDepth);
  const backBaseboard = new THREE.Mesh(backBaseboardGeometry, baseboardMaterial);
  backBaseboard.position.set(0, baseboardHeight/2, -floorSize/2 + baseboardDepth/2);
  scene.add(backBaseboard);
  
  // Left wall baseboard
  const leftBaseboardGeometry = new THREE.BoxGeometry(floorSize, baseboardHeight, baseboardDepth);
  const leftBaseboard = new THREE.Mesh(leftBaseboardGeometry, baseboardMaterial);
  leftBaseboard.position.set(-floorSize/2 + baseboardDepth/2, baseboardHeight/2, 0);
  leftBaseboard.rotation.y = Math.PI/2;
  scene.add(leftBaseboard);
}

// Enhanced wood color function with more wood types
function getEnhancedWoodColor(woodType) {
  const woodColors = {
    'Oak': 0xD4A76A,
    'Mahogany': 0x6D3C32,
    'Pine': 0xEAD0A7,
    'Walnut': 0x5C4033,
    'Maple': 0xE8D0A9,
    'Cherry': 0x933A16,
    'Plywood': 0xE0C9A6,
    'MDF': 0xD3BC8D,
    'Particleboard': 0xD2B48C,
    'Teak': 0xB77729,
    'Ebony': 0x3D2B1F,
    'Bamboo': 0xD9CB9E
  };
  
  return woodColors[woodType] || 0xD4A76A; // Default to Oak if type not found
}

// Override createBasicFurnitureModel to use enhanced materials
window.createBasicFurnitureModel = function(furnitureType, size) {
  // Call the original function to create the basic model
  const group = originalCreateBasicFurnitureModel(furnitureType, size);
  
  // Enhance the materials of all meshes in the group
  group.traverse(object => {
    if (object instanceof THREE.Mesh) {
      // Only enhance standard materials
      if (object.material instanceof THREE.MeshStandardMaterial) {
        // Clone the material to avoid affecting other objects
        object.material = object.material.clone();
        
        // Enhance material properties
        object.material.roughness = 0.7;
        object.material.metalness = 0.1;
        
        // Add subtle ambient occlusion
        const geometry = object.geometry;
        if (geometry.attributes.position) {
          // Make sure shadows are enabled
          object.castShadow = true;
          object.receiveShadow = true;
        }
      }
    }
  });
  
  return group;
};

// Add this script to the page after the original 3d-viewer.js has loaded
console.log('Enhanced 3D viewer loaded');
