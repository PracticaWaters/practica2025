import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeatConfig } from './seat-generator.service';

@Injectable({
  providedIn: 'root',
})
export class SeatConfigService {
  private defaultConfig: SeatConfig = {
    rows: 8,
    seatsPerRow: 12,
    rowSpacing: 1.2,
    seatSpacing: 0.8,
    rowOffset: 0.5,
    seatOffset: 0.4,
    scale: 0.8,
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

    if (config.rows < 1 || config.rows > 20) {
      errors.push('Number of rows must be between 1 and 20');
    }

    if (config.seatsPerRow < 1 || config.seatsPerRow > 30) {
      errors.push('Seats per row must be between 1 and 30');
    }

    if (config.rowSpacing < 0.5 || config.rowSpacing > 3) {
      errors.push('Row spacing must be between 0.5 and 3');
    }

    if (config.seatSpacing < 0.5 || config.seatSpacing > 2) {
      errors.push('Seat spacing must be between 0.5 and 2');
    }

    if (config.scale < 0.1 || config.scale > 2) {
      errors.push('Scale must be between 0.1 and 2');
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
        config: { ...this.defaultConfig, rows: 6, seatsPerRow: 8 },
      },
      {
        name: 'Medium Cinema',
        config: { ...this.defaultConfig, rows: 8, seatsPerRow: 12 },
      },
      {
        name: 'Large Cinema',
        config: { ...this.defaultConfig, rows: 10, seatsPerRow: 16 },
      },
      {
        name: 'IMAX Style',
        config: {
          ...this.defaultConfig,
          rows: 12,
          seatsPerRow: 20,
          rowSpacing: 1.5,
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
