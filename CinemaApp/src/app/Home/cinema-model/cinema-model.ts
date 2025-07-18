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
  DebugService 
} from './services';

@Component({
  selector: 'app-cinema-model',
  standalone: false,
  templateUrl: './cinema-model.html',
  styleUrl: './cinema-model.css'
})
export class CinemaModel implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls: any;
  public model!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private animationId!: number;

  constructor(
    private cameraService: CameraService,
    private lightingService: LightingService,
    private modelService: ModelService,
    private rendererService: RendererService,
    private debugService: DebugService
  ) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.loadModel();
    this.setupKeyboardDebug();
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
    // Create scene and renderer using services
    this.scene = this.rendererService.createScene();
    this.renderer = this.rendererService.createRenderer();
    
    // Initialize camera using service
    this.camera = this.cameraService.initializeCamera(this.renderer);
    this.controls = this.cameraService.getControls();

    // Setup lighting using service
    this.lightingService.setupLighting(this.scene);

    // Add renderer to DOM
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private async loadModel(): Promise<void> {
    try {
      this.model = await this.modelService.loadModel(this.scene, this.renderer);
      this.cameraService.setupScrollAnimation(this.rendererContainer.nativeElement, this.model);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  private setupKeyboardDebug(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'x') {
        this.debugService.logCameraInfo(this.camera, this.model, this.controls);
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
