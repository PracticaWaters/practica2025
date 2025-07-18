import * as THREE from 'three';

export interface CameraConfig {
  fov: number;
  near: number;
  far: number;
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  enableZoom: boolean;
  enablePan: boolean;
  minPolarAngle: number;
  maxPolarAngle: number;
}

export interface LightingConfig {
  ambientIntensity: number;
  directionalIntensity: number;
  screenLightIntensity: number;
  spotLightIntensity: number;
  pointLightIntensity: number;
  emergencyLightIntensity: number;
  accentLightIntensity: number;
  floorLightIntensity: number;
  reflectionLightIntensity: number;
  extraLightIntensity: number;
}

export interface RendererConfig {
  antialias: boolean;
  alpha: boolean;
  powerPreference: string;
  shadowMapEnabled: boolean;
  shadowMapType: THREE.ShadowMapType;
  outputColorSpace: THREE.ColorSpace;
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
}

export interface ModelConfig {
  scale: number;
  enableShadows: boolean;
  enableAnimations: boolean;
}

export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  fov: 60,
  near: 0.1,
  far: 1000,
  startPosition: new THREE.Vector3(0, 2, 3), // Poziția de început - în fața cinematografului
  endPosition: new THREE.Vector3(0, 2, -3), // Poziția de sfârșit - în spatele cinematografului
  enableZoom: false,
  enablePan: false,
  minPolarAngle: Math.PI * 0.1,
  maxPolarAngle: Math.PI * 0.7
};

export const DEFAULT_LIGHTING_CONFIG: LightingConfig = {
  ambientIntensity: 2.0,
  directionalIntensity: 4.0,
  screenLightIntensity: 6.0,
  spotLightIntensity: 5.0,
  pointLightIntensity: 4.0,
  emergencyLightIntensity: 2.0,
  accentLightIntensity: 3.0,
  floorLightIntensity: 2.0,
  reflectionLightIntensity: 3.0,
  extraLightIntensity: 4.0
};

export const DEFAULT_RENDERER_CONFIG: RendererConfig = {
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
  shadowMapEnabled: true,
  shadowMapType: THREE.PCFSoftShadowMap,
  outputColorSpace: THREE.SRGBColorSpace,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 2.0
};

export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  scale: 15,
  enableShadows: true,
  enableAnimations: true
}; 