import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class KeyboardControlsService {
  private debugCallbacks: { [key: string]: () => void } = {};

  setupKeyboardDebug(callbacks: { [key: string]: () => void }): void {
    this.debugCallbacks = callbacks;

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();

      if (this.debugCallbacks[key]) {
        this.debugCallbacks[key]();
      }
    });
  }

  // predef callbacks for ops
  createDebugCallbacks(
    debugService: any,
    camera: THREE.Camera,
    cinemaModel: THREE.Group,
    controls: any,
    cameraService: any,
    seatGeneratorService: any
  ) {
    return {
      x: () => {
        debugService.logCameraInfo(camera, cinemaModel, controls);
      },
      r: () => {
        cameraService.resetCameraToStart();
      },
      c: () => {
        const currentState = cameraService.isControlsEnabled();
        cameraService.enableControls(!currentState);
        console.log('Controls enabled:', !currentState);
      },
      g: () => {
        console.log('Regenerate seats');
        // This will be handled by the component
      },
      s: () => {
        seatGeneratorService.clearAllSelections();
        console.log('All seat selections cleared');
      },
      t: () => {
        console.log('Test seat detection');
        // This will be handled by the component
      },
    };
  }
}
