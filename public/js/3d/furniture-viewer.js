// FurniCraft Pro - 3D Furniture Viewer
import * as THREE from '../../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export class FurnitureViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // Default options
    this.options = Object.assign({
      backgroundColor: 0xf5f5f5,
      defaultModelPath: '/models/default-furniture.glb',
      cameraPosX: 2,
      cameraPosY: 1,
      cameraPosZ: 2,
      controlsTargetX: 0,
      controlsTargetY: 0,
      controlsTargetZ: 0
    }, options);

    this.init();
  }

  init() {
    // Get container dimensions
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // Set up scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.backgroundColor);

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(
      this.options.cameraPosX,
      this.options.cameraPosY,
      this.options.cameraPosZ
    );

    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Add lights
    this.setupLights();

    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(
      this.options.controlsTargetX,
      this.options.controlsTargetY,
      this.options.controlsTargetZ
    );
    this.controls.update();
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Add window resize handler
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    // Add model loader
    this.loader = new GLTFLoader();

    // Create a grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    this.scene.add(gridHelper);

    // Start animation loop
    this.animate();

    // Load default model
    this.loadModel(this.options.defaultModelPath);
  }

  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional light (sun-like)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    this.scene.add(directionalLight);

    // Add soft light from the front
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.3);
    frontLight.position.set(0, 5, 10);
    this.scene.add(frontLight);
  }

  loadModel(modelPath) {
    // Remove previous model if exists
    if (this.currentModel) {
      this.scene.remove(this.currentModel);
    }

    // Show loading indicator
    this.showLoadingIndicator();

    // Create fallback cube if model files are not available
    if (modelPath === '/models/default-furniture.glb') {
      this.createFallbackCube('Default Furniture', 0x6495ED);
      return;
    } else if (modelPath === '/models/chair.glb') {
      this.createFallbackCube('Chair', 0x8B4513);
      return;
    } else if (modelPath === '/models/table.glb') {
      this.createFallbackCube('Table', 0x228B22);
      return;
    } else if (modelPath === '/models/bookshelf.glb') {
      this.createFallbackCube('Bookshelf', 0xA0522D);
      return;
    }

    // Load the model
    this.loader.load(
      modelPath,
      (gltf) => {
        this.currentModel = gltf.scene;
        
        // Make sure model can cast and receive shadows
        this.currentModel.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        // Center model
        const box = new THREE.Box3().setFromObject(this.currentModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale model to fit in the view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim;
        this.currentModel.scale.set(scale, scale, scale);
        
        // Position model at center
        this.currentModel.position.x = -center.x * scale;
        this.currentModel.position.y = -center.y * scale;
        this.currentModel.position.z = -center.z * scale;
        
        // Add model to scene
        this.scene.add(this.currentModel);
        
        // Hide loading indicator
        this.hideLoadingIndicator();
      },
      (xhr) => {
        // Update loading progress
        const percentage = (xhr.loaded / xhr.total) * 100;
        this.updateLoadingProgress(percentage);
      },
      (error) => {
        console.error('Error loading 3D model:', error);
        this.hideLoadingIndicator();
        this.showErrorMessage('Failed to load 3D model');
        
        // Create a fallback object based on which model failed to load
        const modelName = modelPath.split('/').pop().split('.')[0];
        this.createFallbackCube(modelName, 0xFF0000);
      }
    );
  }

  createFallbackCube(modelName, color) {
    // Create a basic cube as a fallback
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: color });
    this.currentModel = new THREE.Mesh(geometry, material);
    this.currentModel.castShadow = true;
    this.currentModel.receiveShadow = true;
    
    // Add a label for the model
    const div = document.createElement('div');
    div.className = 'model-label';
    div.textContent = modelName;
    div.style.cssText = `
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: bold;
    `;
    this.container.appendChild(div);
    
    // Add to scene
    this.scene.add(this.currentModel);
    
    // Hide loading indicator
    this.hideLoadingIndicator();
  }

  showLoadingIndicator() {
    let loadingIndicator = document.getElementById('model-loading-indicator');
    if (!loadingIndicator) {
      loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'model-loading-indicator';
      loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading 3D Model <span id="loading-percentage">0%</span></div>
      `;
      loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      `;
      this.container.appendChild(loadingIndicator);
    }
    loadingIndicator.style.display = 'block';
  }

  hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('model-loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  }

  updateLoadingProgress(percentage) {
    const loadingPercentage = document.getElementById('loading-percentage');
    if (loadingPercentage) {
      loadingPercentage.textContent = `${Math.round(percentage)}%`;
    }
  }

  showErrorMessage(message) {
    let errorMessage = document.getElementById('model-error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.id = 'model-error-message';
      errorMessage.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 0, 0, 0.1);
        color: #ff0000;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      `;
      this.container.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Rotate the fallback cube if it exists
    if (this.currentModel && this.currentModel.isMesh) {
      this.currentModel.rotation.y += 0.01;
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  // Public methods for external control
  setModelByPath(modelPath) {
    this.loadModel(modelPath);
  }

  applyMaterial(materialOptions, meshName = null) {
    if (!this.currentModel) return;
    
    this.currentModel.traverse((node) => {
      if (node.isMesh && (meshName === null || node.name === meshName)) {
        node.material = new THREE.MeshStandardMaterial(materialOptions);
      }
    });
  }

  setEnvironment(hdrPath) {
    // This would load an HDR environment map for reflections
    // Requires RGBELoader and PMREMGenerator
    console.log("Environment mapping would be set here with:", hdrPath);
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'furniture-screenshot.png';
    link.click();
  }
} 