import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  CameraService, 
  LightingService, 
  ModelService, 
  RendererService, 
  DebugService 
} from '../cinema-model/services';
import { SeatGeneratorService, SeatConfig } from './services/seat-generator.service';

@Component({
  selector: 'app-cinema-generator',
  standalone: false,
  templateUrl: './cinema-generator.html',
  styleUrl: './cinema-generator.css'
})
export class CinemaGenerator implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls: any;
  public cinemaModel!: THREE.Group;
  public chairModel!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private animationId!: number;
  private raycaster!: THREE.Raycaster;
  private mouse!: THREE.Vector2;

  // Configurații pentru scaune
  public seatConfig: SeatConfig = {
    rows: 8,
    seatsPerRow: 12,
    rowSpacing: 1.2,
    seatSpacing: 0.8,
    rowOffset: 0.5, // Offset pentru a centra scaunele
    seatOffset: 0.4, // Offset pentru a centra scaunele
    scale: 0.8 // Scala pentru scaune
  };

  constructor(
    private cameraService: CameraService,
    private lightingService: LightingService,
    private modelService: ModelService,
    private rendererService: RendererService,
    private debugService: DebugService,
    private seatGeneratorService: SeatGeneratorService
  ) {}

  ngOnInit(): void {
    console.log('CinemaGenerator ngOnInit started');
    this.initThreeJS();
    this.verifyFiles().then(() => {
      this.loadModels();
    });
    this.setupKeyboardDebug();
    console.log('CinemaGenerator ngOnInit completed');
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    console.log('Initializing Three.js...');
    
    // Create scene and renderer using services
    this.scene = this.rendererService.createScene();
    this.renderer = this.rendererService.createRenderer();
    
    // Initialize camera using service
    this.camera = this.cameraService.initializeCamera(this.renderer);
    this.controls = this.cameraService.getControls();

    // Setup lighting using service
    this.lightingService.setupLighting(this.scene);

    // Initialize raycaster and mouse for seat selection
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Add renderer to DOM
    if (this.rendererContainer && this.rendererContainer.nativeElement) {
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      console.log('Renderer added to DOM');
    } else {
      console.error('Renderer container not found!');
    }

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    console.log('Three.js initialization completed');
  }

  private async loadModels(): Promise<void> {
    try {
      console.log('Starting to load all models...');
      
      // Load cinema model (without chairs) using custom method
      console.log('Loading cinema model (no chairs)...');
      this.cinemaModel = await this.loadCinemaNoChairsModel();
      console.log('Cinema model (no chairs) loaded successfully');
      

      
      // Load chair model using service
      this.chairModel = await this.seatGeneratorService.loadChairModel(this.renderer, this.seatConfig.scale);
      
      // Generate seats using service
      this.generateSeats();
      
      // Setup scroll animation
      this.cameraService.setupScrollAnimation(this.rendererContainer.nativeElement, this.cinemaModel);
      
      // Setup click handler after models are loaded
      this.setupClickHandler();
      
      // Force camera to look at model
      if (this.cinemaModel) {
        this.camera.lookAt(this.cinemaModel.position);
        console.log('Camera looking at model position:', this.cinemaModel.position);
        
        // Debug: Check if cinema model is actually loaded
        console.log('Cinema model children count:', this.cinemaModel.children.length);
        console.log('Cinema model visible:', this.cinemaModel.visible);
        console.log('Cinema model position:', this.cinemaModel.position);
        console.log('Cinema model scale:', this.cinemaModel.scale);
        
        // Make sure model is visible
        this.cinemaModel.visible = true;
        this.cinemaModel.traverse((child: any) => {
          if (child.visible !== undefined) {
            child.visible = true;
          }
        });
        
        // Check if model is in scene
        const isInScene = this.scene.children.includes(this.cinemaModel);
        console.log('Cinema model in scene:', isInScene);
        console.log('Scene children count:', this.scene.children.length);
        
        // If not in scene, add it
        if (!isInScene) {
          this.scene.add(this.cinemaModel);
          console.log('Cinema model added to scene');
        }
        

      } else {
        console.error('Cinema model is null!');
      }
      
      console.log('All models loaded successfully!');
    } catch (error) {
      console.error('Error loading models:', error);
    }
  }



    private async loadCinemaNoChairsModel(): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      
      console.log('Starting to load cinema_e model...');
      
      loader.load(
        '/assets/home/3d-models/cinema_e.glb',
        (gltf: any) => {
          console.log('Cinema_e model loaded successfully!');
          const model = gltf.scene;
          
          // Enable shadows and improve material quality for all meshes
          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Improve material quality
              if (child.material) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          // Center and scale the model using the same logic as cinema-model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          console.log('Cinema_e model dimensions:', size);
          console.log('Cinema_e model center:', center);
          
          // Scale model using the same logic as cinema-model component
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 15 / maxDim; // Use the same scale calculation as cinema-model
          model.scale.setScalar(scale);
          
          // Center the model
          model.position.sub(center.multiplyScalar(scale));
          
          console.log('Applied scale to cinema_e:', scale);
          console.log('Final cinema_e position:', model.position);

          this.scene.add(model);
          console.log('Cinema_e model added to scene');
          
          resolve(model);
        },
        (progress: any) => {
          const percent = (progress.loaded / progress.total * 100);
          console.log('Loading cinema_e progress:', percent.toFixed(1) + '%');
        },
        (error: any) => {
          console.error('Error loading cinema_e model:', error);
          console.error('Error details:', {
            message: error.message,
            type: error.type,
            url: error.url
          });
          reject(error);
        }
      );
    });
  }

  private async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Error checking file ${url}:`, error);
      return false;
    }
  }

  private async verifyFiles(): Promise<void> {
    const files = [
      '/assets/home/3d-models/cinema_e.glb',
      '/assets/home/3d-models/chair.glb',
      '/assets/home/3d-models/cinema.glb'
    ];

    for (const file of files) {
      const exists = await this.checkFileExists(file);
      console.log(`File ${file} exists:`, exists);
    }
  }

  private generateSeats(): void {
    this.seatGeneratorService.generateSeats(this.scene, this.seatConfig);
  }

  private clearSeats(): void {
    this.seatGeneratorService.clearSeats(this.scene);
  }

  // Public methods for UI interaction
  public updateSeatConfiguration(): void {
    this.generateSeats();
  }

  public getSeatCount(): number {
    return this.seatGeneratorService.getSeatCount(this.seatConfig);
  }

  // Public methods for seat selection management
  public getSelectedSeats(): any[] {
    return this.seatGeneratorService.getSelectedSeats();
  }

  public getSelectedSeatsCount(): number {
    return this.seatGeneratorService.getSelectedSeatsCount();
  }

  public clearAllSelections(): void {
    this.seatGeneratorService.clearAllSelections();
  }

  private findClosestSeatToMouse(mouse: THREE.Vector2, seats: THREE.Group[]): THREE.Group | null {
    let closestSeat: THREE.Group | null = null;
    let closestDistance = Infinity;
    
    seats.forEach(seat => {
      // Convert seat world position to screen coordinates
      const seatScreenPosition = new THREE.Vector3();
      seat.getWorldPosition(seatScreenPosition);
      seatScreenPosition.project(this.camera);
      
      // Calculate distance between mouse and seat screen position
      const distance = Math.sqrt(
        Math.pow(mouse.x - seatScreenPosition.x, 2) + 
        Math.pow(mouse.y - seatScreenPosition.y, 2)
      );
      
      // If distance is small enough (within reasonable click area)
      if (distance < 0.1 && distance < closestDistance) {
        closestDistance = distance;
        closestSeat = seat;
      }
    });
    
    console.log('Closest seat distance:', closestDistance);
    return closestSeat;
  }

  private testSeatDetection(): void {
    console.log('=== Testing Seat Detection ===');
    const seats = this.seatGeneratorService.getGeneratedSeats();
    console.log('Total seats:', seats.length);
    
    if (seats.length > 0) {
      const firstSeat = seats[0];
      console.log('First seat:', firstSeat);
      console.log('First seat userData:', (firstSeat as any).userData);
      console.log('First seat position:', firstSeat.position);
      console.log('First seat visible:', firstSeat.visible);
      
      // Check if seat has meshes
      let meshCount = 0;
      firstSeat.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          meshCount++;
          console.log(`Mesh ${meshCount}:`, child);
          console.log(`Mesh visible:`, child.visible);
          console.log(`Mesh material:`, child.material);
        }
      });
      console.log('Mesh count in first seat:', meshCount);
      
      // Test raycaster with a simple ray
      console.log('=== Testing Raycaster ===');
      const testRay = new THREE.Raycaster();
      const testMouse = new THREE.Vector2(0, 0); // Center of screen
      testRay.setFromCamera(testMouse, this.camera);
      
      const intersects = testRay.intersectObjects(seats, true);
      console.log('Test ray intersections with seats:', intersects.length);
      
      const allMeshes: THREE.Mesh[] = [];
      seats.forEach(seat => {
        seat.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            allMeshes.push(child);
          }
        });
      });
      
      const meshIntersects = testRay.intersectObjects(allMeshes, true);
      console.log('Test ray intersections with meshes:', meshIntersects.length);
    }
  }

  private setupClickHandler(): void {
    console.log('Setting up click handler...');
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.addEventListener('click', (event) => {
        console.log('Click detected on renderer!');
        this.onMouseClick(event);
      });
      console.log('Click handler added successfully');
    } else {
      console.error('Renderer or domElement not available for click handler');
    }
  }

  private onMouseClick(event: MouseEvent): void {
    console.log('Mouse click event triggered');
    
    // Calculate mouse position in normalized device coordinates
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    console.log('Mouse coordinates:', { x: this.mouse.x, y: this.mouse.y });

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all seats from the scene
    const seats = this.seatGeneratorService.getGeneratedSeats();
    console.log('Available seats for intersection:', seats.length);
    
    // Get all meshes from seats for better intersection detection
    const allMeshes: THREE.Mesh[] = [];
    seats.forEach((seat, seatIndex) => {
      seat.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          allMeshes.push(child);
          // Add seat reference to mesh for easier identification
          (child as any).seatIndex = seatIndex;
        }
      });
    });
    console.log('Total meshes for intersection:', allMeshes.length);
    
    // Also try intersecting with the seat groups directly
    const intersectsWithGroups = this.raycaster.intersectObjects(seats, true);
    console.log('Intersections with seat groups:', intersectsWithGroups.length);
    
    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(allMeshes, true);
    console.log('Intersections with meshes found:', intersects.length);

    // Try both approaches - meshes and groups
    let clickedSeat: THREE.Group | null = null;
    
    // First try with meshes
    if (intersects.length > 0) {
      console.log('First mesh intersection:', intersects[0]);
      
      for (const intersect of intersects) {
        let currentObject: any = intersect.object;
        console.log('Checking mesh object:', currentObject);
        
        // If it's a mesh, find its parent seat group
        while (currentObject && !(currentObject as any).userData?.row !== undefined) {
          currentObject = currentObject.parent;
          console.log('Traversing to parent:', currentObject);
          
          // Safety check to prevent infinite loop
          if (!currentObject || currentObject === this.scene) {
            break;
          }
        }
        
        if (currentObject && (currentObject as any).userData?.row !== undefined) {
          clickedSeat = currentObject;
          console.log('Found seat object from mesh:', clickedSeat);
          console.log('Seat userData:', (clickedSeat as any).userData);
          break;
        }
      }
    }
    
    // If no seat found with meshes, try with groups
    if (!clickedSeat && intersectsWithGroups.length > 0) {
      console.log('First group intersection:', intersectsWithGroups[0]);
      
      for (const intersect of intersectsWithGroups) {
        const currentObject = intersect.object as any;
        console.log('Checking group object:', currentObject);
        
        if (currentObject && currentObject.userData?.row !== undefined) {
          clickedSeat = currentObject as THREE.Group;
          console.log('Found seat object from group:', clickedSeat);
          console.log('Seat userData:', (clickedSeat as any).userData);
          break;
        }
      }
    }

    if (clickedSeat) {
      // Toggle seat selection
      const isSelected = this.seatGeneratorService.selectSeat(clickedSeat);
      console.log(`Seat clicked! Selection state: ${isSelected ? 'selected' : 'deselected'}`);
    } else {
      console.log('No valid seat object found in intersection');
      console.log('Available seats with userData:');
      seats.forEach((seat, index) => {
        if ((seat as any).userData) {
          console.log(`Seat ${index}:`, (seat as any).userData);
        }
      });
      
      // Debug: Check if seats are actually in the scene
      console.log('Seats in scene check:');
      seats.forEach((seat, index) => {
        const isInScene = this.scene.children.includes(seat);
        console.log(`Seat ${index} in scene:`, isInScene);
      });
      
      // Try alternative approach: find closest seat to mouse position
      console.log('=== Trying alternative approach ===');
      const closestSeat = this.findClosestSeatToMouse(this.mouse, seats);
      if (closestSeat) {
        console.log('Found closest seat:', closestSeat);
        const isSelected = this.seatGeneratorService.selectSeat(closestSeat);
        console.log(`Closest seat selected! Selection state: ${isSelected ? 'selected' : 'deselected'}`);
      }
    }
  }

  private setupKeyboardDebug(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'x') {
        this.debugService.logCameraInfo(this.camera, this.cinemaModel, this.controls);
      }
      // Reset camera to start position
      if (event.key.toLowerCase() === 'r') {
        this.cameraService.resetCameraToStart();
      }
      // Toggle controls
      if (event.key.toLowerCase() === 'c') {
        const currentState = this.cameraService.isControlsEnabled();
        this.cameraService.enableControls(!currentState);
        console.log('Controls enabled:', !currentState);
      }
      // Regenerate seats
      if (event.key.toLowerCase() === 'g') {
        this.generateSeats();
        console.log('Seats regenerated');
      }
      // Clear all seat selections
      if (event.key.toLowerCase() === 's') {
        this.seatGeneratorService.clearAllSelections();
        console.log('All seat selections cleared');
      }
      // Test seat detection
      if (event.key.toLowerCase() === 't') {
        this.testSeatDetection();
      }
    });
  }

  private onWindowResize(): void {
    this.rendererService.onWindowResize(this.renderer, this.camera);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    // Update controls
    this.cameraService.updateCamera();

    // Update model animations
    if (this.mixer) {
      this.mixer.update(delta);
    }

    // Render scene
    this.rendererService.render(this.renderer, this.scene, this.camera);
  }
} 