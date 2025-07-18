import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelConfig, DEFAULT_MODEL_CONFIG } from '../config/cinema-config';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private config: ModelConfig = DEFAULT_MODEL_CONFIG;

  loadModel(scene: THREE.Scene, renderer: THREE.WebGLRenderer, config?: ModelConfig): Promise<THREE.Group> {
    if (config) {
      this.config = config;
    }
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      
      loader.load(
        'assets/home/3d-models/cinema.glb',
        (gltf: any) => {
          const model = gltf.scene;
          
          // Enable shadows and improve material quality for all meshes
          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = this.config.enableShadows;
              child.receiveShadow = this.config.enableShadows;
              
              // Improve material quality
              if (child.material) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          // Scale model to be larger for better visibility
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = this.config.scale / maxDim; // Use config scale
          model.scale.setScalar(scale);
          
          // Center the model
          model.position.sub(center.multiplyScalar(scale));

          scene.add(model);
          resolve(model);
        },
        (progress: any) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error: any) => {
          console.error('Error loading model:', error);
          reject(error);
        }
      );
    });
  }

  setupAnimations(model: THREE.Group, gltf: any): THREE.AnimationMixer | null {
    if (this.config.enableAnimations && gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip: any) => {
        mixer.clipAction(clip).play();
      });
      return mixer;
    }
    return null;
  }
} 