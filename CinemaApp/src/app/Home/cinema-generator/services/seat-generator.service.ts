import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface SeatConfig {
  rows: number;
  seatsPerRow: number;
  rowSpacing: number;
  seatSpacing: number;
  rowOffset: number;
  seatOffset: number;
  scale: number;
}

export interface SeatPosition {
  x: number;
  y: number;
  z: number;
  row: number;
  seat: number;
}

export interface SeatSelection {
  row: number;
  seat: number;
  seatObject: THREE.Group;
}

@Injectable({
  providedIn: 'root'
})
export class SeatGeneratorService {

  private chairModel: THREE.Group | null = null;
  private generatedSeats: THREE.Group[] = [];
  private selectedSeats: Set<string> = new Set(); // Track selected seats by "row-seat" key
  private originalMaterials: Map<THREE.Group, THREE.Material[]> = new Map(); // Store original materials

  async loadChairModel(renderer: THREE.WebGLRenderer, scale: number = 0.8): Promise<THREE.Group> {
    if (this.chairModel) {
      return this.chairModel.clone();
    }

    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      
      loader.load(
        '/assets/home/3d-models/chair.glb',
        (gltf: any) => {
          const chair = gltf.scene;
          
          // Enable shadows and improve material quality
          chair.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                  child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }
              }
            }
          });

          // Scale chair model
          chair.scale.setScalar(scale);
          
          this.chairModel = chair;
          resolve(chair.clone());
        },
        (progress: any) => {
          console.log('Loading chair progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error: any) => {
          console.error('Error loading chair model:', error);
          reject(error);
        }
      );
    });
  }

  generateSeats(scene: THREE.Scene, config: SeatConfig): THREE.Group[] {
    // Clear existing seats
    this.clearSeats(scene);

    if (!this.chairModel) {
      console.error('Chair model not loaded');
      return [];
    }

    const seats: THREE.Group[] = [];
    const startRow = -(config.rows - 1) / 2;
    const startSeat = -(config.seatsPerRow - 1) / 2;

    // Generate seats
    for (let row = 0; row < config.rows; row++) {
      for (let seat = 0; seat < config.seatsPerRow; seat++) {
        const seatInstance = this.chairModel.clone();
        
        // Calculate position
        const x = (startSeat + seat) * config.seatSpacing + config.seatOffset;
        const z = (startRow + row) * config.rowSpacing + config.rowOffset;
        const y = 0; // Ground level
        
        seatInstance.position.set(x, y, z);
        
        // Add metadata for identification
        (seatInstance as any).userData = {
          row: row,
          seat: seat,
          position: { x, y, z }
        };
        
        // Store original materials for this seat and ensure they're raycaster-friendly
        const originalMaterials: THREE.Material[] = [];
        seatInstance.traverse((child: any) => {
          if (child instanceof THREE.Mesh && child.material) {
            // Clone the material
            const clonedMaterial = child.material.clone();
            originalMaterials.push(clonedMaterial);
            
            // Ensure the material is raycaster-friendly
            if (child.material.transparent) {
              child.material.transparent = false;
            }
            if (child.material.opacity < 1) {
              child.material.opacity = 1;
            }
            
            // Make sure the mesh is visible for raycaster
            child.visible = true;
          }
        });
        this.originalMaterials.set(seatInstance, originalMaterials);
        
        // Add to scene and track
        scene.add(seatInstance);
        seats.push(seatInstance);
      }
    }

    this.generatedSeats = seats;
    console.log(`Generated ${seats.length} seats`);
    return seats;
  }

  clearSeats(scene: THREE.Scene): void {
    // Remove all generated seats from scene
    this.generatedSeats.forEach(seat => {
      scene.remove(seat);
    });
    this.generatedSeats = [];
  }

  getSeatPositions(config: SeatConfig): SeatPosition[] {
    const positions: SeatPosition[] = [];
    const startRow = -(config.rows - 1) / 2;
    const startSeat = -(config.seatsPerRow - 1) / 2;

    for (let row = 0; row < config.rows; row++) {
      for (let seat = 0; seat < config.seatsPerRow; seat++) {
        const x = (startSeat + seat) * config.seatSpacing + config.seatOffset;
        const z = (startRow + row) * config.rowSpacing + config.rowOffset;
        const y = 0;

        positions.push({
          x,
          y,
          z,
          row: row + 1, // 1-based indexing
          seat: seat + 1
        });
      }
    }

    return positions;
  }

  getSeatCount(config: SeatConfig): number {
    return config.rows * config.seatsPerRow;
  }

  getSeatAtPosition(x: number, y: number, z: number, tolerance: number = 0.5): THREE.Group | null {
    return this.generatedSeats.find(seat => {
      const pos = seat.position;
      return Math.abs(pos.x - x) < tolerance &&
             Math.abs(pos.y - y) < tolerance &&
             Math.abs(pos.z - z) < tolerance;
    }) || null;
  }

  getSeatsInRow(row: number): THREE.Group[] {
    return this.generatedSeats.filter(seat => {
      return (seat as any).userData?.row === row - 1; // Convert to 0-based
    });
  }

  getSeatsInColumn(column: number): THREE.Group[] {
    return this.generatedSeats.filter(seat => {
      return (seat as any).userData?.seat === column - 1; // Convert to 0-based
    });
  }

  // Method to handle seat selection
  selectSeat(seatObject: THREE.Group): boolean {
    const userData = (seatObject as any).userData;
    if (!userData) return false;

    const seatKey = `${userData.row}-${userData.seat}`;
    
    if (this.selectedSeats.has(seatKey)) {
      // Deselect seat
      this.deselectSeat(seatObject);
      return false;
    } else {
      // Select seat
      this.selectedSeats.add(seatKey);
      this.applySelectionMaterial(seatObject);
      console.log(`Seat selected: Row ${userData.row + 1}, Seat ${userData.seat + 1}`);
      return true;
    }
  }

  // Method to deselect a seat
  deselectSeat(seatObject: THREE.Group): void {
    const userData = (seatObject as any).userData;
    if (!userData) return;

    const seatKey = `${userData.row}-${userData.seat}`;
    this.selectedSeats.delete(seatKey);
    this.restoreOriginalMaterial(seatObject);
    console.log(`Seat deselected: Row ${userData.row + 1}, Seat ${userData.seat + 1}`);
  }

  // Apply green glow material to selected seat
  private applySelectionMaterial(seatObject: THREE.Group): void {
    seatObject.traverse((child: any) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Create a new material with green glow effect
        const glowMaterial = child.material.clone();
        
        // Add green color with emission
        if (glowMaterial.color) {
          glowMaterial.color.setHex(0x00ff00); // Green color
        }
        
        // Add emission for glow effect
        if (glowMaterial.emissive) {
          glowMaterial.emissive.setHex(0x00ff00);
          glowMaterial.emissiveIntensity = 0.3;
        }
        
        // Add outline effect by increasing material intensity
        glowMaterial.transparent = true;
        glowMaterial.opacity = 0.9;
        
        child.material = glowMaterial;
      }
    });
  }

  // Restore original material
  private restoreOriginalMaterial(seatObject: THREE.Group): void {
    const originalMaterials = this.originalMaterials.get(seatObject);
    if (!originalMaterials) return;

    let materialIndex = 0;
    seatObject.traverse((child: any) => {
      if (child instanceof THREE.Mesh && materialIndex < originalMaterials.length) {
        child.material = originalMaterials[materialIndex];
        materialIndex++;
      }
    });
  }

  // Get all selected seats
  getSelectedSeats(): SeatSelection[] {
    const selections: SeatSelection[] = [];
    
    this.generatedSeats.forEach(seat => {
      const userData = (seat as any).userData;
      if (userData) {
        const seatKey = `${userData.row}-${userData.seat}`;
        if (this.selectedSeats.has(seatKey)) {
          selections.push({
            row: userData.row + 1,
            seat: userData.seat + 1,
            seatObject: seat
          });
        }
      }
    });
    
    return selections;
  }

  // Clear all selections
  clearAllSelections(): void {
    this.selectedSeats.clear();
    this.generatedSeats.forEach(seat => {
      this.restoreOriginalMaterial(seat);
    });
    console.log('All seat selections cleared');
  }

  // Get selected seats count
  getSelectedSeatsCount(): number {
    return this.selectedSeats.size;
  }

  // Get all generated seats
  getGeneratedSeats(): THREE.Group[] {
    return this.generatedSeats;
  }
} 