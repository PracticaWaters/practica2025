import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SeatGeneratorService } from './seat-generator.service';

@Injectable({
  providedIn: 'root',
})
export class ClickDetectionService {
  private raycaster!: THREE.Raycaster;
  private mouse!: THREE.Vector2;

  constructor(private seatGeneratorService: SeatGeneratorService) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  setupClickHandler(
    renderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
    callback: (seat: THREE.Group) => void
  ): void {
    console.log('Setting up click handler...');
    if (renderer && renderer.domElement) {
      renderer.domElement.addEventListener('click', (event) => {
        console.log('Click detected on renderer!');
        this.handleMouseClick(event, renderer, camera, scene, callback);
      });
      console.log('Click handler added successfully');
    } else {
      console.error('Renderer or domElement not available for click handler');
    }
  }

  private handleMouseClick(
    event: MouseEvent,
    renderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
    callback: (seat: THREE.Group) => void
  ): void {
    console.log('Mouse click event triggered');

    // calculate mouse position in normalized device coordinates
    const rect = renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    console.log('Mouse coordinates:', { x: this.mouse.x, y: this.mouse.y });

    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, camera);

    // get all seats from scene
    const seats = this.seatGeneratorService.getGeneratedSeats();
    console.log('Available seats for intersection:', seats.length);

    // get all meshes from seats for better intersection detection
    const allMeshes: THREE.Mesh[] = [];
    seats.forEach((seat, seatIndex) => {
      seat.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          allMeshes.push(child);
          // add seat reference to mesh for easier identification
          (child as any).seatIndex = seatIndex;
        }
      });
    });
    console.log('Total meshes for intersection:', allMeshes.length);

    // also try intersecting with the seat groups directly
    const intersectsWithGroups = this.raycaster.intersectObjects(seats, true);
    console.log('Intersections with seat groups:', intersectsWithGroups.length);

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(allMeshes, true);
    console.log('Intersections with meshes found:', intersects.length);

    // try both approaches-meshes and groups
    let clickedSeat: THREE.Group | null = null;

    // try with meshes
    if (intersects.length > 0) {
      console.log('First mesh intersection:', intersects[0]);

      for (const intersect of intersects) {
        let currentObject: any = intersect.object;
        console.log('Checking mesh object:', currentObject);

        // if mesh - find its parent seat group
        while (
          currentObject &&
          !(currentObject as any).userData?.row !== undefined
        ) {
          currentObject = currentObject.parent;
          console.log('Traversing to parent:', currentObject);

          // check- prevent infinite loop
          if (!currentObject || currentObject === scene) {
            break;
          }
        }

        if (
          currentObject &&
          (currentObject as any).userData?.row !== undefined
        ) {
          clickedSeat = currentObject;
          console.log('Found seat object from mesh:', clickedSeat);
          console.log('Seat userData:', (clickedSeat as any).userData);
          break;
        }
      }
    }

    //if no seat found with mesh - try with groups
    if (!clickedSeat && intersectsWithGroups.length > 0) {
      console.log('First group intersection:', intersectsWithGroups[0]);

      for (const intersect of intersectsWithGroups) {
        const currentObject = intersect.object as any;
        console.log('Checking group object:', currentObject);

        if (currentObject && currentObject.userData?.row !== undefined) {
          clickedSeat = currentObject as THREE.Group;
          console.log('Found seat object from group:', clickedSeat);
          console.log('Seat userData:', (clickedSeat as any).userData);
          break;
        }
      }
    }

    if (clickedSeat) {
      console.log('Seat clicked! Calling callback...');
      callback(clickedSeat);
    } else {
      console.log('No valid seat object found in intersection');
      console.log('Available seats with userData:');
      seats.forEach((seat, index) => {
        if ((seat as any).userData) {
          console.log(`Seat ${index}:`, (seat as any).userData);
        }
      });

      // Debug: check if seats are actually in the scene
      console.log('Seats in scene check:');
      seats.forEach((seat, index) => {
        const isInScene = scene.children.includes(seat);
        console.log(`Seat ${index} in scene:`, isInScene);
      });

      // alternativ: find closest seat to mouse position
      console.log('=== Trying alternative approach ===');
      const closestSeat = this.findClosestSeatToMouse(
        this.mouse,
        seats,
        camera
      );
      if (closestSeat) {
        console.log('Found closest seat:', closestSeat);
        callback(closestSeat);
      }
    }
  }

  private findClosestSeatToMouse(
    mouse: THREE.Vector2,
    seats: THREE.Group[],
    camera: THREE.Camera
  ): THREE.Group | null {
    let closestSeat: THREE.Group | null = null;
    let closestDistance = Infinity;

    seats.forEach((seat) => {
      // conv seat world position to screen coordinates
      const seatScreenPosition = new THREE.Vector3();
      seat.getWorldPosition(seatScreenPosition);
      seatScreenPosition.project(camera);

      // calculate distance between mouse and seat screen position
      const distance = Math.sqrt(
        Math.pow(mouse.x - seatScreenPosition.x, 2) +
          Math.pow(mouse.y - seatScreenPosition.y, 2)
      );

      // if is small enough (click area)
      if (distance < 0.1 && distance < closestDistance) {
        closestDistance = distance;
        closestSeat = seat;
      }
    });

    console.log('Closest seat distance:', closestDistance);
    return closestSeat;
  }

  testSeatDetection(camera: THREE.Camera, scene: THREE.Scene): void {
    console.log('=== Testing Seat Detection ===');
    const seats = this.seatGeneratorService.getGeneratedSeats();
    console.log('Total seats:', seats.length);

    if (seats.length > 0) {
      const firstSeat = seats[0];
      console.log('First seat:', firstSeat);
      console.log('First seat userData:', (firstSeat as any).userData);
      console.log('First seat position:', firstSeat.position);
      console.log('First seat visible:', firstSeat.visible);

      // check if seat has meshes
      let meshCount = 0;
      firstSeat.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          meshCount++;
          console.log(`Mesh ${meshCount}:`, child);
          console.log(`Mesh visible:`, child.visible);
          console.log(`Mesh material:`, child.material);
        }
      });
      console.log('Mesh count in first seat:', meshCount);

      // test raycaster with a simple ray
      console.log('=== Testing Raycaster ===');
      const testRay = new THREE.Raycaster();
      const testMouse = new THREE.Vector2(0, 0); // Center of screen
      testRay.setFromCamera(testMouse, camera);

      const intersects = testRay.intersectObjects(seats, true);
      console.log('Test ray intersections with seats:', intersects.length);

      const allMeshes: THREE.Mesh[] = [];
      seats.forEach((seat) => {
        seat.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            allMeshes.push(child);
          }
        });
      });

      const meshIntersects = testRay.intersectObjects(allMeshes, true);
      console.log('Test ray intersections with meshes:', meshIntersects.length);
    }
  }
}
