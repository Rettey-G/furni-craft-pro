// Additional 3D models for FurniCraft Pro

// Create kitchen hood with cupboard model
function createKitchenHoodWithCupboardModel(group, dimensions) {
  // Create the upper cabinet first
  const cabinetWidth = dimensions.width;
  const cabinetHeight = dimensions.height * 0.4;
  const cabinetDepth = dimensions.depth;
  
  // Cabinet box
  const cabinetGeometry = new THREE.BoxGeometry(cabinetWidth, cabinetHeight, cabinetDepth);
  const cabinetMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513, // Wood brown color
    roughness: 0.7,
    metalness: 0.1
  });
  const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
  cabinet.position.y = dimensions.height * 0.2;
  group.add(cabinet);
  
  // Cabinet doors
  const doorWidth = cabinetWidth * 0.48;
  const doorHeight = cabinetHeight * 0.9;
  const doorDepth = dimensions.depth * 0.05;
  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x9E6B4A, // Slightly lighter wood color
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Left door
  const leftDoorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
  const leftDoor = new THREE.Mesh(leftDoorGeometry, doorMaterial);
  leftDoor.position.set(-cabinetWidth * 0.25, dimensions.height * 0.2, cabinetDepth * 0.48);
  group.add(leftDoor);
  
  // Right door
  const rightDoorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
  const rightDoor = new THREE.Mesh(rightDoorGeometry, doorMaterial);
  rightDoor.position.set(cabinetWidth * 0.25, dimensions.height * 0.2, cabinetDepth * 0.48);
  group.add(rightDoor);
  
  // Add handles to doors
  addHandle(group, dimensions, -cabinetWidth * 0.4, dimensions.height * 0.2, cabinetDepth * 0.5);
  addHandle(group, dimensions, cabinetWidth * 0.4, dimensions.height * 0.2, cabinetDepth * 0.5);
  
  // Now create the kitchen hood on top of the cabinet
  
  // Create main hood body
  const hoodBodyGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height * 0.3, dimensions.depth);
  const hoodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xCCCCCC, 
    roughness: 0.2,
    metalness: 0.7
  });
  const hoodBody = new THREE.Mesh(hoodBodyGeometry, hoodMaterial);
  hoodBody.position.y = dimensions.height * 0.85;
  group.add(hoodBody);
  
  // Create chimney/duct
  const ductWidth = dimensions.width * 0.3;
  const ductHeight = dimensions.height * 0.7;
  const ductDepth = dimensions.depth * 0.3;
  const ductGeometry = new THREE.BoxGeometry(ductWidth, ductHeight, ductDepth);
  const duct = new THREE.Mesh(ductGeometry, hoodMaterial);
  duct.position.set(0, dimensions.height * 0.5, 0);
  group.add(duct);
  
  // Create filter area
  const filterGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, dimensions.height * 0.05, dimensions.depth * 0.9);
  const filterMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.2
  });
  const filter = new THREE.Mesh(filterGeometry, filterMaterial);
  filter.position.y = dimensions.height * 0.7;
  group.add(filter);
  
  // Create control panel
  const controlPanelGeometry = new THREE.BoxGeometry(dimensions.width * 0.4, dimensions.height * 0.05, dimensions.depth * 0.1);
  const controlPanelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
  controlPanel.position.set(0, dimensions.height * 0.75, dimensions.depth * 0.45);
  group.add(controlPanel);
  
  // Add buttons to control panel
  const buttonGeometry = new THREE.CylinderGeometry(dimensions.width * 0.02, dimensions.width * 0.02, dimensions.height * 0.01, 16);
  const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  
  for (let i = 0; i < 3; i++) {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.rotation.x = Math.PI / 2;
    button.position.set((i - 1) * dimensions.width * 0.1, dimensions.height * 0.75, dimensions.depth * 0.5);
    group.add(button);
  }
}

// Create kitchen hood model
function createKitchenHoodModel(group, dimensions) {
  // Create main hood body
  const hoodBodyGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height * 0.3, dimensions.depth);
  const hoodMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xCCCCCC, 
    roughness: 0.2,
    metalness: 0.7
  });
  const hoodBody = new THREE.Mesh(hoodBodyGeometry, hoodMaterial);
  hoodBody.position.y = dimensions.height * 0.85;
  group.add(hoodBody);
  
  // Create chimney/duct
  const ductWidth = dimensions.width * 0.3;
  const ductHeight = dimensions.height * 0.7;
  const ductDepth = dimensions.depth * 0.3;
  const ductGeometry = new THREE.BoxGeometry(ductWidth, ductHeight, ductDepth);
  const duct = new THREE.Mesh(ductGeometry, hoodMaterial);
  duct.position.set(0, dimensions.height * 0.5, 0);
  group.add(duct);
  
  // Create filter area
  const filterGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, dimensions.height * 0.05, dimensions.depth * 0.9);
  const filterMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.2
  });
  const filter = new THREE.Mesh(filterGeometry, filterMaterial);
  filter.position.y = dimensions.height * 0.7;
  group.add(filter);
  
  // Create control panel
  const controlPanelGeometry = new THREE.BoxGeometry(dimensions.width * 0.4, dimensions.height * 0.05, dimensions.depth * 0.1);
  const controlPanelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
  controlPanel.position.set(0, dimensions.height * 0.75, dimensions.depth * 0.45);
  group.add(controlPanel);
  
  // Add buttons to control panel
  const buttonGeometry = new THREE.CylinderGeometry(dimensions.width * 0.02, dimensions.width * 0.02, dimensions.height * 0.01, 16);
  const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  
  for (let i = 0; i < 3; i++) {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.rotation.x = Math.PI / 2;
    button.position.set((i - 1) * dimensions.width * 0.1, dimensions.height * 0.75, dimensions.depth * 0.5);
    group.add(button);
  }
  
  // Add light indicator
  const lightGeometry = new THREE.BoxGeometry(dimensions.width * 0.05, dimensions.height * 0.01, dimensions.depth * 0.05);
  const lightMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00FF00,
    emissive: 0x00FF00,
    emissiveIntensity: 0.5
  });
  const light = new THREE.Mesh(lightGeometry, lightMaterial);
  light.position.set(dimensions.width * 0.15, dimensions.height * 0.75, dimensions.depth * 0.5);
  group.add(light);
}

// Create cupboard model
function createCupboardModel(group, dimensions) {
  // Create main cabinet body
  const cabinetGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
  const cabinetMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
  cabinet.position.y = dimensions.height / 2;
  group.add(cabinet);
  
  // Create doors based on size
  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: getWoodColor('MDF'),
    roughness: 0.7,
    metalness: 0.1
  });
  
  if (selectedSize === 'small') {
    // Single door for small cupboard
    const doorGeometry = new THREE.BoxGeometry(dimensions.width * 0.95, dimensions.height * 0.95, dimensions.depth * 0.05);
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, dimensions.height / 2, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(door);
    
    // Add handle
    addHandle(group, dimensions, 0, dimensions.height / 2, dimensions.width * 0.3);
  } else {
    // Double doors for medium and large cupboards
    const doorWidth = dimensions.width * 0.475;
    const doorGeometry = new THREE.BoxGeometry(doorWidth, dimensions.height * 0.95, dimensions.depth * 0.05);
    
    // Left door
    const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    leftDoor.position.set(-doorWidth / 2 - dimensions.width * 0.025, dimensions.height / 2, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(leftDoor);
    
    // Right door
    const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    rightDoor.position.set(doorWidth / 2 + dimensions.width * 0.025, dimensions.height / 2, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(rightDoor);
    
    // Add handles
    addHandle(group, dimensions, -doorWidth / 2 - dimensions.width * 0.025, dimensions.height / 2, dimensions.width * 0.15);
    addHandle(group, dimensions, doorWidth / 2 + dimensions.width * 0.025, dimensions.height / 2, -dimensions.width * 0.15);
  }
  
  // Add shelves inside
  const shelfThickness = dimensions.height * 0.02;
  const shelfGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, shelfThickness, dimensions.depth * 0.9);
  const shelfMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  
  // Number of shelves depends on size
  const shelfCount = selectedSize === 'small' ? 2 : selectedSize === 'medium' ? 3 : 4;
  
  for (let i = 1; i < shelfCount; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(0, dimensions.height * (i / shelfCount), 0);
    group.add(shelf);
  }
}

// Helper function to add handles to cupboards and cabinets
function addHandle(group, dimensions, x, y, offsetX) {
  const handleGeometry = new THREE.CylinderGeometry(dimensions.width * 0.01, dimensions.width * 0.01, dimensions.width * 0.1, 8);
  const handleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    roughness: 0.2,
    metalness: 0.8
  });
  
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(x + offsetX, y, dimensions.depth / 2 + dimensions.depth * 0.075);
  group.add(handle);
}

// Create washbasin model
function createWashbasinModel(group, dimensions) {
  // Create cabinet base
  const cabinetGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height * 0.7, dimensions.depth);
  const cabinetMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('Plywood') });
  const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
  cabinet.position.y = dimensions.height * 0.35;
  group.add(cabinet);
  
  // Create countertop
  const countertopGeometry = new THREE.BoxGeometry(dimensions.width * 1.05, dimensions.height * 0.05, dimensions.depth * 1.05);
  const countertopMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xEEEEEE,
    roughness: 0.3,
    metalness: 0.2
  });
  const countertop = new THREE.Mesh(countertopGeometry, countertopMaterial);
  countertop.position.y = dimensions.height * 0.725;
  group.add(countertop);
  
  // Create basin
  const basinWidth = dimensions.width * 0.7;
  const basinDepth = dimensions.depth * 0.6;
  const basinHeight = dimensions.height * 0.15;
  
  // Create basin with rounded edges using BufferGeometry
  const basinGeometry = new THREE.BoxGeometry(basinWidth, basinHeight, basinDepth, 1, 1, 1);
  const basinMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFFFFFF,
    roughness: 0.1,
    metalness: 0.3
  });
  const basin = new THREE.Mesh(basinGeometry, basinMaterial);
  basin.position.y = dimensions.height * 0.65;
  group.add(basin);
  
  // Create faucet base
  const faucetBaseGeometry = new THREE.CylinderGeometry(dimensions.width * 0.03, dimensions.width * 0.03, dimensions.height * 0.05, 16);
  const faucetMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xCCCCCC,
    roughness: 0.1,
    metalness: 0.9
  });
  const faucetBase = new THREE.Mesh(faucetBaseGeometry, faucetMaterial);
  faucetBase.position.set(0, dimensions.height * 0.775, dimensions.depth * 0.3);
  group.add(faucetBase);
  
  // Create faucet neck
  const faucetNeckGeometry = new THREE.CylinderGeometry(dimensions.width * 0.015, dimensions.width * 0.015, dimensions.height * 0.2, 16);
  const faucetNeck = new THREE.Mesh(faucetNeckGeometry, faucetMaterial);
  faucetNeck.rotation.x = Math.PI / 2;
  faucetNeck.position.set(0, dimensions.height * 0.85, dimensions.depth * 0.2);
  group.add(faucetNeck);
  
  // Create faucet spout
  const faucetSpoutGeometry = new THREE.CylinderGeometry(dimensions.width * 0.015, dimensions.width * 0.02, dimensions.height * 0.15, 16);
  const faucetSpout = new THREE.Mesh(faucetSpoutGeometry, faucetMaterial);
  faucetSpout.rotation.x = -Math.PI / 4;
  faucetSpout.position.set(0, dimensions.height * 0.9, dimensions.depth * 0.1);
  group.add(faucetSpout);
  
  // Create handles/knobs
  const knobGeometry = new THREE.CylinderGeometry(dimensions.width * 0.02, dimensions.width * 0.02, dimensions.height * 0.03, 16);
  
  // Hot water knob
  const hotKnob = new THREE.Mesh(knobGeometry, faucetMaterial);
  hotKnob.position.set(dimensions.width * 0.1, dimensions.height * 0.775, dimensions.depth * 0.3);
  group.add(hotKnob);
  
  // Cold water knob
  const coldKnob = new THREE.Mesh(knobGeometry, faucetMaterial);
  coldKnob.position.set(-dimensions.width * 0.1, dimensions.height * 0.775, dimensions.depth * 0.3);
  group.add(coldKnob);
  
  // Create cabinet doors
  if (selectedSize === 'small') {
    // Single door for small washbasin
    const doorGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, dimensions.height * 0.65, dimensions.depth * 0.05);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('MDF') });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, dimensions.height * 0.35, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(door);
    
    // Add handle
    addHandle(group, dimensions, 0, dimensions.height * 0.35, dimensions.width * 0.3);
  } else {
    // Double doors for medium and large washbasins
    const doorWidth = dimensions.width * 0.45;
    const doorGeometry = new THREE.BoxGeometry(doorWidth, dimensions.height * 0.65, dimensions.depth * 0.05);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: getWoodColor('MDF') });
    
    // Left door
    const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    leftDoor.position.set(-doorWidth / 2 - dimensions.width * 0.025, dimensions.height * 0.35, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(leftDoor);
    
    // Right door
    const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    rightDoor.position.set(doorWidth / 2 + dimensions.width * 0.025, dimensions.height * 0.35, dimensions.depth / 2 + dimensions.depth * 0.025);
    group.add(rightDoor);
    
    // Add handles
    addHandle(group, dimensions, -doorWidth / 2 - dimensions.width * 0.025, dimensions.height * 0.35, dimensions.width * 0.15);
    addHandle(group, dimensions, doorWidth / 2 + dimensions.width * 0.025, dimensions.height * 0.35, -dimensions.width * 0.15);
  }
  
  // For large washbasin, add a second basin
  if (selectedSize === 'large') {
    const secondBasin = basin.clone();
    secondBasin.position.x = dimensions.width * 0.3;
    group.add(secondBasin);
    
    const secondFaucetBase = faucetBase.clone();
    secondFaucetBase.position.x = dimensions.width * 0.3;
    group.add(secondFaucetBase);
    
    const secondFaucetNeck = faucetNeck.clone();
    secondFaucetNeck.position.x = dimensions.width * 0.3;
    group.add(secondFaucetNeck);
    
    const secondFaucetSpout = faucetSpout.clone();
    secondFaucetSpout.position.x = dimensions.width * 0.3;
    group.add(secondFaucetSpout);
    
    const secondHotKnob = hotKnob.clone();
    secondHotKnob.position.x = dimensions.width * 0.4;
    group.add(secondHotKnob);
    
    const secondColdKnob = coldKnob.clone();
    secondColdKnob.position.x = dimensions.width * 0.2;
    group.add(secondColdKnob);
  }
}

// Create cooker model
function createCookerModel(group, dimensions) {
  // Create main body
  const bodyGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height * 0.9, dimensions.depth);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xEEEEEE,
    roughness: 0.5,
    metalness: 0.3
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = dimensions.height * 0.45;
  group.add(body);
  
  // Create cooktop surface
  const cooktopGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height * 0.02, dimensions.depth);
  const cooktopMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    roughness: 0.8,
    metalness: 0.2
  });
  const cooktop = new THREE.Mesh(cooktopGeometry, cooktopMaterial);
  cooktop.position.y = dimensions.height * 0.91;
  group.add(cooktop);
  
  // Create burners based on size
  const burnerCount = selectedSize === 'small' ? 2 : selectedSize === 'medium' ? 4 : 5;
  const burnerRadius = dimensions.width * 0.06;
  const burnerGeometry = new THREE.CylinderGeometry(burnerRadius, burnerRadius, dimensions.height * 0.01, 16);
  const burnerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  
  if (burnerCount === 2) {
    // Two burners in a row
    for (let i = 0; i < 2; i++) {
      const burner = new THREE.Mesh(burnerGeometry, burnerMaterial);
      burner.position.set((i - 0.5) * dimensions.width * 0.4, dimensions.height * 0.92, 0);
      group.add(burner);
    }
  } else if (burnerCount === 4) {
    // Four burners in a 2x2 grid
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const burner = new THREE.Mesh(burnerGeometry, burnerMaterial);
        burner.position.set(
          (i - 0.5) * dimensions.width * 0.4,
          dimensions.height * 0.92,
          (j - 0.5) * dimensions.depth * 0.4
        );
        group.add(burner);
      }
    }
  } else if (burnerCount === 5) {
    // Five burners in a custom arrangement
    const positions = [
      { x: 0, z: 0 }, // Center
      { x: -dimensions.width * 0.3, z: -dimensions.depth * 0.3 }, // Top left
      { x: dimensions.width * 0.3, z: -dimensions.depth * 0.3 }, // Top right
      { x: -dimensions.width * 0.3, z: dimensions.depth * 0.3 }, // Bottom left
      { x: dimensions.width * 0.3, z: dimensions.depth * 0.3 } // Bottom right
    ];
    
    positions.forEach(pos => {
      const burner = new THREE.Mesh(burnerGeometry, burnerMaterial);
      burner.position.set(pos.x, dimensions.height * 0.92, pos.z);
      group.add(burner);
    });
  }
  
  // Create control knobs
  const knobRadius = dimensions.width * 0.03;
  const knobGeometry = new THREE.CylinderGeometry(knobRadius, knobRadius, dimensions.height * 0.02, 16);
  const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  
  for (let i = 0; i < burnerCount; i++) {
    const knob = new THREE.Mesh(knobGeometry, knobMaterial);
    knob.position.set(
      (i - (burnerCount - 1) / 2) * dimensions.width * 0.15,
      dimensions.height * 0.85,
      dimensions.depth * 0.45
    );
    knob.rotation.x = Math.PI / 2;
    group.add(knob);
  }
  
  // For large cooker, add an oven
  if (selectedSize === 'large') {
    // Oven door
    const ovenDoorGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, dimensions.height * 0.4, dimensions.depth * 0.05);
    const ovenDoorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.3
    });
    const ovenDoor = new THREE.Mesh(ovenDoorGeometry, ovenDoorMaterial);
    ovenDoor.position.set(0, dimensions.height * 0.3, dimensions.depth / 2 - dimensions.depth * 0.025);
    group.add(ovenDoor);
    
    // Oven window
    const ovenWindowGeometry = new THREE.BoxGeometry(dimensions.width * 0.6, dimensions.height * 0.25, dimensions.depth * 0.01);
    const ovenWindowMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.7
    });
    const ovenWindow = new THREE.Mesh(ovenWindowGeometry, ovenWindowMaterial);
    ovenWindow.position.set(0, dimensions.height * 0.3, dimensions.depth / 2);
    group.add(ovenWindow);
    
    // Oven handle
    const ovenHandleGeometry = new THREE.BoxGeometry(dimensions.width * 0.7, dimensions.height * 0.03, dimensions.depth * 0.03);
    const ovenHandleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x999999,
      roughness: 0.2,
      metalness: 0.8
    });
    const ovenHandle = new THREE.Mesh(ovenHandleGeometry, ovenHandleMaterial);
    ovenHandle.position.set(0, dimensions.height * 0.15, dimensions.depth / 2 + dimensions.depth * 0.03);
    group.add(ovenHandle);
  }
}
