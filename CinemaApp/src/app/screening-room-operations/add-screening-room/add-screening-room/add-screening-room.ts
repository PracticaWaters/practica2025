import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreeningRoomListMock } from '../../../app-logic/screening-room-list-mock';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreeningRoomData } from '../../../app-logic/screening-room.data';
import { Seat } from '../../../app-logic/seat';

@Component({
  selector: 'app-add-screening-room',
  standalone: false,
  templateUrl: './add-screening-room.html',
  styleUrl: './add-screening-room.css',
})
export class AddScreeningRoom implements OnInit {
  addScreeningRoomForm: FormGroup;
  screeningRoom!: ScreeningRoomData;
  screeningRoomId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private screeningRoomListMock: ScreeningRoomListMock,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addScreeningRoomForm = this.formBuilder.group({});
    
    // Get route params
    this.activatedRoute.params.subscribe((params) => {
      this.screeningRoomId = params['id'] ? parseInt(params['id']) : 0;
    });

    // Initialize form with enhanced validations
    this.initializeForm();
  }

  ngOnInit(): void {
    if (this.screeningRoomId === 0) {
      // Adding new screening room
      this.screeningRoom = new ScreeningRoomData();
      this.initializeForm();
    } else {
      // Editing existing screening room
      this.screeningRoomListMock
        .getScreeningRoomById(this.screeningRoomId)
        .subscribe((data) => {
          this.screeningRoom = data;
          this.populateForm();
        });
    }
  }

  private initializeForm(): void {
    this.addScreeningRoomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      numOfRows: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      numOfSeatsPerRow: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      format: ['', [Validators.required, Validators.minLength(2)]],
      seatList: [[]],
    });
  }

  private populateForm(): void {
    if (this.screeningRoom) {
      this.addScreeningRoomForm.patchValue({
        name: this.screeningRoom.name || '',
        numOfRows: this.screeningRoom.noOfRows || '',
        numOfSeatsPerRow: this.screeningRoom.noOfSeatsOnRow || '',
        format: this.screeningRoom.supportedFormats?.join(', ') || '',
        seatList: this.screeningRoom.occupiedSeats || []
      });
    }
  }

  onSubmit(): void {
    if (this.addScreeningRoomForm.valid) {
      const formValue = this.addScreeningRoomForm.value;
      
      // Create or update screening room object
      if (this.screeningRoomId === 0) {
        this.screeningRoom = new ScreeningRoomData();
      }

      // Map form values to screening room object
      this.screeningRoom.name = formValue.name;
      this.screeningRoom.noOfRows = parseInt(formValue.numOfRows);
      this.screeningRoom.noOfSeatsOnRow = parseInt(formValue.numOfSeatsPerRow);
      this.screeningRoom.occupiedSeats = formValue.seatList || [];

      // Process supported formats
      const formatString: string = formValue.format;
      this.screeningRoom.supportedFormats = formatString
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);

      // Initialize empty occupied seats if not provided
      if (!this.screeningRoom.occupiedSeats) {
        this.screeningRoom.occupiedSeats = new Array<string>();
      }

      // Save or update the screening room
      if (this.screeningRoomId === 0) {
        this.screeningRoomListMock.addScreeningRoom(this.screeningRoom);
      } else {
        this.screeningRoomListMock.updateScreeningRoom(this.screeningRoom);
      }

      // Navigate back to list
      this.router.navigate(['/screening-room-list']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/screening-room-list']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.addScreeningRoomForm.get(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.addScreeningRoomForm.get(controlName);
    
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(controlName)} is required`;
      }
      if (control.errors['minlength']) {
        return `${this.getFieldDisplayName(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${this.getFieldDisplayName(controlName)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['min']) {
        return `${this.getFieldDisplayName(controlName)} must be at least ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `${this.getFieldDisplayName(controlName)} must not exceed ${control.errors['max'].max}`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const displayNames: { [key: string]: string } = {
      'name': 'Name',
      'numOfRows': 'Number of rows',
      'numOfSeatsPerRow': 'Number of seats per row',
      'format': 'Format'
    };
    
    return displayNames[controlName] || controlName;
  }

  getTotalCapacity(): number {
    const rows = this.addScreeningRoomForm.get('numOfRows')?.value;
    const seatsPerRow = this.addScreeningRoomForm.get('numOfSeatsPerRow')?.value;
    
    if (rows && seatsPerRow) {
      return parseInt(rows) * parseInt(seatsPerRow);
    }
    
    return 0;
  }
}
