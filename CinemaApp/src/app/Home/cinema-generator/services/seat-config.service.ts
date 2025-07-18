import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeatConfig } from './seat-generator.service';

@Injectable({
  providedIn: 'root',
})
export class SeatConfigService {
  private defaultConfig: SeatConfig = {
    rows: 6,
    seatsPerRow: 10,
    rowSpacing: 1,
    seatSpacing: 0.4,
    rowOffset: 0.5,
    seatOffset: 0.4,
    scale: 0.8,
    rowHeight: 0.4, // max row height
    baseHeight: -2.3, // base height
  };

  private configSubject = new BehaviorSubject<SeatConfig>(this.defaultConfig);

  getConfig(): Observable<SeatConfig> {
    return this.configSubject.asObservable();
  }

  getCurrentConfig(): SeatConfig {
    return this.configSubject.value;
  }

  updateConfig(newConfig: Partial<SeatConfig>): void {
    const currentConfig = this.configSubject.value;
    const updatedConfig = { ...currentConfig, ...newConfig };
    this.configSubject.next(updatedConfig);
  }

  resetToDefault(): void {
    this.configSubject.next(this.defaultConfig);
  }

  // validation methods
  validateConfig(config: SeatConfig): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (config.rows < 1 || config.rows > 6) {
      errors.push('Number of rows must be between 1 and 6');
    }

    if (config.seatsPerRow < 1 || config.seatsPerRow > 10) {
      errors.push('Seats per row must be between 1 and 10');
    }

    if (config.rowSpacing < 0.1 || config.rowSpacing > 1) {
      errors.push('Row spacing must be between 0.1 and 1');
    }

    if (config.seatSpacing < 0.1 || config.seatSpacing > 0.4) {
      errors.push('Seat spacing must be between 0.1 and 0.4');
    }

    if (config.scale < 0.1 || config.scale > 0.8) {
      errors.push('Scale must be between 0.1 and 0.8');
    }

    if (config.rowHeight < 0.1 || config.rowHeight > 0.4) {
      errors.push('Row height must be between 0.1 and 0.4');
    }

    if (config.baseHeight < -2.3 || config.baseHeight > 0) {
      errors.push('Base height must be between -2.3 and 0');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // preset configs
  getPresetConfigs(): { name: string; config: SeatConfig }[] {
    return [
      {
        name: 'Small Cinema',
        config: {
          ...this.defaultConfig,
          rows: 4,
          seatsPerRow: 8,
          rowHeight: 0.3,
          baseHeight: -1.5,
        },
      },
      {
        name: 'Medium Cinema',
        config: {
          ...this.defaultConfig,
          rows: 6,
          seatsPerRow: 10,
          rowHeight: 0.4,
          baseHeight: -2.0,
        },
      },
      {
        name: 'Large Cinema',
        config: {
          ...this.defaultConfig,
          rows: 6,
          seatsPerRow: 10,
          rowHeight: 0.4,
          baseHeight: -2.3,
        },
      },
      {
        name: 'IMAX Style',
        config: {
          ...this.defaultConfig,
          rows: 6,
          seatsPerRow: 10,
          rowSpacing: 1,
          rowHeight: 0.4,
          baseHeight: -2.3,
        },
      },
    ];
  }

  applyPreset(presetName: string): boolean {
    const presets = this.getPresetConfigs();
    const preset = presets.find((p) => p.name === presetName);

    if (preset) {
      this.configSubject.next(preset.config);
      return true;
    }

    return false;
  }
}
