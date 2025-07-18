import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import {
  CameraService,
  LightingService,
  ModelService,
  RendererService,
  DebugService,
} from '../cinema-model/services';
import {
  SeatGeneratorService,
  ClickDetectionService,
  ModelLoaderService,
  KeyboardControlsService,
  SeatConfigService,
  SeatConfig,
} from './services';

@Component({
  selector: 'app-cinema-generator',
  standalone: false,
  templateUrl: './cinema-generator.html',
  styleUrl: './cinema-generator.css',
})
export class CinemaGenerator implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls: any;
  public cinemaModel!: THREE.Group;
  public chairModel!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private animationId!: number;

  // config pentru scaune
  public seatConfig: SeatConfig = {
    rows: 6,
    seatsPerRow: 10,
    rowSpacing: 1,
    seatSpacing: 0.4,
    rowOffset: 0.5, // offset ptr centra scaune
    seatOffset: 0.4, // offset ptr centra scaune
    scale: 0.8, // scale scaune
    rowHeight: 0.4, // înălțimea de elevație per rând (maximă)
    baseHeight: -2.3, // înălțimea de bază (coborâtă pentru platformele existente)
  };

  // Find seat variables
  public findSeatRow: number = 1;
  public findSeatColumn: number = 1;
  public seatInfo: any = null;

  // Admin panel visibility
  public isAdminPanelVisible: boolean = false;

  constructor(
    private cameraService: CameraService,
    private lightingService: LightingService,
    private modelService: ModelService,
    private rendererService: RendererService,
    private debugService: DebugService,
    private seatGeneratorService: SeatGeneratorService,
    private clickDetectionService: ClickDetectionService,
    private modelLoaderService: ModelLoaderService,
    private keyboardControlsService: KeyboardControlsService,
    private seatConfigService: SeatConfigService
  ) {}

  ngOnInit(): void {
    console.log('CinemaGenerator ngOnInit started');
    this.initThreeJS();

    // init config from service
    const initialConfig = this.seatConfigService.getCurrentConfig();
    this.seatConfig = { ...initialConfig };
    console.log('Initial config loaded:', this.seatConfig);

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

    // create scene and renderer
    this.scene = this.rendererService.createScene();
    this.renderer = this.rendererService.createRenderer();

    // init camera using service
    this.camera = this.cameraService.initializeCamera(this.renderer);
    this.controls = this.cameraService.getControls();

    // setup light
    this.lightingService.setupLighting(this.scene);

    // add renderer to DOM
    if (this.rendererContainer && this.rendererContainer.nativeElement) {
      this.rendererContainer.nativeElement.appendChild(
        this.renderer.domElement
      );
      console.log('Renderer added to DOM');
    } else {
      console.error('Renderer container not found');
    }

    // handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    console.log('Three.js init completed');
  }

  private async loadModels(): Promise<void> {
    try {
      console.log('------- Starting to load all models ---');

      // load cinema model
      console.log('-loading cinema model-');
      this.cinemaModel = await this.modelLoaderService.loadCinemaModel(
        this.renderer,
        this.scene
      );
      console.log('Cinema model loaded successfully');

      // load chair model
      this.chairModel = await this.modelLoaderService.loadChairModel(
        this.renderer,
        this.seatConfig.scale
      );

      // set chair model in seat generator service
      this.seatGeneratorService.setChairModel(this.chairModel);

      // generate seats using service
      this.generateSeats();

      // // setup scroll animation
      // this.cameraService.setupScrollAnimation(
      //   this.rendererContainer.nativeElement,
      //   this.cinemaModel
      // );

      // setup click handler after models are loaded
      this.setupClickHandler();

      // force camera to look at model
      if (this.cinemaModel) {
        this.camera.lookAt(this.cinemaModel.position);
        console.log(
          'Camera looking at model position:',
          this.cinemaModel.position
        );

        // Debug: check if cinema model is actually loaded
        console.log(
          'Cinema model children count:',
          this.cinemaModel.children.length
        );
        console.log('Cinema model visible:', this.cinemaModel.visible);
        console.log('Cinema model position:', this.cinemaModel.position);
        console.log('Cinema model scale:', this.cinemaModel.scale);

        // make sure model is visible
        this.cinemaModel.visible = true;
        this.cinemaModel.traverse((child: any) => {
          if (child.visible !== undefined) {
            child.visible = true;
          }
        });

        // check if model is in scene
        const isInScene = this.scene.children.includes(this.cinemaModel);
        console.log('Cinema model in scene:', isInScene);
        console.log('Scene children count:', this.scene.children.length);

        // if not add it
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

  private async verifyFiles(): Promise<void> {
    await this.modelLoaderService.verifyFiles();
  }

  private generateSeats(): void {
    console.log('Generating seats with config:', this.seatConfig);
    const seats = this.seatGeneratorService.generateSeats(
      this.scene,
      this.seatConfig
    );
    console.log(`Generated ${seats.length} seats`);
  }

  private clearSeats(): void {
    this.seatGeneratorService.clearSeats(this.scene);
  }

  // public methods for UI interaction
  public updateSeatConfiguration(): void {
    console.log('Updating seat configuration...');
    console.log('Current seat config:', this.seatConfig);

    // update the service with current config
    this.seatConfigService.updateConfig(this.seatConfig);

    this.generateSeats();
  }

  public getSeatCount(): number {
    return this.seatGeneratorService.getSeatCount(this.seatConfig);
  }

  // public methods for seat selection management
  public getSelectedSeats(): any[] {
    return this.seatGeneratorService.getSelectedSeats();
  }

  public getSelectedSeatsCount(): number {
    return this.seatGeneratorService.getSelectedSeatsCount();
  }

  public clearAllSelections(): void {
    this.seatGeneratorService.clearAllSelections();
  }

  // Find and select seat by row and column
  public findAndSelectSeat(row: number, column: number): boolean {
    return this.seatGeneratorService.findAndSelectSeat(row, column);
  }

  // Get seat information
  public getSeatInfo(
    row: number,
    column: number
  ): { found: boolean; info?: any } {
    return this.seatGeneratorService.getSeatInfo(row, column);
  }

  // Find and select seat from UI
  public findSeat(): void {
    console.log(`Finding seat at Row ${this.findSeatRow}, Column ${this.findSeatColumn}`);
    
    if (this.findSeatRow < 1 || this.findSeatRow > this.seatConfig.rows) {
      console.error(`Invalid row number: ${this.findSeatRow}. Must be between 1 and ${this.seatConfig.rows}`);
      return;
    }
    
    if (this.findSeatColumn < 1 || this.findSeatColumn > this.seatConfig.seatsPerRow) {
      console.error(`Invalid column number: ${this.findSeatColumn}. Must be between 1 and ${this.seatConfig.seatsPerRow}`);
      return;
    }
    
    // Find and select the seat
    const found = this.findAndSelectSeat(this.findSeatRow, this.findSeatColumn);
    
    if (found) {
      // Get seat info for display
      const seatInfoResult = this.getSeatInfo(this.findSeatRow, this.findSeatColumn);
      if (seatInfoResult.found) {
        this.seatInfo = seatInfoResult.info;
        console.log('Seat info updated:', this.seatInfo);
      }
    } else {
      this.seatInfo = null;
      console.log('Seat not found');
    }
  }

  // Move camera to selected seat POV
  public moveCameraToSelectedSeat(): void {
    const selectedSeats = this.getSelectedSeats();
    
    if (selectedSeats.length === 0) {
      console.log('No seats selected. Please select a seat first.');
      return;
    }
    
    // Use the first selected seat
    const selectedSeat = selectedSeats[0];
    console.log(`Moving camera to seat: Row ${selectedSeat.row}, Seat ${selectedSeat.seat}`);
    
    // Store original FOV to restore later
    const originalFOV = this.camera.fov;
    
    // Calculate dynamic FOV based on seat position
    const dynamicFOV = this.calculateSeatFOV(selectedSeat);
    
    // Change FOV to simulate realistic seat perspective
    this.camera.fov = dynamicFOV;
    this.camera.updateProjectionMatrix();
    
    // Get seat position
    const seatPosition = selectedSeat.seatObject.position.clone();
    
    // Calculate POV position (slightly above and in front of the seat)
    const povPosition = new THREE.Vector3(
      seatPosition.x, // Same X position as seat
      seatPosition.y + 0.8, // Slightly above the seat (head level)
      seatPosition.z + 0.3  // Slightly in front of the seat
    );
    
    // Move camera to POV position
    this.camera.position.copy(povPosition);
    
    // Look towards the screen (positive Z direction for forward view)
    const lookAtPosition = new THREE.Vector3(
      seatPosition.x, // Look straight ahead
      seatPosition.y + 0.5, // Look at screen level
      seatPosition.z + 5  // Look forward (positive Z)
    );
    
    this.camera.lookAt(lookAtPosition);
    
    // Rotate camera 180 degrees on Y axis
    this.camera.rotateY(Math.PI); // 180 degrees = π radians
    
    // Update controls target
    if (this.controls) {
      this.controls.target.copy(lookAtPosition);
      this.controls.update();
    }
    
    // Store original FOV for restoration
    (this.camera as any).originalFOV = originalFOV;
    
    // Deselect the seat after moving to its POV
    this.seatGeneratorService.deselectSeat(selectedSeat.seatObject);
    
    console.log(`Camera moved to seat POV with 180° Y rotation and ${dynamicFOV}° FOV. Seat deselected.`);
  }

  // Calculate dynamic FOV based on seat position
  private calculateSeatFOV(selectedSeat: any): number {
    const row = selectedSeat.row;
    const totalRows = this.seatConfig.rows;
    
    // Front rows get wider FOV (more immersive)
    // Back rows get narrower FOV (more focused)
    const rowRatio = row / totalRows;
    
    // FOV ranges from 100° (front rows) to 70° (back rows)
    const minFOV = 70;
    const maxFOV = 100;
    const dynamicFOV = maxFOV - (rowRatio * (maxFOV - minFOV));
    
    console.log(`Row ${row}/${totalRows}: FOV = ${dynamicFOV.toFixed(1)}°`);
    return dynamicFOV;
  }

  // Return to normal camera view
  public returnToNormalView(): void {
    // Restore original FOV if it was changed
    if ((this.camera as any).originalFOV !== undefined) {
      this.camera.fov = (this.camera as any).originalFOV;
      this.camera.updateProjectionMatrix();
      delete (this.camera as any).originalFOV;
      console.log('FOV restored to original value');
    }
    
    // Reset camera to default position
    this.cameraService.resetCameraToStart();
    console.log('Returned to normal camera view');
  }

  // Toggle admin panel visibility
  public toggleAdminPanel(): void {
    this.isAdminPanelVisible = !this.isAdminPanelVisible;
    console.log(`Admin panel ${this.isAdminPanelVisible ? 'shown' : 'hidden'}`);
  }

  private setupClickHandler(): void {
    this.clickDetectionService.setupClickHandler(
      this.renderer,
      this.camera,
      this.scene,
      (seat: THREE.Group) => {
        const isSelected = this.seatGeneratorService.selectSeat(seat);
        console.log(
          `seat clicked - selection state: ${
            isSelected ? 'selected' : 'deselected'
          }`
        );
      }
    );
  }

  private setupKeyboardDebug(): void {
    const callbacks = this.keyboardControlsService.createDebugCallbacks(
      this.debugService,
      this.camera,
      this.cinemaModel,
      this.controls,
      this.cameraService,
      this.seatGeneratorService
    );

    // add custom callbacks for this component
    callbacks['g'] = () => {
      this.generateSeats();
      console.log('Seats regenerated');
    };

    callbacks['t'] = () => {
      this.clickDetectionService.testSeatDetection(this.camera, this.scene);
    };

    // Add POV camera control
    callbacks['o'] = () => {
      this.moveCameraToSelectedSeat();
      console.log('O key pressed - moving to seat POV');
    };

    // Add return to normal view control
    callbacks['n'] = () => {
      this.returnToNormalView();
      console.log('N key pressed - returning to normal view');
    };

    // Add admin panel toggle control
    callbacks['h'] = () => {
      this.toggleAdminPanel();
      console.log('H key pressed - toggling admin panel');
    };

    this.keyboardControlsService.setupKeyboardDebug(callbacks);
  }

  private onWindowResize(): void {
    this.rendererService.onWindowResize(this.renderer, this.camera);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    // update controls
    this.cameraService.updateCamera();

    // update model animations
    if (this.mixer) {
      this.mixer.update(delta);
    }

    // render scene
    this.rendererService.render(this.renderer, this.scene, this.camera);
  }
}
