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
  rowHeight: number; // row elevation
  baseHeight: number; // base platform height
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
  providedIn: 'root',
})
export class SeatGeneratorService {
  private chairModel: THREE.Group | null = null;
  private generatedSeats: THREE.Group[] = [];
  private selectedSeats: Set<string> = new Set(); // track selected seats by 'row-seat' key
  private originalMaterials: Map<THREE.Group, THREE.Material[]> = new Map(); // store original mats

  setChairModel(chairModel: THREE.Group): void {
    this.chairModel = chairModel;
    console.log('Chair model set in SeatGeneratorService');
    console.log('Chair model details:', {
      children: chairModel.children.length,
      position: chairModel.position,
      scale: chairModel.scale,
      visible: chairModel.visible,
    });
  }

  generateSeats(scene: THREE.Scene, config: SeatConfig): THREE.Group[] {
    console.log('SeatGeneratorService: Starting seat generation');
    console.log('SeatGeneratorService: Config:', config);
    console.log(
      'SeatGeneratorService: Chair model available:',
      !!this.chairModel
    );

    this.clearSeats(scene);

    if (!this.chairModel) {
      console.error('Chair model not loaded');
      return [];
    }

    const seats: THREE.Group[] = [];
    const startRow = -(config.rows - 1) / 2;
    const startSeat = -(config.seatsPerRow - 1) / 2;

    for (let row = 0; row < config.rows; row++) {
      for (let seat = 0; seat < config.seatsPerRow; seat++) {
        const seatInstance = this.chairModel.clone();

        const x =
          (startSeat + seat) * config.seatSpacing + config.seatOffset - 1.8;
        const z = (startRow + row) * config.rowSpacing + config.rowOffset - 2.2;

        const rowElevation = (config.rows - 1 - row) * config.rowHeight; // inverted seats
        const y = config.baseHeight + rowElevation;

        seatInstance.position.set(x, y, z);

        (seatInstance as any).userData = {
          row: row,
          seat: seat,
          position: { x, y, z },
          rowElevation: rowElevation,
        };

        const originalMaterials: THREE.Material[] = [];
        seatInstance.traverse((child: any) => {
          if (child instanceof THREE.Mesh && child.material) {
            const clonedMaterial = child.material.clone();
            originalMaterials.push(clonedMaterial);

            if (child.material.transparent) {
              child.material.transparent = false;
            }
            if (child.material.opacity < 1) {
              child.material.opacity = 1;
            }

            child.visible = true;
          }
        });
        this.originalMaterials.set(seatInstance, originalMaterials);

        scene.add(seatInstance);
        seats.push(seatInstance);
        console.log(
          `Added seat ${row}-${seat} to scene at position:`,
          seatInstance.position
        );
      }
    }

    this.generatedSeats = seats;
    console.log(`Generated ${seats.length} seats`);
    console.log(
      'Scene children count after seat generation:',
      scene.children.length
    );
    return seats;
  }

  clearSeats(scene: THREE.Scene): void {
    this.generatedSeats.forEach((seat) => {
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

        const rowElevation = row * config.rowHeight;
        const y = config.baseHeight + rowElevation;

        positions.push({
          x,
          y,
          z,
          row: row + 1, // 1-based indexing
          seat: seat + 1,
        });
      }
    }

    return positions;
  }

  getSeatCount(config: SeatConfig): number {
    return config.rows * config.seatsPerRow;
  }

  getSeatAtPosition(
    x: number,
    y: number,
    z: number,
    tolerance: number = 0.5
  ): THREE.Group | null {
    return (
      this.generatedSeats.find((seat) => {
        const pos = seat.position;
        return (
          Math.abs(pos.x - x) < tolerance &&
          Math.abs(pos.y - y) < tolerance &&
          Math.abs(pos.z - z) < tolerance
        );
      }) || null
    );
  }

  getSeatsInRow(row: number): THREE.Group[] {
    return this.generatedSeats.filter((seat) => {
      return (seat as any).userData?.row === row - 1; // conv to 0-based
    });
  }

  getSeatsInColumn(column: number): THREE.Group[] {
    return this.generatedSeats.filter((seat) => {
      return (seat as any).userData?.seat === column - 1; // conv to 0-based
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
      console.log(
        `Seat selected: Row ${userData.row + 1}, Seat ${userData.seat + 1}`
      );
      return true;
    }
  }

  // deselect a seat
  deselectSeat(seatObject: THREE.Group): void {
    const userData = (seatObject as any).userData;
    if (!userData) return;

    const seatKey = `${userData.row}-${userData.seat}`;
    this.selectedSeats.delete(seatKey);
    this.restoreOriginalMaterial(seatObject);
    console.log(
      `Seat deselected: Row ${userData.row + 1}, Seat ${userData.seat + 1}`
    );
  }

  // apply green glow to selected seat
  private applySelectionMaterial(seatObject: THREE.Group): void {
    seatObject.traverse((child: any) => {
      if (child instanceof THREE.Mesh && child.material) {
        // create a new material with green effect
        const glowMaterial = child.material.clone();

        // add green color
        if (glowMaterial.color) {
          glowMaterial.color.setHex(0x00ff00); // green color
        }

        // add emission for glow effect
        if (glowMaterial.emissive) {
          glowMaterial.emissive.setHex(0x00ff00);
          glowMaterial.emissiveIntensity = 0.3;
        }

        // add outline effect -increase mat intens
        glowMaterial.transparent = true;
        glowMaterial.opacity = 0.9;

        child.material = glowMaterial;
      }
    });
  }

  // restore original material
  private restoreOriginalMaterial(seatObject: THREE.Group): void {
    const originalMaterials = this.originalMaterials.get(seatObject);
    if (!originalMaterials) return;

    let materialIndex = 0;
    seatObject.traverse((child: any) => {
      if (
        child instanceof THREE.Mesh &&
        materialIndex < originalMaterials.length
      ) {
        child.material = originalMaterials[materialIndex];
        materialIndex++;
      }
    });
  }

  // get all selected seats
  getSelectedSeats(): SeatSelection[] {
    const selections: SeatSelection[] = [];

    this.generatedSeats.forEach((seat) => {
      const userData = (seat as any).userData;
      if (userData) {
        const seatKey = `${userData.row}-${userData.seat}`;
        if (this.selectedSeats.has(seatKey)) {
          selections.push({
            row: userData.row + 1,
            seat: userData.seat + 1,
            seatObject: seat,
          });
        }
      }
    });

    return selections;
  }

  // clear all selections
  clearAllSelections(): void {
    this.selectedSeats.clear();
    this.generatedSeats.forEach((seat) => {
      this.restoreOriginalMaterial(seat);
    });
    console.log('All seat selections cleared');
  }

  // get selected seats count
  getSelectedSeatsCount(): number {
    return this.selectedSeats.size;
  }

  // get all generated seats
  getGeneratedSeats(): THREE.Group[] {
    return this.generatedSeats;
  }

  // find and select seat by row and column numbers
  findAndSelectSeat(rowNumber: number, columnNumber: number): boolean {
    console.log(`Looking for seat at Row ${rowNumber}, Column ${columnNumber}`);

    // conv to 0-based index
    const rowIndex = rowNumber - 1;
    const columnIndex = columnNumber - 1;

    const targetSeat = this.generatedSeats.find((seat) => {
      const userData = (seat as any).userData;
      return (
        userData && userData.row === rowIndex && userData.seat === columnIndex
      );
    });

    if (targetSeat) {
      console.log(`Found seat at Row ${rowNumber}, Column ${columnNumber}`);
      const isSelected = this.selectSeat(targetSeat);
      console.log(
        `Seat selection result: ${isSelected ? 'selected' : 'deselected'}`
      );
      return true;
    } else {
      console.log(`No seat found at Row ${rowNumber}, Column ${columnNumber}`);
      console.log('Available seats:');
      this.generatedSeats.forEach((seat, index) => {
        const userData = (seat as any).userData;
        if (userData) {
          console.log(
            `Seat ${index}: Row ${userData.row + 1}, Column ${
              userData.seat + 1
            }`
          );
        }
      });
      return false;
    }
  }

  getSeatInfo(
    rowNumber: number,
    columnNumber: number
  ): { found: boolean; info?: any } {
    const rowIndex = rowNumber - 1;
    const columnIndex = columnNumber - 1;

    const targetSeat = this.generatedSeats.find((seat) => {
      const userData = (seat as any).userData;
      return (
        userData && userData.row === rowIndex && userData.seat === columnIndex
      );
    });

    if (targetSeat) {
      const userData = (targetSeat as any).userData;
      const seatKey = `${userData.row}-${userData.seat}`;
      const isSelected = this.selectedSeats.has(seatKey);

      return {
        found: true,
        info: {
          row: userData.row + 1,
          column: userData.seat + 1,
          position: userData.position,
          isSelected: isSelected,
        },
      };
    }

    return { found: false };
  }
}
