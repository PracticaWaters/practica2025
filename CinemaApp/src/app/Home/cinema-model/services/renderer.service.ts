import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { RendererConfig, DEFAULT_RENDERER_CONFIG } from '../config/cinema-config';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  private config: RendererConfig = DEFAULT_RENDERER_CONFIG;

  createRenderer(config?: RendererConfig): THREE.WebGLRenderer {
    if (config) {
      this.config = config;
    }
    // Renderer setup - high quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: this.config.antialias, 
      alpha: this.config.alpha,
      powerPreference: this.config.powerPreference as any
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.shadowMap.enabled = this.config.shadowMapEnabled;
    renderer.shadowMap.type = this.config.shadowMapType;
    renderer.shadowMap.autoUpdate = true;
    renderer.outputColorSpace = this.config.outputColorSpace;
    renderer.toneMapping = this.config.toneMapping;
    renderer.toneMappingExposure = this.config.toneMappingExposure;

    return renderer;
  }

  createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    return scene;
  }

  onWindowResize(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    renderer.render(scene, camera);
  }
} 