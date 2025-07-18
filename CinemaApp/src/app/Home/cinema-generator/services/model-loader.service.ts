import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Injectable({
  providedIn: 'root',
})
export class ModelLoaderService {
  async loadCinemaModel(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene
  ): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();

      console.log('Starting to load cinema_e model...');

      loader.load(
        '/assets/home/3d-models/cinema_e.glb',
        (gltf: any) => {
          console.log('Cinema model loaded successfully --');
          const model = gltf.scene;

          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // improve material quality
              if (child.material) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.anisotropy =
                    renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          // center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          console.log('Cinema_e model dimensions:', size);
          console.log('Cinema_e model center:', center);

          // scale model
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 15 / maxDim;
          model.scale.setScalar(scale);

          // center the model
          model.position.sub(center.multiplyScalar(scale));

          console.log('Applied scale to cinema_e:', scale);
          console.log('Final cinema_e position:', model.position);

          scene.add(model);
          console.log('Cinema_e model added to scene');

          resolve(model);
        },
        (progress: any) => {
          const percent = (progress.loaded / progress.total) * 100;
          console.log('Loading cinema_e progress:', percent.toFixed(1) + '%');
        },
        (error: any) => {
          console.error('Error loading cinema_e model:', error);
          console.error('Error details:', {
            message: error.message,
            type: error.type,
            url: error.url,
          });
          reject(error);
        }
      );
    });
  }

  async loadChairModel(
    renderer: THREE.WebGLRenderer,
    scale: number = 0.8
  ): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();

      loader.load(
        '/assets/home/3d-models/chair.glb',
        (gltf: any) => {
          const chair = gltf.scene;

          // enable shadows and improve material quality
          chair.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              if (child.material) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.anisotropy =
                    renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          // scale chair model
          chair.scale.setScalar(scale);

          resolve(chair);
        },
        (progress: any) => {
          console.log(
            'Loading chair progress:',
            (progress.loaded / progress.total) * 100 + '%'
          );
        },
        (error: any) => {
          console.error('Error loading chair model:', error);
          reject(error);
        }
      );
    });
  }

  async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Error checking file ${url}:`, error);
      return false;
    }
  }

  async verifyFiles(): Promise<void> {
    const files = [
      '/assets/home/3d-models/cinema_e.glb',
      '/assets/home/3d-models/chair.glb',
      '/assets/home/3d-models/cinema.glb',
    ];

    for (const file of files) {
      const exists = await this.checkFileExists(file);
      console.log(`File ${file} exists:`, exists);
    }
  }
}
