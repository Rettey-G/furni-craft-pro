document.addEventListener('DOMContentLoaded', function() {
    // State management
    const state = {
        currentStep: 'location',
        selectedLocation: null,
        selectedFurniture: null,
        selectedSize: null,
        customSize: {
            width: null,
            depth: null,
            height: null
        },
        selectedMaterials: {
            primary: null,
            finish: null,
            hardware: null
        }
    };
    
    // DOM Elements
    const progressSteps = document.querySelectorAll('.progress-step');
    const sections = document.querySelectorAll('.selection-section');
    
    // Location Section
    const locationCards = document.querySelectorAll('.location-card');
    const nextToFurnitureBtn = document.getElementById('next-to-furniture');

    // Ensure all location links work
    locationCards.forEach(card => {
        const location = card.getAttribute('data-location');
        if (location && location !== 'office') {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                state.selectedLocation = location;
                goToStep('furniture');
                loadFurnitureOptions(location);
            });
        }
        // Office will use the normal link navigation
    });
    
    // Furniture Section
    const furnitureGrid = document.getElementById('furniture-grid');
    const selectedLocationText = document.getElementById('selected-location-text');
    const backToLocationBtn = document.getElementById('back-to-location');
    const nextToSizeBtn = document.getElementById('next-to-size');
    
    // Size Section
    const sizeOptions = document.getElementById('size-options');
    const selectedFurnitureText = document.getElementById('selected-furniture-text');
    const customWidthInput = document.getElementById('custom-width');
    const customDepthInput = document.getElementById('custom-depth');
    const customHeightInput = document.getElementById('custom-height');
    const applyCustomSizeBtn = document.getElementById('apply-custom-size');
    const backToFurnitureBtn = document.getElementById('back-to-furniture');
    const nextToMaterialsBtn = document.getElementById('next-to-materials');
    
    // Materials Section
    const primaryMaterials = document.getElementById('primary-materials');
    const finishOptions = document.getElementById('finish-options');
    const hardwareOptions = document.getElementById('hardware-options');
    const backToSizeBtn = document.getElementById('back-to-size');
    const nextToSummaryBtn = document.getElementById('next-to-summary');
    
    // Summary Section
    const furniturePreview = document.getElementById('furniture-preview');
    const summaryLocation = document.getElementById('summary-location');
    const summaryFurniture = document.getElementById('summary-furniture');
    const summarySize = document.getElementById('summary-size');
    const summaryMaterial = document.getElementById('summary-material');
    const summaryFinish = document.getElementById('summary-finish');
    const summaryHardware = document.getElementById('summary-hardware');
    const materialsList = document.getElementById('materials-list');
    const priceEstimate = document.getElementById('price-estimate');
    const backToMaterialsBtn = document.getElementById('back-to-materials');
    const addToRoomBtn = document.getElementById('add-to-room');
    const viewIn3dBtn = document.getElementById('view-in-3d');
    
    // Control buttons
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetViewBtn = document.getElementById('reset-view');
    
    // Three.js variables
    let scene, camera, renderer, controls;
    let furnitureModel = null;
    
    // Data
    const furnitureData = {
        'living-room': [
            { id: 'sofa', name: 'Sofa', image: 'assets/furniture/sofa.jpg', description: 'Comfortable seating for your living room.' },
            { id: 'coffee-table', name: 'Coffee Table', image: 'assets/furniture/coffee-table.jpg', description: 'Stylish table for your living space.' },
            { id: 'tv-stand', name: 'TV Stand', image: 'assets/furniture/tv-stand.jpg', description: 'Modern storage for your entertainment system.' },
            { id: 'bookshelf', name: 'Bookshelf', image: 'assets/furniture/bookshelf.jpg', description: 'Display your books and decorative items.' }
        ],
        'bedroom': [
            { id: 'bed', name: 'Bed', image: 'assets/furniture/bed.jpg', description: 'Comfortable bed for a good night\'s sleep.' },
            { id: 'wardrobe', name: 'Wardrobe', image: 'assets/furniture/wardrobe.jpg', description: 'Spacious storage for your clothes.' },
            { id: 'dresser', name: 'Dresser', image: 'assets/furniture/dresser.jpg', description: 'Elegant storage with mirror.' },
            { id: 'nightstand', name: 'Nightstand', image: 'assets/furniture/nightstand.jpg', description: 'Convenient bedside table.' }
        ],
        'dining-room': [
            { id: 'dining-table', name: 'Dining Table', image: 'assets/furniture/dining-table.jpg', description: 'Elegant table for family meals.' },
            { id: 'dining-chair', name: 'Dining Chair', image: 'assets/furniture/dining-chair.jpg', description: 'Comfortable seating for dining.' },
            { id: 'buffet', name: 'Buffet', image: 'assets/furniture/buffet.jpg', description: 'Storage for your dining essentials.' },
            { id: 'china-cabinet', name: 'China Cabinet', image: 'assets/furniture/china-cabinet.jpg', description: 'Display your fine china and glassware.' }
        ],
        'office': [
            { id: 'desk', name: 'Desk', image: 'assets/furniture/desk.jpg', description: 'Spacious workspace for productivity.' },
            { id: 'office-chair', name: 'Office Chair', image: 'assets/furniture/office-chair.jpg', description: 'Ergonomic seating for long work hours.' },
            { id: 'filing-cabinet', name: 'Filing Cabinet', image: 'assets/furniture/filing-cabinet.jpg', description: 'Organized storage for documents.' },
            { id: 'bookcase', name: 'Bookcase', image: 'assets/furniture/bookcase.jpg', description: 'Store and display your books and files.' }
        ],
        'kitchen': [
            { id: 'kitchen-island', name: 'Kitchen Island', image: 'assets/furniture/kitchen-island.jpg', description: 'Additional workspace and storage.' },
            { id: 'bar-stool', name: 'Bar Stool', image: 'assets/furniture/bar-stool.jpg', description: 'Casual seating for your kitchen.' },
            { id: 'pantry', name: 'Pantry', image: 'assets/furniture/pantry.jpg', description: 'Storage for your food and supplies.' },
            { id: 'kitchen-cart', name: 'Kitchen Cart', image: 'assets/furniture/kitchen-cart.jpg', description: 'Mobile storage and workspace.' }
        ],
        'outdoor': [
            { id: 'patio-table', name: 'Patio Table', image: 'assets/furniture/patio-table.jpg', description: 'Durable table for outdoor dining.' },
            { id: 'patio-chair', name: 'Patio Chair', image: 'assets/furniture/patio-chair.jpg', description: 'Weather-resistant seating.' },
            { id: 'lounge-chair', name: 'Lounge Chair', image: 'assets/furniture/lounge-chair.jpg', description: 'Comfortable relaxation for your outdoor space.' },
            { id: 'outdoor-sofa', name: 'Outdoor Sofa', image: 'assets/furniture/outdoor-sofa.jpg', description: 'Cozy seating for your patio or garden.' }
        ]
    };
    
    const sizeData = {
        'sofa': [
            { id: 'small', name: 'Small', dimensions: '150 x 80 x 85 cm' },
            { id: 'medium', name: 'Medium', dimensions: '180 x 85 x 85 cm' },
            { id: 'large', name: 'Large', dimensions: '220 x 90 x 85 cm' },
            { id: 'sectional', name: 'Sectional', dimensions: '250 x 200 x 85 cm' }
        ],
        'coffee-table': [
            { id: 'small', name: 'Small', dimensions: '80 x 50 x 45 cm' },
            { id: 'medium', name: 'Medium', dimensions: '100 x 60 x 45 cm' },
            { id: 'large', name: 'Large', dimensions: '120 x 70 x 45 cm' }
        ],
        // More size data for other furniture types...
    };
    
    const materialData = {
        primary: [
            { id: 'solid-wood', name: 'Solid Wood', color: '#8B4513' },
            { id: 'engineered-wood', name: 'Engineered Wood', color: '#A0522D' },
            { id: 'metal', name: 'Metal', color: '#C0C0C0' },
            { id: 'glass', name: 'Glass', color: '#ADD8E6' },
            { id: 'plastic', name: 'Plastic', color: '#1E90FF' },
            { id: 'rattan', name: 'Rattan', color: '#D2B48C' }
        ],
        finish: [
            { id: 'natural-oak', name: 'Natural Oak', color: '#D2B48C' },
            { id: 'walnut', name: 'Walnut', color: '#654321' },
            { id: 'mahogany', name: 'Mahogany', color: '#8B0000' },
            { id: 'white', name: 'White', color: '#FFFFFF' },
            { id: 'black', name: 'Black', color: '#000000' },
            { id: 'cherry', name: 'Cherry', color: '#800000' }
        ],
        hardware: [
            { id: 'brushed-nickel', name: 'Brushed Nickel', color: '#C0C0C0' },
            { id: 'chrome', name: 'Chrome', color: '#D3D3D3' },
            { id: 'brass', name: 'Brass', color: '#B5A642' },
            { id: 'bronze', name: 'Bronze', color: '#8B4513' },
            { id: 'black-metal', name: 'Black Metal', color: '#2F4F4F' },
            { id: 'copper', name: 'Copper', color: '#B87333' }
        ]
    };
    
    // Event Listeners
    
    // Location Selection
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            locationCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Update state
            state.selectedLocation = this.getAttribute('data-location');
            
            // Enable next button
            nextToFurnitureBtn.disabled = false;
        });
    });
    
    // Navigation Buttons
    nextToFurnitureBtn.addEventListener('click', function() {
        if (state.selectedLocation) {
            goToStep('furniture');
            loadFurnitureOptions(state.selectedLocation);
        }
    });
    
    backToLocationBtn.addEventListener('click', function() {
        goToStep('location');
    });
    
    nextToSizeBtn.addEventListener('click', function() {
        if (state.selectedFurniture) {
            goToStep('size');
            loadSizeOptions(state.selectedFurniture);
        }
    });
    
    backToFurnitureBtn.addEventListener('click', function() {
        goToStep('furniture');
    });
    
    nextToMaterialsBtn.addEventListener('click', function() {
        if (state.selectedSize || (state.customSize.width && state.customSize.depth && state.customSize.height)) {
            goToStep('materials');
            loadMaterialOptions();
        }
    });
    
    backToSizeBtn.addEventListener('click', function() {
        goToStep('size');
    });
    
    nextToSummaryBtn.addEventListener('click', function() {
        if (state.selectedMaterials.primary && state.selectedMaterials.finish && state.selectedMaterials.hardware) {
            goToStep('summary');
            updateSummary();
            initPreview();
        }
    });
    
    backToMaterialsBtn.addEventListener('click', function() {
        goToStep('materials');
    });
    
    // Custom Size
    applyCustomSizeBtn.addEventListener('click', function() {
        const width = parseFloat(customWidthInput.value);
        const depth = parseFloat(customDepthInput.value);
        const height = parseFloat(customHeightInput.value);
        
        if (width && depth && height) {
            state.customSize = { width, depth, height };
            state.selectedSize = null;
            
            // Remove selected class from all size options
            const sizeOptionElements = document.querySelectorAll('.size-option');
            sizeOptionElements.forEach(option => option.classList.remove('selected'));
            
            // Enable next button
            nextToMaterialsBtn.disabled = false;
        } else {
            alert('Please enter valid dimensions for all fields.');
        }
    });
    
    // Action Buttons
    addToRoomBtn.addEventListener('click', function() {
        // Save furniture to room
        saveFurnitureToRoom();
    });
    
    viewIn3dBtn.addEventListener('click', function() {
        // Redirect to 3D room viewer
        window.location.href = 'room-calculator.html';
    });
    
    // Functions
    
    // Navigation
    function goToStep(step) {
        // Update state
        state.currentStep = step;
        
        // Update progress steps
        progressSteps.forEach(progressStep => {
            const stepName = progressStep.getAttribute('data-step');
            
            progressStep.classList.remove('active', 'completed');
            
            if (stepName === step) {
                progressStep.classList.add('active');
            } else if (isStepCompleted(stepName, step)) {
                progressStep.classList.add('completed');
            }
        });
        
        // Show active section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${step}-section`) {
                section.classList.add('active');
            }
        });
    }
    
    function isStepCompleted(stepName, currentStep) {
        const stepOrder = ['location', 'furniture', 'size', 'materials', 'summary'];
        return stepOrder.indexOf(stepName) < stepOrder.indexOf(currentStep);
    }
    
    // Load Options
    function loadFurnitureOptions(location) {
        // Update location text
        selectedLocationText.textContent = location.replace('-', ' ');
        
        // Clear furniture grid
        furnitureGrid.innerHTML = '';
        
        // Get furniture options for selected location
        const furnitureOptions = furnitureData[location] || [];
        
        // Create furniture cards
        furnitureOptions.forEach(furniture => {
            const card = document.createElement('div');
            card.className = 'furniture-card';
            card.setAttribute('data-furniture', furniture.id);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${furniture.image}" alt="${furniture.name}">
                </div>
                <div class="card-content">
                    <h3>${furniture.name}</h3>
                    <p>${furniture.description}</p>
                </div>
                <div class="card-overlay">
                    <i class="fas fa-check-circle"></i>
                </div>
            `;
            
            // Add click event
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                document.querySelectorAll('.furniture-card').forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked card
                this.classList.add('selected');
                
                // Update state
                state.selectedFurniture = this.getAttribute('data-furniture');
                
                // Enable next button
                nextToSizeBtn.disabled = false;
            });
            
            furnitureGrid.appendChild(card);
        });
    }
    
    function loadSizeOptions(furniture) {
        // Update furniture text
        selectedFurnitureText.textContent = furniture.replace('-', ' ');
        
        // Clear size options
        sizeOptions.innerHTML = '';
        
        // Get size options for selected furniture
        const sizes = sizeData[furniture] || [];
        
        // Create size option cards
        sizes.forEach(size => {
            const option = document.createElement('div');
            option.className = 'size-option';
            option.setAttribute('data-size', size.id);
            
            option.innerHTML = `
                <div class="size-name">${size.name}</div>
                <div class="size-dimensions">${size.dimensions}</div>
            `;
            
            // Add click event
            option.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update state
                state.selectedSize = this.getAttribute('data-size');
                state.customSize = { width: null, depth: null, height: null };
                
                // Enable next button
                nextToMaterialsBtn.disabled = false;
            });
            
            sizeOptions.appendChild(option);
        });
        
        // Reset custom size inputs
        customWidthInput.value = '';
        customDepthInput.value = '';
        customHeightInput.value = '';
    }
    
    function loadMaterialOptions() {
        // Clear material options
        primaryMaterials.innerHTML = '';
        finishOptions.innerHTML = '';
        hardwareOptions.innerHTML = '';
        
        // Load primary materials
        materialData.primary.forEach(material => {
            const option = createMaterialOption(material, 'primary');
            primaryMaterials.appendChild(option);
        });
        
        // Load finish options
        materialData.finish.forEach(finish => {
            const option = createMaterialOption(finish, 'finish');
            finishOptions.appendChild(option);
        });
        
        // Load hardware options
        materialData.hardware.forEach(hardware => {
            const option = createMaterialOption(hardware, 'hardware');
            hardwareOptions.appendChild(option);
        });
        
        // Disable next button until all materials are selected
        nextToSummaryBtn.disabled = true;
    }
    
    function createMaterialOption(material, type) {
        const option = document.createElement('div');
        option.className = 'material-option';
        option.setAttribute('data-material', material.id);
        
        option.innerHTML = `
            <div class="material-color" style="background-color: ${material.color}"></div>
            <div class="material-name">${material.name}</div>
        `;
        
        // Add click event
        option.addEventListener('click', function() {
            // Remove selected class from all options in this category
            const categoryOptions = this.parentElement.querySelectorAll('.material-option');
            categoryOptions.forEach(o => o.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update state
            state.selectedMaterials[type] = this.getAttribute('data-material');
            
            // Check if all materials are selected
            if (state.selectedMaterials.primary && state.selectedMaterials.finish && state.selectedMaterials.hardware) {
                nextToSummaryBtn.disabled = false;
            }
        });
        
        return option;
    }
    
    function updateSummary() {
        // Update summary values
        summaryLocation.textContent = state.selectedLocation.replace('-', ' ');
        
        // Find furniture name
        const furniture = furnitureData[state.selectedLocation].find(f => f.id === state.selectedFurniture);
        summaryFurniture.textContent = furniture ? furniture.name : state.selectedFurniture;
        
        // Get size information
        let sizeText = '';
        if (state.selectedSize) {
            const size = sizeData[state.selectedFurniture].find(s => s.id === state.selectedSize);
            sizeText = `${size.name} (${size.dimensions})`;
        } else if (state.customSize.width && state.customSize.depth && state.customSize.height) {
            sizeText = `Custom (${state.customSize.width} x ${state.customSize.depth} x ${state.customSize.height} cm)`;
        }
        summarySize.textContent = sizeText;
        
        // Get material information
        const primaryMaterial = materialData.primary.find(m => m.id === state.selectedMaterials.primary);
        summaryMaterial.textContent = primaryMaterial ? primaryMaterial.name : '';
        
        const finish = materialData.finish.find(f => f.id === state.selectedMaterials.finish);
        summaryFinish.textContent = finish ? finish.name : '';
        
        const hardware = materialData.hardware.find(h => h.id === state.selectedMaterials.hardware);
        summaryHardware.textContent = hardware ? hardware.name : '';
        
        // Generate materials list
        generateMaterialsList();
        
        // Calculate price estimate
        calculatePriceEstimate();
    }
    
    function generateMaterialsList() {
        // Clear materials list
        materialsList.innerHTML = '';
        
        // Get dimensions
        let width, depth, height;
        if (state.selectedSize) {
            const size = sizeData[state.selectedFurniture].find(s => s.id === state.selectedSize);
            const dimensions = size.dimensions.match(/\d+/g).map(Number);
            [width, depth, height] = dimensions;
        } else if (state.customSize.width && state.customSize.depth && state.customSize.height) {
            width = state.customSize.width;
            depth = state.customSize.depth;
            height = state.customSize.height;
        }
        
        // Calculate materials based on furniture type and size
        const materials = [];
        
        // Primary material
        const primaryMaterial = materialData.primary.find(m => m.id === state.selectedMaterials.primary);
        if (primaryMaterial) {
            // Calculate surface area (simplified)
            const surfaceArea = 2 * ((width * depth) + (width * height) + (depth * height)) / 10000; // in m²
            materials.push({
                name: primaryMaterial.name,
                quantity: `${surfaceArea.toFixed(2)} m²`,
                icon: 'fa-layer-group'
            });
        }
        
        // Hardware
        const hardware = materialData.hardware.find(h => h.id === state.selectedMaterials.hardware);
        if (hardware) {
            materials.push({
                name: `${hardware.name} Hardware`,
                quantity: `${Math.ceil((width + depth) / 50)} pcs`,
                icon: 'fa-screwdriver'
            });
        }
        
        // Add furniture-specific materials
        switch(state.selectedFurniture) {
            case 'sofa':
                materials.push(
                    { name: 'Foam Padding', quantity: `${(width * depth / 10000).toFixed(2)} m²`, icon: 'fa-couch' },
                    { name: 'Fabric', quantity: `${(width * depth * 2 / 10000).toFixed(2)} m²`, icon: 'fa-scroll' },
                    { name: 'Springs', quantity: `${Math.ceil(width / 20)} pcs`, icon: 'fa-compress-alt' }
                );
                break;
            case 'coffee-table':
                materials.push(
                    { name: 'Table Legs', quantity: '4 pcs', icon: 'fa-table' },
                    { name: 'Screws', quantity: '16 pcs', icon: 'fa-bolt' },
                    { name: 'Finish Coat', quantity: `${(width * depth / 10000).toFixed(2)} L`, icon: 'fa-fill-drip' }
                );
                break;
            // Add more cases for other furniture types
        }
        
        // Create material items
        materials.forEach(material => {
            const item = document.createElement('div');
            item.className = 'material-item';
            
            item.innerHTML = `
                <div class="material-name">
                    <div class="material-icon"><i class="fas ${material.icon}"></i></div>
                    ${material.name}
                </div>
                <div class="material-quantity">${material.quantity}</div>
            `;
            
            materialsList.appendChild(item);
        });
    }
    
    function calculatePriceEstimate() {
        // Base price based on furniture type
        let basePrice = 0;
        switch(state.selectedFurniture) {
            case 'sofa': basePrice = 3000; break;
            case 'coffee-table': basePrice = 1200; break;
            case 'tv-stand': basePrice = 1800; break;
            case 'bookshelf': basePrice = 2200; break;
            case 'bed': basePrice = 4000; break;
            default: basePrice = 2000;
        }
        
        // Size multiplier
        let sizeMultiplier = 1;
        if (state.selectedSize) {
            switch(state.selectedSize) {
                case 'small': sizeMultiplier = 0.8; break;
                case 'medium': sizeMultiplier = 1; break;
                case 'large': sizeMultiplier = 1.3; break;
                case 'sectional': sizeMultiplier = 1.8; break;
                default: sizeMultiplier = 1;
            }
        } else if (state.customSize.width && state.customSize.depth && state.customSize.height) {
            // Calculate based on volume compared to medium size
            const volume = state.customSize.width * state.customSize.depth * state.customSize.height;
            const mediumVolume = 180 * 85 * 85; // Example medium sofa dimensions
            sizeMultiplier = volume / mediumVolume;
        }
        
        // Material multiplier
        let materialMultiplier = 1;
        switch(state.selectedMaterials.primary) {
            case 'solid-wood': materialMultiplier = 1.5; break;
            case 'engineered-wood': materialMultiplier = 1.2; break;
            case 'metal': materialMultiplier = 1.3; break;
            case 'glass': materialMultiplier = 1.4; break;
            case 'plastic': materialMultiplier = 0.8; break;
            case 'rattan': materialMultiplier = 1.1; break;
            default: materialMultiplier = 1;
        }
        
        // Calculate final price
        const finalPrice = Math.round(basePrice * sizeMultiplier * materialMultiplier);
        
        // Update price estimate
        priceEstimate.textContent = `${finalPrice.toLocaleString()} MVR`;
    }
    
    function initPreview() {
        // Initialize 3D preview
        if (!scene) {
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);
            
            // Create camera
            camera = new THREE.PerspectiveCamera(
                45, 
                furniturePreview.clientWidth / furniturePreview.clientHeight, 
                0.1, 
                1000
            );
            camera.position.set(0, 100, 300);
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(furniturePreview.clientWidth, furniturePreview.clientHeight);
            renderer.shadowMap.enabled = true;
            
            // Add renderer to preview container
            furniturePreview.innerHTML = '';
            furniturePreview.appendChild(renderer.domElement);
            
            // Create controls
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            
            // Add lights
            addLights();
            
            // Add grid helper
            const gridHelper = new THREE.GridHelper(400, 40, 0x888888, 0xcccccc);
            scene.add(gridHelper);
            
            // Start animation loop
            animate();
        }
        
        // Create furniture model
        createFurnitureModel();
    }
    
    function addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 50);
        directionalLight.castShadow = true;
        
        // Set up shadow properties
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        
        scene.add(directionalLight);
        
        // Add fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-100, 50, -50);
        scene.add(fillLight);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    function createFurnitureModel() {
        // Remove existing model if any
        if (furnitureModel) {
            scene.remove(furnitureModel);
        }
        
        // Create group to hold the model
        furnitureModel = new THREE.Group();
        
        // Get dimensions
        let width, depth, height;
        if (state.selectedSize) {
            const size = sizeData[state.selectedFurniture].find(s => s.id === state.selectedSize);
            const dimensions = size.dimensions.match(/\d+/g).map(Number);
            [width, depth, height] = dimensions;
        } else if (state.customSize.width && state.customSize.depth && state.customSize.height) {
            width = state.customSize.width;
            depth = state.customSize.depth;
            height = state.customSize.height;
        }
        
        // Get material color
        const primaryMaterial = materialData.primary.find(m => m.id === state.selectedMaterials.primary);
        const materialColor = primaryMaterial ? primaryMaterial.color : '#8B4513';
        
        // Create material
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(materialColor),
            roughness: 0.7,
            metalness: 0.1
        });
        
        // Create furniture based on type
        switch(state.selectedFurniture) {
            case 'sofa':
                createSofaModel(width, depth, height, material);
                break;
            case 'coffee-table':
                createTableModel(width, depth, height, material);
                break;
            case 'tv-stand':
                createTVStandModel(width, depth, height, material);
                break;
            default:
                // Default box model
                const geometry = new THREE.BoxGeometry(width, height, depth);
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.y = height / 2;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                furnitureModel.add(mesh);
        }
        
        // Add the model to the scene
        scene.add(furnitureModel);
        
        // Center camera on model
        centerCamera();
    }
    
    function createSofaModel(width, depth, height, material) {
        // Base
        const baseHeight = height * 0.3;
        const baseGeometry = new THREE.BoxGeometry(width, baseHeight, depth);
        const baseMesh = new THREE.Mesh(baseGeometry, material);
        baseMesh.position.y = baseHeight / 2;
        baseMesh.castShadow = true;
        baseMesh.receiveShadow = true;
        furnitureModel.add(baseMesh);
        
        // Back
        const backWidth = width;
        const backHeight = height - baseHeight;
        const backDepth = depth * 0.2;
        const backGeometry = new THREE.BoxGeometry(backWidth, backHeight, backDepth);
        const backMesh = new THREE.Mesh(backGeometry, material);
        backMesh.position.set(0, baseHeight + backHeight / 2, -depth / 2 + backDepth / 2);
        backMesh.castShadow = true;
        backMesh.receiveShadow = true;
        furnitureModel.add(backMesh);
        
        // Arms
        const armWidth = width * 0.1;
        const armHeight = height * 0.6;
        const armDepth = depth;
        const armGeometry = new THREE.BoxGeometry(armWidth, armHeight, armDepth);
        
        // Left arm
        const leftArm = new THREE.Mesh(armGeometry, material);
        leftArm.position.set(-width / 2 + armWidth / 2, baseHeight + armHeight / 2, 0);
        leftArm.castShadow = true;
        leftArm.receiveShadow = true;
        furnitureModel.add(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeometry, material);
        rightArm.position.set(width / 2 - armWidth / 2, baseHeight + armHeight / 2, 0);
        rightArm.castShadow = true;
        rightArm.receiveShadow = true;
        furnitureModel.add(rightArm);
    }
    
    function createTableModel(width, depth, height, material) {
        // Table top
        const topHeight = height * 0.1;
        const topGeometry = new THREE.BoxGeometry(width, topHeight, depth);
        const topMesh = new THREE.Mesh(topGeometry, material);
        topMesh.position.y = height - topHeight / 2;
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        furnitureModel.add(topMesh);
        
        // Legs
        const legWidth = width * 0.05;
        const legHeight = height - topHeight;
        const legDepth = depth * 0.05;
        const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);
        
        // Create 4 legs at corners
        for (let i = 0; i < 4; i++) {
            const leg = new THREE.Mesh(legGeometry, material);
            const xPos = (i % 2 === 0 ? -1 : 1) * (width / 2 - legWidth);
            const zPos = (i < 2 ? -1 : 1) * (depth / 2 - legDepth);
            leg.position.set(xPos, legHeight / 2, zPos);
            leg.castShadow = true;
            leg.receiveShadow = true;
            furnitureModel.add(leg);
        }
    }
    
    function createTVStandModel(width, depth, height, material) {
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(width, height * 0.8, depth);
        const bodyMesh = new THREE.Mesh(bodyGeometry, material);
        bodyMesh.position.y = height * 0.4;
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        furnitureModel.add(bodyMesh);
        
        // Top
        const topGeometry = new THREE.BoxGeometry(width, height * 0.1, depth);
        const topMesh = new THREE.Mesh(topGeometry, material);
        topMesh.position.y = height * 0.95;
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        furnitureModel.add(topMesh);
        
        // Shelves
        const shelfHeight = height * 0.05;
        const shelfGeometry = new THREE.BoxGeometry(width - 20, shelfHeight, depth - 20);
        
        // Middle shelf
        const middleShelf = new THREE.Mesh(shelfGeometry, material);
        middleShelf.position.y = height * 0.5;
        middleShelf.castShadow = true;
        middleShelf.receiveShadow = true;
        furnitureModel.add(middleShelf);
        
        // Bottom shelf
        const bottomShelf = new THREE.Mesh(shelfGeometry, material);
        bottomShelf.position.y = height * 0.2;
        bottomShelf.castShadow = true;
        bottomShelf.receiveShadow = true;
        furnitureModel.add(bottomShelf);
    }
    
    function centerCamera() {
        if (!furnitureModel) return;
        
        // Get dimensions
        let width, depth, height;
        if (state.selectedSize) {
            const size = sizeData[state.selectedFurniture].find(s => s.id === state.selectedSize);
            const dimensions = size.dimensions.match(/\d+/g).map(Number);
            [width, depth, height] = dimensions;
        } else if (state.customSize.width && state.customSize.depth && state.customSize.height) {
            width = state.customSize.width;
            depth = state.customSize.depth;
            height = state.customSize.height;
        }
        
        // Calculate camera distance based on model size
        const maxDimension = Math.max(width, depth, height);
        const distance = maxDimension * 2.5;
        
        // Position camera
        camera.position.set(distance, distance * 0.8, distance);
        camera.lookAt(0, height / 2, 0);
        
        // Reset controls target
        controls.target.set(0, height / 2, 0);
        controls.update();
    }
    
    function saveFurnitureToRoom() {
        // Create furniture data object
        const furnitureData = {
            type: state.selectedFurniture,
            location: state.selectedLocation,
            size: state.selectedSize || 'custom',
            dimensions: state.selectedSize ? 
                sizeData[state.selectedFurniture].find(s => s.id === state.selectedSize).dimensions : 
                `${state.customSize.width} x ${state.customSize.depth} x ${state.customSize.height} cm`,
            materials: {
                primary: state.selectedMaterials.primary,
                finish: state.selectedMaterials.finish,
                hardware: state.selectedMaterials.hardware
            },
            price: priceEstimate.textContent
        };
        
        // Save to localStorage
        let savedFurniture = JSON.parse(localStorage.getItem('savedFurniture') || '[]');
        savedFurniture.push(furnitureData);
        localStorage.setItem('savedFurniture', JSON.stringify(savedFurniture));
        
        // Show confirmation
        alert('Furniture added to your room!');
    }
    
    // Control button event listeners
    rotateLeftBtn.addEventListener('click', function() {
        if (furnitureModel) {
            furnitureModel.rotation.y -= Math.PI / 8;
        }
    });
    
    rotateRightBtn.addEventListener('click', function() {
        if (furnitureModel) {
            furnitureModel.rotation.y += Math.PI / 8;
        }
    });
    
    zoomInBtn.addEventListener('click', function() {
        if (controls) {
            controls.dollyIn(1.2);
            controls.update();
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (controls) {
            controls.dollyOut(1.2);
            controls.update();
        }
    });
    
    resetViewBtn.addEventListener('click', function() {
        centerCamera();
    });
});
