import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CameraConfig, DEFAULT_CAMERA_CONFIG } from '../config/cinema-config';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private initialCameraAngle = 0;
  private isScrollStarted = false;
  private scrollProgress = 0;
  private config: CameraConfig = DEFAULT_CAMERA_CONFIG;

  // Custom animation path based on exact positions
  private animationPath: THREE.Vector3[] = [
    this.config.startPosition,
    this.config.endPosition,
  ];

  initializeCamera(renderer: THREE.WebGLRenderer, config?: CameraConfig): THREE.PerspectiveCamera {
    if (config) {
      this.config = config;
      this.animationPath = [this.config.startPosition, this.config.endPosition];
    }

    // Camera setup - closer to the model
    this.camera = new THREE.PerspectiveCamera(
      this.config.fov,
      window.innerWidth / window.innerHeight,
      this.config.near,
      this.config.far
    );
    this.camera.position.copy(this.config.startPosition);

    // Controls setup - rotation only, no zoom
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = this.config.enableZoom;
    this.controls.enablePan = this.config.enablePan;
    this.controls.autoRotate = false;
    // Limit vertical rotation to prevent looking under the object
    this.controls.minPolarAngle = this.config.minPolarAngle;
    this.controls.maxPolarAngle = this.config.maxPolarAngle;

    return this.camera;
  }

  getControls(): OrbitControls {
    return this.controls;
  }

  setupScrollAnimation(rendererContainer: HTMLElement, model: THREE.Group): void {
    const scrollHandler = () => {
      const rect = rendererContainer.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress for the element
      const visibleHeight = Math.min(elementHeight, windowHeight);
      let scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (visibleHeight + windowHeight)
      ));

      this.scrollProgress = scrollProgress;
      
      // If this is the first time scrolling, capture the current camera angle
      if (!this.isScrollStarted && scrollProgress > 0.01) {
        this.captureInitialCameraAngle(model);
        this.isScrollStarted = true;
        // Temporarily disable controls during scroll animation
        this.controls.enableRotate = false;
      }
      
      // Reset if user scrolls back to top
      if (this.isScrollStarted && scrollProgress < 0.01) {
        this.isScrollStarted = false;
        // Re-enable controls when scroll animation ends
        this.controls.enableRotate = true;
      }
      
      // Use custom animation path based on your exact positions
      if (model) {
        // Create a circular path around the model
        const radius = 4; // Distanța de la centrul modelului
        const height = 2; // Înălțimea camerei
        
        // Calculate position on a circle around the model
        const angle = scrollProgress * Math.PI * 2; // O rotație completă
        const newX = Math.sin(angle) * radius;
        const newY = height;
        const newZ = Math.cos(angle) * radius;
        
        this.camera.position.x = newX;
        this.camera.position.y = newY;
        this.camera.position.z = newZ;
        
        // Look at the model center
        this.camera.lookAt(model.position);
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  private captureInitialCameraAngle(model: THREE.Group): void {
    // Calculate current camera angle based on its position relative to model center
    const modelCenter = model.position;
    const cameraToModel = new THREE.Vector3();
    cameraToModel.subVectors(this.camera.position, modelCenter);
    
    // Calculate angle in XZ plane (horizontal rotation)
    this.initialCameraAngle = Math.atan2(cameraToModel.x, cameraToModel.z);
    
    // Ensure angle is positive (0 to 2π)
    if (this.initialCameraAngle < 0) {
      this.initialCameraAngle += Math.PI * 2;
    }
  }

  updateCamera(): void {
    this.controls.update();
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  getScrollProgress(): number {
    return this.scrollProgress;
  }

  getInitialCameraAngle(): number {
    return this.initialCameraAngle;
  }

  isScrollAnimationStarted(): boolean {
    return this.isScrollStarted;
  }

  resetCameraToStart(): void {
    if (this.camera) {
      // Restore original FOV if it was changed
      if ((this.camera as any).originalFOV !== undefined) {
        this.camera.fov = (this.camera as any).originalFOV;
        this.camera.updateProjectionMatrix();
        delete (this.camera as any).originalFOV;
        console.log('FOV restored to original value');
      }
      
      this.camera.position.copy(this.config.startPosition);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  }

  setCameraPosition(position: THREE.Vector3): void {
    if (this.camera) {
      this.camera.position.copy(position);
    }
  }

  getCurrentCameraPosition(): THREE.Vector3 {
    return this.camera ? this.camera.position.clone() : new THREE.Vector3();
  }

  enableControls(enable: boolean): void {
    if (this.controls) {
      this.controls.enableRotate = enable;
      this.controls.enableZoom = enable && this.config.enableZoom;
      this.controls.enablePan = enable && this.config.enablePan;
    }
  }

  isControlsEnabled(): boolean {
    return this.controls ? this.controls.enableRotate : false;
  }
} 