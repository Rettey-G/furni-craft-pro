document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const previewImage = document.getElementById('preview-image');
    const dimensionsForm = document.getElementById('dimensions-form');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const removeFileButton = document.getElementById('remove-file');
    const generateButton = document.getElementById('generate-3d');
    const canvasContainer = document.getElementById('canvas-container');
    const canvas3D = document.getElementById('3d-canvas');
    const loading = document.getElementById('loading');
    const materialsSection = document.getElementById('materials-section');
    const materialsList = document.getElementById('materials-list');
    
    // Control buttons
    const rotateLeftButton = document.getElementById('rotate-left');
    const rotateRightButton = document.getElementById('rotate-right');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const resetViewButton = document.getElementById('reset-view');
    const saveModelButton = document.getElementById('save-model');
    const exportModelButton = document.getElementById('export-model');
    const shareModelButton = document.getElementById('share-model');
    
    // Three.js variables
    let scene, camera, renderer, controls;
    let furnitureModel = null;
    
    // Initialize drag and drop
    initDragAndDrop();
    
    // Initialize 3D scene
    initScene();
    
    // Event listeners
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    removeFileButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering uploadArea click
        resetUploadArea();
    });
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    generateButton.addEventListener('click', function() {
        generateModel();
    });
    
    // Control button event listeners
    rotateLeftButton.addEventListener('click', function() {
        if (furnitureModel) {
            furnitureModel.rotation.y -= Math.PI / 8;
        }
    });
    
    rotateRightButton.addEventListener('click', function() {
        if (furnitureModel) {
            furnitureModel.rotation.y += Math.PI / 8;
        }
    });
    
    zoomInButton.addEventListener('click', function() {
        if (controls) {
            controls.dollyIn(1.2);
            controls.update();
        }
    });
    
    zoomOutButton.addEventListener('click', function() {
        if (controls) {
            controls.dollyOut(1.2);
            controls.update();
        }
    });
    
    resetViewButton.addEventListener('click', function() {
        resetCamera();
    });
    
    saveModelButton.addEventListener('click', function() {
        saveModel();
    });
    
    exportModelButton.addEventListener('click', function() {
        exportModel();
    });
    
    shareModelButton.addEventListener('click', function() {
        shareModel();
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (renderer && camera) {
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        }
    });
    
    // Functions
    function initDragAndDrop() {
        // Prevent default behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        // Remove highlight when item is dragged away
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        uploadArea.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        uploadArea.classList.add('active');
    }
    
    function unhighlight() {
        uploadArea.classList.remove('active');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        if (dt.files && dt.files.length) {
            handleFileUpload(dt.files[0]);
        }
    }
    
    function handleFileUpload(file) {
        // Check if file is an image
        if (!file.type.match('image.*')) {
            showError('Please upload an image file (JPG, PNG, SVG).');
            return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showError('File size exceeds 5MB. Please upload a smaller file.');
            return;
        }
        
        // Display file info
        fileName.textContent = file.name;
        fileInfo.style.display = 'flex';
        
        // Read file and display preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            uploadArea.classList.add('active', 'has-file');
            
            // Show dimensions form
            dimensionsForm.style.display = 'block';
            
            // Auto-suggest dimensions based on image aspect ratio
            const img = new Image();
            img.onload = function() {
                const aspectRatio = this.width / this.height;
                let suggestedWidth, suggestedDepth, suggestedHeight;
                
                if (aspectRatio > 1) { // Landscape
                    suggestedWidth = 120;
                    suggestedDepth = Math.round(suggestedWidth / aspectRatio);
                    suggestedHeight = 75; // Default height
                } else { // Portrait
                    suggestedDepth = 120;
                    suggestedWidth = Math.round(suggestedDepth * aspectRatio);
                    suggestedHeight = 75; // Default height
                }
                
                document.getElementById('width').value = suggestedWidth;
                document.getElementById('depth').value = suggestedDepth;
                document.getElementById('height').value = suggestedHeight;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    function resetUploadArea() {
        fileInput.value = '';
        previewImage.style.display = 'none';
        previewImage.src = '';
        dimensionsForm.style.display = 'none';
        fileInfo.style.display = 'none';
        uploadArea.classList.remove('active', 'has-file');
        
        // Reset 3D view
        if (furnitureModel) {
            scene.remove(furnitureModel);
            furnitureModel = null;
        }
        
        // Reset materials list
        materialsList.innerHTML = '<p class="empty-state">Generate a 3D model to see required materials</p>';
        
        // Hide 3D controls
        canvasContainer.style.display = 'none';
        materialsSection.style.display = 'none';
    }
    
    function initScene() {
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        
        // Create camera
        camera = new THREE.PerspectiveCamera(
            45, 
            canvasContainer.clientWidth / canvasContainer.clientHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 100, 300);
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas3D,
            antialias: true 
        });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.shadowMap.enabled = true;
        
        // Create controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
        
        // Add lights
        addLights();
        
        // Add grid helper
        const gridHelper = new THREE.GridHelper(400, 40, 0x888888, 0xcccccc);
        scene.add(gridHelper);
        
        // Start animation loop
        animate();
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
    
    function generateModel() {
        // Get dimensions
        const width = parseFloat(document.getElementById('width').value);
        const depth = parseFloat(document.getElementById('depth').value);
        const height = parseFloat(document.getElementById('height').value);
        const material = document.getElementById('material').value;
        
        // Validate dimensions
        if (isNaN(width) || isNaN(depth) || isNaN(height) || 
            width <= 0 || depth <= 0 || height <= 0) {
            showError('Please enter valid dimensions.');
            return;
        }
        
        // Show loading
        loading.style.display = 'flex';
        
        // Remove existing model if any
        if (furnitureModel) {
            scene.remove(furnitureModel);
        }
        
        // Create new model (with a slight delay to allow loading to show)
        setTimeout(() => {
            createFurnitureModel(width, depth, height, material);
            
            // Show 3D view
            canvasContainer.style.display = 'block';
            
            // Generate materials list
            generateMaterialsList(width, depth, height, material);
            
            // Show materials section
            materialsSection.style.display = 'block';
            
            // Hide loading
            loading.style.display = 'none';
            
            // Center camera on model
            centerCameraOnModel();
        }, 1000);
    }
    
    function createFurnitureModel(width, depth, height, materialType) {
        // Create group to hold the model
        furnitureModel = new THREE.Group();
        
        // Set material based on selection
        let modelMaterial;
        switch (materialType) {
            case 'wood':
                modelMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x8B4513,
                    roughness: 0.7,
                    metalness: 0.1
                });
                break;
            case 'metal':
                modelMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0xC0C0C0,
                    roughness: 0.2,
                    metalness: 0.8
                });
                break;
            case 'plastic':
                modelMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x1E90FF,
                    roughness: 0.5,
                    metalness: 0.1
                });
                break;
            case 'glass':
                modelMaterial = new THREE.MeshPhysicalMaterial({ 
                    color: 0xffffff,
                    roughness: 0.1,
                    metalness: 0.1,
                    transmission: 0.9,
                    transparent: true
                });
                break;
            case 'fabric':
                modelMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x6B8E23,
                    roughness: 0.9,
                    metalness: 0.0
                });
                break;
            default:
                modelMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        }
        
        // Create basic shape from the 2D design
        // This is a simplified version - in a real app, you'd analyze the image
        
        // Create the main body
        const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
        const bodyMesh = new THREE.Mesh(bodyGeometry, modelMaterial);
        bodyMesh.position.y = height / 2;
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        furnitureModel.add(bodyMesh);
        
        // For demonstration, add some details based on the material type
        if (materialType === 'wood' || materialType === 'metal') {
            // Add legs
            const legThickness = Math.min(width, depth) * 0.1;
            const legHeight = height * 0.2;
            
            for (let i = 0; i < 4; i++) {
                const legGeometry = new THREE.BoxGeometry(legThickness, legHeight, legThickness);
                const legMesh = new THREE.Mesh(legGeometry, modelMaterial);
                
                // Position legs at corners
                const xPos = (i % 2 === 0 ? -1 : 1) * (width / 2 - legThickness / 2);
                const zPos = (i < 2 ? -1 : 1) * (depth / 2 - legThickness / 2);
                
                legMesh.position.set(xPos, -legHeight / 2, zPos);
                legMesh.castShadow = true;
                legMesh.receiveShadow = true;
                furnitureModel.add(legMesh);
            }
        }
        
        // Add the model to the scene
        scene.add(furnitureModel);
    }
    
    function centerCameraOnModel() {
        if (!furnitureModel) return;
        
        // Reset camera position
        resetCamera();
        
        // Update controls
        controls.update();
    }
    
    function resetCamera() {
        if (!furnitureModel) return;
        
        // Get model dimensions
        const width = parseFloat(document.getElementById('width').value);
        const depth = parseFloat(document.getElementById('depth').value);
        const height = parseFloat(document.getElementById('height').value);
        
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
    
    function generateMaterialsList(width, depth, height, materialType) {
        // Calculate materials needed
        const surfaceArea = 2 * (width * depth + width * height + depth * height) / 10000; // m²
        const volume = width * depth * height / 1000000; // m³
        
        // Generate HTML for materials list
        let html = '';
        
        switch (materialType) {
            case 'wood':
                html += createMaterialItem('Wood Planks', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Wood Screws', `${Math.ceil(surfaceArea * 10)} pcs`);
                html += createMaterialItem('Wood Glue', `${Math.ceil(surfaceArea / 2)} bottle(s)`);
                html += createMaterialItem('Sandpaper', `${Math.ceil(surfaceArea / 2)} sheet(s)`);
                html += createMaterialItem('Wood Finish', `${Math.ceil(surfaceArea / 3)} can(s)`);
                break;
                
            case 'metal':
                html += createMaterialItem('Metal Sheets', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Metal Screws', `${Math.ceil(surfaceArea * 8)} pcs`);
                html += createMaterialItem('Welding Rod', `${Math.ceil(surfaceArea * 2)} m`);
                html += createMaterialItem('Metal Primer', `${Math.ceil(surfaceArea / 4)} can(s)`);
                html += createMaterialItem('Metal Paint', `${Math.ceil(surfaceArea / 3)} can(s)`);
                break;
                
            case 'plastic':
                html += createMaterialItem('Plastic Sheets', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Plastic Cement', `${Math.ceil(surfaceArea / 2)} tube(s)`);
                html += createMaterialItem('Plastic Screws', `${Math.ceil(surfaceArea * 6)} pcs`);
                html += createMaterialItem('Plastic Polish', `${Math.ceil(surfaceArea / 5)} bottle(s)`);
                break;
                
            case 'glass':
                html += createMaterialItem('Glass Panels', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Silicone Sealant', `${Math.ceil(surfaceArea)} tube(s)`);
                html += createMaterialItem('Glass Brackets', `${Math.ceil(surfaceArea * 4)} pcs`);
                html += createMaterialItem('Glass Cleaner', `${Math.ceil(surfaceArea / 5)} bottle(s)`);
                break;
                
            case 'fabric':
                html += createMaterialItem('Fabric', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Batting/Padding', `${surfaceArea.toFixed(2)} m²`);
                html += createMaterialItem('Thread', `${Math.ceil(surfaceArea * 5)} m`);
                html += createMaterialItem('Staples', `${Math.ceil(surfaceArea * 20)} pcs`);
                html += createMaterialItem('Fabric Protector', `${Math.ceil(surfaceArea / 4)} can(s)`);
                break;
        }
        
        // Add estimated weight
        let density;
        switch (materialType) {
            case 'wood': density = 700; break; // kg/m³
            case 'metal': density = 7800; break;
            case 'plastic': density = 950; break;
            case 'glass': density = 2500; break;
            case 'fabric': density = 300; break;
            default: density = 700;
        }
        
        const weight = volume * density;
        html += createMaterialItem('Estimated Weight', `${weight.toFixed(2)} kg`);
        
        // Update materials list
        materialsList.innerHTML = html;
    }
    
    function createMaterialItem(name, quantity) {
        return `
            <div class="material-item">
                <div class="material-name">
                    <div class="material-icon"><i class="fas fa-box"></i></div>
                    ${name}
                </div>
                <div class="material-quantity">${quantity}</div>
            </div>
        `;
    }
    
    function saveModel() {
        // In a real app, this would save the model to a database
        alert('Model saved successfully!');
    }
    
    function exportModel() {
        // In a real app, this would export the model to a file
        alert('This feature will be available in the next update.');
    }
    
    function shareModel() {
        if (navigator.share) {
            navigator.share({
                title: 'My 3D Furniture Model',
                text: 'Check out this 3D furniture model I created with FurniCraft Pro!',
                url: window.location.href,
            })
            .catch((error) => console.log('Error sharing:', error));
        } else {
            alert('Web Share API not supported in your browser. Please copy the URL manually.');
        }
    }
    
    function showError(message) {
        alert(message);
    }
});
