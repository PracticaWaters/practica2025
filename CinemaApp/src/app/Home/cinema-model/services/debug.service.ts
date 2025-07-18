import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  setupKeyboardDebug(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'x') {
        this.logCameraData();
      }
    });
  }

  private logCameraData(): void {
    console.log('=== X KEY PRESSED - CURRENT CAMERA STATE ===');
    console.log('Timestamp:', new Date().toISOString());
    
    // This will be called from the component with camera reference
    console.log('Press X to log camera data - implement in component');
    console.log('==========================================');
  }

  logCameraInfo(camera: THREE.PerspectiveCamera, model: THREE.Group, controls: OrbitControls): void {
    console.log('=== X KEY PRESSED - CURRENT CAMERA STATE ===');
    console.log('Timestamp:', new Date().toISOString());
    
    if (camera) {
      console.log('📷 CAMERA POSITION:', {
        x: camera.position.x.toFixed(3),
        y: camera.position.y.toFixed(3),
        z: camera.position.z.toFixed(3)
      });
      console.log('🔄 CAMERA ROTATION:', {
        x: camera.rotation.x.toFixed(3),
        y: camera.rotation.y.toFixed(3),
        z: camera.rotation.z.toFixed(3)
      });
      console.log('📐 CAMERA FOV:', camera.fov);
      console.log('📏 CAMERA ASPECT:', camera.aspect);
    }
    
    if (model) {
      console.log('🎬 MODEL POSITION:', {
        x: model.position.x.toFixed(3),
        y: model.position.y.toFixed(3),
        z: model.position.z.toFixed(3)
      });
    }
    
    if (controls) {
      console.log('🎮 CONTROLS STATE:', {
        enableZoom: controls.enableZoom,
        enablePan: controls.enablePan,
        enableRotate: controls.enableRotate
      });
    }
    
    console.log('⌨️  KEYBOARD COMMANDS:');
    console.log('   X - Log camera info');
    console.log('   R - Reset camera to start position');
    console.log('   C - Toggle controls');
    
    console.log('==========================================');
  }
} 