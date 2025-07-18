import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { LightingConfig, DEFAULT_LIGHTING_CONFIG } from '../config/cinema-config';

@Injectable({
  providedIn: 'root'
})
export class LightingService {
  private config: LightingConfig = DEFAULT_LIGHTING_CONFIG;

  setupLighting(scene: THREE.Scene, config?: LightingConfig): void {
    if (config) {
      this.config = config;
    }
    // Bright ambient lighting for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, this.config.ambientIntensity);
    scene.add(ambientLight);

    // Very bright main lighting
    const mainLight = new THREE.DirectionalLight(0xffffff, this.config.directionalIntensity);
    mainLight.position.set(0, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096;
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.bias = -0.0001;
    mainLight.shadow.normalBias = 0.02;
    scene.add(mainLight);

    // Screen glow - very bright and focused
    const screenLight = new THREE.SpotLight(0xffffff, 6.0, 15, Math.PI / 6, 0.5, 1);
    screenLight.position.set(0, 4, -3);
    screenLight.target.position.set(0, 0, -2);
    screenLight.castShadow = true;
    screenLight.shadow.mapSize.width = 2048;
    screenLight.shadow.mapSize.height = 2048;
    scene.add(screenLight);
    scene.add(screenLight.target);

    // Cinema hall lighting - very bright spotlights
    const spotLight1 = new THREE.SpotLight(0xffffff, 5.0, 10, Math.PI / 8, 0.3, 1);
    spotLight1.position.set(-3, 5, 0);
    spotLight1.target.position.set(-2, 0, 0);
    spotLight1.castShadow = true;
    scene.add(spotLight1);
    scene.add(spotLight1.target);

    const spotLight2 = new THREE.SpotLight(0xffffff, 5.0, 10, Math.PI / 8, 0.3, 1);
    spotLight2.position.set(3, 5, 0);
    spotLight2.target.position.set(2, 0, 0);
    spotLight2.castShadow = true;
    scene.add(spotLight2);
    scene.add(spotLight2.target);

    const spotLight3 = new THREE.SpotLight(0xffffff, 5.0, 10, Math.PI / 8, 0.3, 1);
    spotLight3.position.set(0, 5, 3);
    spotLight3.target.position.set(0, 0, 2);
    spotLight3.castShadow = true;
    scene.add(spotLight3);
    scene.add(spotLight3.target);

    // Aisle lighting - very bright focused on walkways
    const aisleLight1 = new THREE.SpotLight(0xffffff, 4.0, 8, Math.PI / 12, 0.2, 1);
    aisleLight1.position.set(-1.5, 3, 0);
    aisleLight1.target.position.set(-1.5, 0, 0);
    scene.add(aisleLight1);
    scene.add(aisleLight1.target);

    const aisleLight2 = new THREE.SpotLight(0xffffff, 4.0, 8, Math.PI / 12, 0.2, 1);
    aisleLight2.position.set(1.5, 3, 0);
    aisleLight2.target.position.set(1.5, 0, 0);
    scene.add(aisleLight2);
    scene.add(aisleLight2.target);

    // Emergency exit lighting - bright red glow
    const emergencyLight1 = new THREE.PointLight(0xff3333, 2.0, 6);
    emergencyLight1.position.set(-4, 1.5, -4);
    scene.add(emergencyLight1);

    const emergencyLight2 = new THREE.PointLight(0xff3333, 2.0, 6);
    emergencyLight2.position.set(4, 1.5, -4);
    scene.add(emergencyLight2);

    // Accent lighting - bright warm lights
    const accentLight1 = new THREE.PointLight(0xffaa44, 3.0, 6);
    accentLight1.position.set(-2, 2, 2);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xffaa44, 3.0, 6);
    accentLight2.position.set(2, 2, 2);
    scene.add(accentLight2);

    // Floor lighting - bright glow from below
    const floorLight1 = new THREE.PointLight(0xffffff, 2.0, 4);
    floorLight1.position.set(-2, 0.1, 0);
    scene.add(floorLight1);

    const floorLight2 = new THREE.PointLight(0xffffff, 2.0, 4);
    floorLight2.position.set(2, 0.1, 0);
    scene.add(floorLight2);

    // Screen reflection lighting - bright
    const reflectionLight = new THREE.PointLight(0xffffff, 3.0, 6);
    reflectionLight.position.set(0, 1, 1);
    scene.add(reflectionLight);

    // Additional bright lights for complete illumination
    const extraLight1 = new THREE.PointLight(0xffffff, 4.0, 8);
    extraLight1.position.set(0, 4, 0);
    scene.add(extraLight1);

    const extraLight2 = new THREE.PointLight(0xffffff, 4.0, 8);
    extraLight2.position.set(-3, 3, 0);
    scene.add(extraLight2);

    const extraLight3 = new THREE.PointLight(0xffffff, 4.0, 8);
    extraLight3.position.set(3, 3, 0);
    scene.add(extraLight3);
  }
} 