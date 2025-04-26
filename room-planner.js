document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const subscriptionOverlay = document.getElementById('subscription-overlay');
    const previewModeBtn = document.getElementById('preview-mode-btn');
    const roomCanvas = document.getElementById('room-canvas');
    const saveRoomBtn = document.getElementById('save-room-btn');
    const shareRoomBtn = document.getElementById('share-room-btn');
    const exportRoomBtn = document.getElementById('export-room-btn');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const furnitureItems = document.querySelectorAll('.furniture-item');
    const materialItems = document.querySelectorAll('.material-item');
    const roomSizeModal = document.getElementById('room-size-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeRoomModalBtn = document.getElementById('close-room-modal');
    const cancelRoomSizeBtn = document.getElementById('cancel-room-size');
    const roomSizeForm = document.getElementById('room-size-form');
    const togglePropertiesBtn = document.getElementById('toggle-properties');
    const noSelectionDiv = document.getElementById('no-selection');
    const itemPropertiesDiv = document.getElementById('item-properties');
    const applyPropertiesBtn = document.getElementById('apply-properties');
    const deleteItemBtn = document.getElementById('delete-item');
    
    // Control buttons
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const topViewBtn = document.getElementById('top-view');
    const frontViewBtn = document.getElementById('front-view');
    const resetViewBtn = document.getElementById('reset-view');
    
    // Three.js variables
    let scene, camera, renderer, controls;
    let room, floor, walls = [];
    let selectedObject = null;
    let furnitureModels = {};
    let isPreviewMode = false;
    
    // Room dimensions
    let roomWidth = 500;
    let roomLength = 400;
    let roomHeight = 280;
    
    // Initialize preview mode (limited functionality)
    initPreviewMode();
    
    // Event Listeners
    
    // Preview Mode Button
    if (previewModeBtn) {
        previewModeBtn.addEventListener('click', function() {
            isPreviewMode = true;
            subscriptionOverlay.style.display = 'none';
            initThreeJS();
            createRoom();
            
            // Show preview mode limitations
            setTimeout(function() {
                alert('You are in Preview Mode. Some features are limited. Upgrade to Premium for full access.');
            }, 1000);
        });
    }
    
    // Tool Buttons
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isPreviewMode && this.getAttribute('data-tool') !== 'room-size') {
                showUpgradePrompt('Advanced tools');
                return;
            }
            
            // Remove active class from all tool buttons
            toolButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle specific tool actions
            const tool = this.getAttribute('data-tool');
            handleToolAction(tool);
        });
    });
    
    // Category Buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all category buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter furniture items
            const category = this.getAttribute('data-category');
            filterFurnitureItems(category);
        });
    });
    
    // Furniture Items
    furnitureItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isPreviewMode && furnitureModels && Object.keys(furnitureModels).length >= 3) {
                showUpgradePrompt('Adding more than 3 furniture items');
                return;
            }
            
            const furnitureType = this.getAttribute('data-type');
            addFurniture(furnitureType);
        });
    });
    
    // Material Items
    materialItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isPreviewMode) {
                showUpgradePrompt('Custom materials');
                return;
            }
            
            const materialType = this.getAttribute('data-material');
            applyMaterial(materialType, this.querySelector('.material-preview').style.backgroundImage);
        });
    });
    
    // Room Size Modal
    if (closeRoomModalBtn) {
        closeRoomModalBtn.addEventListener('click', closeRoomSizeModal);
    }
    
    if (cancelRoomSizeBtn) {
        cancelRoomSizeBtn.addEventListener('click', closeRoomSizeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeRoomSizeModal);
    }
    
    // Room Size Form
    if (roomSizeForm) {
        roomSizeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            roomWidth = parseInt(document.getElementById('room-width').value);
            roomLength = parseInt(document.getElementById('room-length').value);
            roomHeight = parseInt(document.getElementById('room-height').value);
            
            // Update room
            updateRoomSize();
            
            // Close modal
            closeRoomSizeModal();
        });
    }
    
    // Properties Panel Toggle
    if (togglePropertiesBtn) {
        togglePropertiesBtn.addEventListener('click', function() {
            const propertiesPanel = this.closest('.properties-panel');
            propertiesPanel.classList.toggle('collapsed');
            
            // Update icon
            const icon = this.querySelector('i');
            if (propertiesPanel.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-left';
            } else {
                icon.className = 'fas fa-chevron-right';
            }
        });
    }
    
    // Apply Properties Button
    if (applyPropertiesBtn) {
        applyPropertiesBtn.addEventListener('click', function() {
            if (isPreviewMode) {
                showUpgradePrompt('Editing properties');
                return;
            }
            
            if (selectedObject) {
                updateObjectProperties();
            }
        });
    }
    
    // Delete Item Button
    if (deleteItemBtn) {
        deleteItemBtn.addEventListener('click', function() {
            if (selectedObject) {
                deleteSelectedObject();
            }
        });
    }
    
    // Control Buttons
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (controls) {
                controls.dollyIn(1.2);
                controls.update();
            }
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (controls) {
                controls.dollyOut(1.2);
                controls.update();
            }
        });
    }
    
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', function() {
            if (controls) {
                controls.rotateLeft(Math.PI / 8);
                controls.update();
            }
        });
    }
    
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', function() {
            if (controls) {
                controls.rotateRight(Math.PI / 8);
                controls.update();
            }
        });
    }
    
    if (topViewBtn) {
        topViewBtn.addEventListener('click', function() {
            if (camera) {
                camera.position.set(0, roomHeight * 2, 0);
                camera.lookAt(0, 0, 0);
                controls.update();
            }
        });
    }
    
    if (frontViewBtn) {
        frontViewBtn.addEventListener('click', function() {
            if (camera) {
                camera.position.set(0, roomHeight / 2, roomLength * 1.5);
                camera.lookAt(0, roomHeight / 2, 0);
                controls.update();
            }
        });
    }
    
    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', function() {
            if (camera && controls) {
                camera.position.set(roomWidth, roomHeight, roomLength);
                camera.lookAt(0, 0, 0);
                controls.update();
            }
        });
    }
    
    // Action Buttons
    if (saveRoomBtn) {
        saveRoomBtn.addEventListener('click', function() {
            if (isPreviewMode) {
                showUpgradePrompt('Saving room designs');
                return;
            }
            
            saveRoom();
        });
    }
    
    if (shareRoomBtn) {
        shareRoomBtn.addEventListener('click', function() {
            if (isPreviewMode) {
                showUpgradePrompt('Sharing room designs');
                return;
            }
            
            shareRoom();
        });
    }
    
    if (exportRoomBtn) {
        exportRoomBtn.addEventListener('click', function() {
            if (isPreviewMode) {
                showUpgradePrompt('Exporting room designs');
                return;
            }
            
            exportRoom();
        });
    }
    
    // Functions
    
    // Initialize Preview Mode
    function initPreviewMode() {
        // In a real app, this would check if the user has a premium subscription
        // For demo purposes, we'll always show the overlay
        subscriptionOverlay.style.display = 'flex';
    }
    
    // Show upgrade prompt
    function showUpgradePrompt(feature) {
        alert(`${feature} are only available in the Premium plan. Please upgrade to access this feature.`);
    }
    
    // Initialize Three.js
    function initThreeJS() {
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        
        // Create camera
        camera = new THREE.PerspectiveCamera(
            45, 
            roomCanvas.clientWidth / roomCanvas.clientHeight, 
            0.1, 
            2000
        );
        camera.position.set(roomWidth, roomHeight, roomLength);
        camera.lookAt(0, 0, 0);
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(roomCanvas.clientWidth, roomCanvas.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Add renderer to canvas container
        roomCanvas.innerHTML = '';
        roomCanvas.appendChild(renderer.domElement);
        
        // Create controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
        
        // Add lights
        addLights();
        
        // Add event listeners
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('click', onCanvasClick);
        
        // Start animation loop
        animate();
    }
    
    // Add lights to the scene
    function addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(roomWidth, roomHeight * 1.5, roomLength);
        directionalLight.castShadow = true;
        
        // Set up shadow properties
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 3000;
        directionalLight.shadow.camera.left = -roomWidth;
        directionalLight.shadow.camera.right = roomWidth;
        directionalLight.shadow.camera.top = roomLength;
        directionalLight.shadow.camera.bottom = -roomLength;
        
        scene.add(directionalLight);
        
        // Add fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-roomWidth, roomHeight, -roomLength);
        scene.add(fillLight);
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    function onWindowResize() {
        camera.aspect = roomCanvas.clientWidth / roomCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(roomCanvas.clientWidth, roomCanvas.clientHeight);
    }
    
    // Create room
    function createRoom() {
        // Create room group
        room = new THREE.Group();
        scene.add(room);
        
        // Create floor
        const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomLength);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xdddddd,
            roughness: 0.8,
            metalness: 0.2
        });
        floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;
        room.add(floor);
        
        // Create walls
        createWalls();
        
        // Add grid helper
        const gridHelper = new THREE.GridHelper(Math.max(roomWidth, roomLength), 20);
        gridHelper.position.y = 0.1;
        room.add(gridHelper);
    }
    
    // Create walls
    function createWalls() {
        // Clear existing walls
        walls.forEach(wall => room.remove(wall));
        walls = [];
        
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            roughness: 0.9,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        
        // Back wall
        const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, roomHeight / 2, -roomLength / 2);
        backWall.receiveShadow = true;
        room.add(backWall);
        walls.push(backWall);
        
        // Left wall
        const leftWallGeometry = new THREE.PlaneGeometry(roomLength, roomHeight);
        const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.receiveShadow = true;
        room.add(leftWall);
        walls.push(leftWall);
        
        // Right wall
        const rightWallGeometry = new THREE.PlaneGeometry(roomLength, roomHeight);
        const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
        rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.receiveShadow = true;
        room.add(rightWall);
        walls.push(rightWall);
    }
    
    // Update room size
    function updateRoomSize() {
        if (!room) return;
        
        // Update floor
        floor.geometry.dispose();
        floor.geometry = new THREE.PlaneGeometry(roomWidth, roomLength);
        
        // Update walls
        createWalls();
        
        // Update camera and controls
        camera.position.set(roomWidth, roomHeight, roomLength);
        camera.lookAt(0, 0, 0);
        controls.update();
        
        // Update room info
        document.querySelector('.info-value').textContent = `${roomWidth} × ${roomLength} cm`;
    }
    
    // Handle tool action
    function handleToolAction(tool) {
        switch(tool) {
            case 'room-size':
                openRoomSizeModal();
                break;
            case 'wall':
                // In a real app, this would activate wall drawing mode
                break;
            case 'door':
                // In a real app, this would activate door placement mode
                break;
            case 'window':
                // In a real app, this would activate window placement mode
                break;
            case 'ceiling-light':
            case 'wall-light':
            case 'floor-lamp':
            case 'ambient-light':
                if (isPreviewMode) {
                    showUpgradePrompt('Advanced lighting options');
                    return;
                }
                // In a real app, this would handle lighting placement
                break;
        }
    }
    
    // Open room size modal
    function openRoomSizeModal() {
        document.getElementById('room-width').value = roomWidth;
        document.getElementById('room-length').value = roomLength;
        document.getElementById('room-height').value = roomHeight;
        
        roomSizeModal.classList.add('active');
        modalOverlay.classList.add('active');
    }
    
    // Close room size modal
    function closeRoomSizeModal() {
        roomSizeModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }
    
    // Filter furniture items
    function filterFurnitureItems(category) {
        furnitureItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add furniture to the scene
    function addFurniture(furnitureType) {
        // Create furniture based on type
        let furniture;
        
        switch(furnitureType) {
            case 'sofa':
                furniture = createSofa();
                break;
            case 'coffee-table':
                furniture = createCoffeeTable();
                break;
            case 'tv-stand':
                furniture = createTVStand();
                break;
            case 'bed':
                furniture = createBed();
                break;
            case 'wardrobe':
                furniture = createWardrobe();
                break;
            case 'nightstand':
                furniture = createNightstand();
                break;
            case 'desk':
                furniture = createDesk();
                break;
            case 'office-chair':
                furniture = createOfficeChair();
                break;
            case 'bookcase':
                furniture = createBookcase();
                break;
            default:
                // Create a default box
                const geometry = new THREE.BoxGeometry(50, 50, 50);
                const material = new THREE.MeshStandardMaterial({ color: 0x3d8b40 });
                furniture = new THREE.Mesh(geometry, material);
                furniture.position.y = 25;
        }
        
        // Set properties
        furniture.castShadow = true;
        furniture.receiveShadow = true;
        furniture.userData.type = furnitureType;
        furniture.userData.name = furnitureType.replace('-', ' ');
        
        // Generate a unique ID
        const id = 'furniture_' + Date.now();
        furniture.userData.id = id;
        
        // Add to scene
        scene.add(furniture);
        
        // Store in furniture models
        furnitureModels[id] = furniture;
        
        // Select the new furniture
        selectObject(furniture);
        
        // Update item count
        updateItemCount();
        
        return furniture;
    }
    
    // Create a sofa
    function createSofa() {
        const sofa = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.BoxGeometry(200, 40, 85);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3d8b40 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 20;
        sofa.add(base);
        
        // Back
        const backGeometry = new THREE.BoxGeometry(200, 40, 15);
        const back = new THREE.Mesh(backGeometry, baseMaterial);
        back.position.set(0, 40, -35);
        sofa.add(back);
        
        // Arms
        const armGeometry = new THREE.BoxGeometry(15, 40, 85);
        
        const leftArm = new THREE.Mesh(armGeometry, baseMaterial);
        leftArm.position.set(-92.5, 40, 0);
        sofa.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, baseMaterial);
        rightArm.position.set(92.5, 40, 0);
        sofa.add(rightArm);
        
        // Position the sofa
        sofa.position.set(0, 0, 0);
        
        return sofa;
    }
    
    // Create a coffee table
    function createCoffeeTable() {
        const table = new THREE.Group();
        
        // Table top
        const topGeometry = new THREE.BoxGeometry(120, 5, 60);
        const topMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 40;
        table.add(top);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(5, 40, 5);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        
        const leg1 = new THREE.Mesh(legGeometry, legMaterial);
        leg1.position.set(-55, 20, -25);
        table.add(leg1);
        
        const leg2 = new THREE.Mesh(legGeometry, legMaterial);
        leg2.position.set(-55, 20, 25);
        table.add(leg2);
        
        const leg3 = new THREE.Mesh(legGeometry, legMaterial);
        leg3.position.set(55, 20, -25);
        table.add(leg3);
        
        const leg4 = new THREE.Mesh(legGeometry, legMaterial);
        leg4.position.set(55, 20, 25);
        table.add(leg4);
        
        // Position the table
        table.position.set(0, 0, 0);
        
        return table;
    }
    
    // Create a TV stand
    function createTVStand() {
        const stand = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(150, 50, 40);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 25;
        stand.add(body);
        
        // Shelves
        const shelfGeometry = new THREE.BoxGeometry(140, 2, 35);
        const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        
        const shelf1 = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf1.position.y = 15;
        stand.add(shelf1);
        
        const shelf2 = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf2.position.y = 35;
        stand.add(shelf2);
        
        // Position the stand
        stand.position.set(0, 0, 0);
        
        return stand;
    }
    
    // Create a bed
    function createBed() {
        const bed = new THREE.Group();
        
        // Base/frame
        const frameGeometry = new THREE.BoxGeometry(160, 20, 200);
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.y = 10;
        bed.add(frame);
        
        // Mattress
        const mattressGeometry = new THREE.BoxGeometry(150, 20, 190);
        const mattressMaterial = new THREE.MeshStandardMaterial({ color: 0xEEEEEE });
        const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
        mattress.position.y = 30;
        bed.add(mattress);
        
        // Headboard
        const headboardGeometry = new THREE.BoxGeometry(160, 60, 10);
        const headboard = new THREE.Mesh(headboardGeometry, frameMaterial);
        headboard.position.set(0, 40, -95);
        bed.add(headboard);
        
        // Position the bed
        bed.position.set(0, 0, 0);
        
        return bed;
    }
    
    // Create a wardrobe
    function createWardrobe() {
        const wardrobe = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(120, 200, 60);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 100;
        wardrobe.add(body);
        
        // Doors
        const doorGeometry = new THREE.BoxGeometry(58, 190, 2);
        const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x9C6B30 });
        
        const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
        leftDoor.position.set(-30, 100, 30);
        wardrobe.add(leftDoor);
        
        const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
        rightDoor.position.set(30, 100, 30);
        wardrobe.add(rightDoor);
        
        // Handles
        const handleGeometry = new THREE.BoxGeometry(2, 10, 2);
        const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
        
        const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
        leftHandle.position.set(-5, 100, 31);
        wardrobe.add(leftHandle);
        
        const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
        rightHandle.position.set(5, 100, 31);
        wardrobe.add(rightHandle);
        
        // Position the wardrobe
        wardrobe.position.set(0, 0, 0);
        
        return wardrobe;
    }
    
    // Create a nightstand
    function createNightstand() {
        const nightstand = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(50, 50, 40);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 25;
        nightstand.add(body);
        
        // Drawer
        const drawerGeometry = new THREE.BoxGeometry(45, 15, 2);
        const drawerMaterial = new THREE.MeshStandardMaterial({ color: 0x9C6B30 });
        const drawer = new THREE.Mesh(drawerGeometry, drawerMaterial);
        drawer.position.set(0, 25, 20);
        nightstand.add(drawer);
        
        // Handle
        const handleGeometry = new THREE.BoxGeometry(10, 2, 2);
        const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(0, 25, 21);
        nightstand.add(handle);
        
        // Position the nightstand
        nightstand.position.set(0, 0, 0);
        
        return nightstand;
    }
    
    // Create a desk
    function createDesk() {
        const desk = new THREE.Group();
        
        // Desktop
        const topGeometry = new THREE.BoxGeometry(140, 5, 70);
        const topMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 75;
        desk.add(top);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(5, 75, 5);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        
        const leg1 = new THREE.Mesh(legGeometry, legMaterial);
        leg1.position.set(-65, 37.5, -30);
        desk.add(leg1);
        
        const leg2 = new THREE.Mesh(legGeometry, legMaterial);
        leg2.position.set(-65, 37.5, 30);
        desk.add(leg2);
        
        const leg3 = new THREE.Mesh(legGeometry, legMaterial);
        leg3.position.set(65, 37.5, -30);
        desk.add(leg3);
        
        const leg4 = new THREE.Mesh(legGeometry, legMaterial);
        leg4.position.set(65, 37.5, 30);
        desk.add(leg4);
        
        // Drawer unit
        const drawerUnitGeometry = new THREE.BoxGeometry(40, 40, 60);
        const drawerUnitMaterial = new THREE.MeshStandardMaterial({ color: 0x9C6B30 });
        const drawerUnit = new THREE.Mesh(drawerUnitGeometry, drawerUnitMaterial);
        drawerUnit.position.set(-45, 45, 0);
        desk.add(drawerUnit);
        
        // Position the desk
        desk.position.set(0, 0, 0);
        
        return desk;
    }
    
    // Create an office chair
    function createOfficeChair() {
        const chair = new THREE.Group();
        
        // Seat
        const seatGeometry = new THREE.BoxGeometry(50, 10, 50);
        const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.y = 45;
        chair.add(seat);
        
        // Back
        const backGeometry = new THREE.BoxGeometry(50, 60, 10);
        const back = new THREE.Mesh(backGeometry, seatMaterial);
        back.position.set(0, 80, -20);
        chair.add(back);
        
        // Base
        const baseGeometry = new THREE.CylinderGeometry(25, 25, 5, 16);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 5;
        chair.add(base);
        
        // Pole
        const poleGeometry = new THREE.CylinderGeometry(3, 3, 40, 8);
        const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.y = 25;
        chair.add(pole);
        
        // Wheels
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const wheelGeometry = new THREE.SphereGeometry(3, 8, 8);
            const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(Math.cos(angle) * 20, 3, Math.sin(angle) * 20);
            chair.add(wheel);
        }
        
        // Position the chair
        chair.position.set(0, 0, 0);
        
        return chair;
    }
    
    // Create a bookcase
    function createBookcase() {
        const bookcase = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(100, 180, 30);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 90;
        bookcase.add(body);
        
        // Shelves
        const shelfGeometry = new THREE.BoxGeometry(90, 2, 28);
        const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x9C6B30 });
        
        // Add 5 shelves
        for (let i = 0; i < 5; i++) {
            const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
            shelf.position.set(0, 20 + i * 40, 0);
            bookcase.add(shelf);
        }
        
        // Position the bookcase
        bookcase.position.set(0, 0, 0);
        
        return bookcase;
    }
    
    // Apply material to room elements
    function applyMaterial(materialType, textureUrl) {
        // Extract the URL from the background-image style
        const urlMatch = textureUrl.match(/url\(['"]?([^'")]+)['"]?\)/);
        if (!urlMatch) return;
        
        const url = urlMatch[1];
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(url);
        
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        if (materialType === 'floor') {
            // Apply to floor
            texture.repeat.set(5, 5);
            const material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.8,
                metalness: 0.2
            });
            floor.material = material;
        } else if (materialType === 'wall') {
            // Apply to walls
            texture.repeat.set(3, 2);
            const material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.9,
                metalness: 0.1,
                side: THREE.DoubleSide
            });
            walls.forEach(wall => wall.material = material);
        }
    }
    
    // Canvas click handler
    function onCanvasClick(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera);
        
        // Get objects intersecting the ray
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            // Find the first furniture item that was clicked
            for (let i = 0; i < intersects.length; i++) {
                let object = intersects[i].object;
                
                // Traverse up to find the parent with userData
                while (object && !object.userData.type) {
                    object = object.parent;
                }
                
                if (object && object.userData.type) {
                    selectObject(object);
                    return;
                }
            }
            
            // If we get here, no furniture was clicked, deselect
            deselectObject();
        } else {
            // Nothing was clicked, deselect
            deselectObject();
        }
    }
    
    // Select an object
    function selectObject(object) {
        // Deselect previous object
        deselectObject();
        
        // Set new selected object
        selectedObject = object;
        
        // Add a highlight effect
        const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.BackSide });
        const outlineGeometry = object.geometry ? object.geometry.clone() : new THREE.BoxGeometry(1, 1, 1);
        
        // Create outline mesh for group objects
        if (!object.geometry) {
            // For group objects, create a bounding box
            const box = new THREE.Box3().setFromObject(object);
            const size = box.getSize(new THREE.Vector3());
            outlineGeometry.dispose(); // Dispose the default geometry
            const newGeometry = new THREE.BoxGeometry(size.x + 5, size.y + 5, size.z + 5);
            object.outline = new THREE.Mesh(newGeometry, outlineMaterial);
            object.outline.position.copy(object.position);
            object.outline.rotation.copy(object.rotation);
            object.outline.scale.copy(object.scale);
        } else {
            // For regular meshes
            object.outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
            object.outline.position.copy(object.position);
            object.outline.rotation.copy(object.rotation);
            object.outline.scale.multiplyScalar(1.05);
        }
        
        scene.add(object.outline);
        
        // Update properties panel
        updatePropertiesPanel(object);
    }
    
    // Deselect the current object
    function deselectObject() {
        if (selectedObject && selectedObject.outline) {
            scene.remove(selectedObject.outline);
            selectedObject.outline.geometry.dispose();
            selectedObject.outline.material.dispose();
            selectedObject.outline = null;
        }
        
        selectedObject = null;
        
        // Hide properties panel content
        noSelectionDiv.style.display = 'block';
        itemPropertiesDiv.style.display = 'none';
    }
    
    // Update properties panel with object data
    function updatePropertiesPanel(object) {
        // Show properties panel content
        noSelectionDiv.style.display = 'none';
        itemPropertiesDiv.style.display = 'block';
        
        // Get object properties
        const name = object.userData.name || 'Unknown';
        
        // Get dimensions
        let width, depth, height;
        if (object.geometry) {
            // For simple meshes
            const size = new THREE.Vector3();
            new THREE.Box3().setFromObject(object).getSize(size);
            width = Math.round(size.x);
            depth = Math.round(size.z);
            height = Math.round(size.y);
        } else {
            // For group objects, use bounding box
            const size = new THREE.Vector3();
            new THREE.Box3().setFromObject(object).getSize(size);
            width = Math.round(size.x);
            depth = Math.round(size.z);
            height = Math.round(size.y);
        }
        
        // Get position
        const x = Math.round(object.position.x);
        const z = Math.round(object.position.z);
        
        // Get rotation
        const rotation = Math.round((object.rotation.y * 180 / Math.PI) % 360);
        
        // Get material color
        let color = '#3D8B40';
        if (object.material) {
            color = '#' + object.material.color.getHexString();
        } else if (object.children && object.children.length > 0 && object.children[0].material) {
            color = '#' + object.children[0].material.color.getHexString();
        }
        
        // Update form fields
        document.getElementById('item-name').value = name;
        document.getElementById('item-width').value = width;
        document.getElementById('item-depth').value = depth;
        document.getElementById('item-height').value = height;
        document.getElementById('item-x').value = x;
        document.getElementById('item-z').value = z;
        document.getElementById('item-rotation').value = rotation;
        document.getElementById('item-color').value = color;
    }
    
    // Update object properties from form
    function updateObjectProperties() {
        if (!selectedObject) return;
        
        // Get form values
        const name = document.getElementById('item-name').value;
        const width = parseFloat(document.getElementById('item-width').value);
        const depth = parseFloat(document.getElementById('item-depth').value);
        const height = parseFloat(document.getElementById('item-height').value);
        const x = parseFloat(document.getElementById('item-x').value);
        const z = parseFloat(document.getElementById('item-z').value);
        const rotation = parseFloat(document.getElementById('item-rotation').value);
        const color = document.getElementById('item-color').value;
        const material = document.getElementById('item-material').value;
        
        // Update object name
        selectedObject.userData.name = name;
        
        // Update position
        selectedObject.position.x = x;
        selectedObject.position.z = z;
        
        // Update rotation
        selectedObject.rotation.y = rotation * Math.PI / 180;
        
        // Update color
        const newColor = new THREE.Color(color);
        if (selectedObject.material) {
            selectedObject.material.color = newColor;
        } else if (selectedObject.children) {
            // For group objects, update all children
            selectedObject.traverse(child => {
                if (child.material) {
                    child.material.color = newColor;
                }
            });
        }
        
        // Update outline position
        if (selectedObject.outline) {
            selectedObject.outline.position.copy(selectedObject.position);
            selectedObject.outline.rotation.copy(selectedObject.rotation);
        }
    }
    
    // Delete selected object
    function deleteSelectedObject() {
        if (!selectedObject) return;
        
        // Remove from scene
        scene.remove(selectedObject);
        
        // Remove from furniture models
        if (selectedObject.userData.id) {
            delete furnitureModels[selectedObject.userData.id];
        }
        
        // Deselect
        deselectObject();
        
        // Update item count
        updateItemCount();
    }
    
    // Update item count in room info
    function updateItemCount() {
        const count = Object.keys(furnitureModels).length;
        document.querySelectorAll('.info-item .info-value')[1].textContent = count;
    }
    
    // Save room design
    function saveRoom() {
        if (isPreviewMode) {
            showUpgradePrompt('Saving room designs');
            return;
        }
        
        // In a real app, this would save the room design to a server or local storage
        alert('Room design saved successfully! (Premium Feature)');
    }
    
    // Share room design
    function shareRoom() {
        if (isPreviewMode) {
            showUpgradePrompt('Sharing room designs');
            return;
        }
        
        // In a real app, this would generate a shareable link or open a share dialog
        alert('Room design ready to share! (Premium Feature)');
    }
    
    // Export room design
    function exportRoom() {
        if (isPreviewMode) {
            showUpgradePrompt('Exporting room designs');
            return;
        }
        
        // In a real app, this would export the room design to a file format like PDF or CAD
        alert('Room design exported successfully! (Premium Feature)');
    }
});

