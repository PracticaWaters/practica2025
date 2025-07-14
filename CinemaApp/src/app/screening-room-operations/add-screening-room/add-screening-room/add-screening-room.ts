import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreeningRoom } from '../../../screening-room/screening-room/screening-room';
import { ScreeningRoomListMock } from '../../../app-logic/screening-room-list-mock';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreeningRoomData } from '../../../app-logic/screening-room.data';

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
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.screeningRoomId = params['id'];
      } else {
        this.screeningRoomId = 0;
      }
    });

    this.addScreeningRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      numOfRows: ['', Validators.required],
      numOfSeatsPerRow: ['', Validators.required],
      format: [this.formBuilder.array([]), Validators.required],
      seatList: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    if (this.screeningRoomId == 0) {
      this.screeningRoom = new ScreeningRoomData();

      this.addScreeningRoomForm = this.formBuilder.group({
        name: ['', Validators.required],
        numOfRows: ['', Validators.required],
        numOfSeatsPerRow: ['', Validators.required],
        format: [this.formBuilder.array([]), Validators.required],
        seatList: this.formBuilder.array([]),
      });
    } else {
      this.screeningRoomListMock
        .getScreeningRoomById(this.screeningRoomId)
        .subscribe((data) => {
          this.screeningRoom = data;

          this.addScreeningRoomForm = this.formBuilder.group({
            name: ['', Validators.required],
            numOfRows: ['', Validators.required],
            numOfSeatsPerRow: ['', Validators.required],
            format: [this.formBuilder.array([]), Validators.required],
            seatList: this.formBuilder.array([]),
          });
        });
    }
  }

  onSubmit() {
    if (this.screeningRoomId == 0) {
      this.screeningRoom = new ScreeningRoomData(
        this.addScreeningRoomForm.value
      );
      this.screeningRoomListMock.addScreeningRoom(this.screeningRoom);
    } else {
      this.screeningRoom.name = this.addScreeningRoomForm.value.name;
      this.screeningRoom.noOfRows = this.addScreeningRoomForm.value.numOfRows;
      this.screeningRoom.noOfSeatsOnRow =
        this.addScreeningRoomForm.value.numOfSeatsPerRow;
      this.screeningRoom.occupiedSeats =
        this.addScreeningRoomForm.value.seatList;
      this.screeningRoom.supportedFormats =
        this.addScreeningRoomForm.value.format;
      this.screeningRoomListMock.updateScreeningRoom(this.screeningRoom);
    }
    this.router.navigate(['/screening-room-list']);
  }

  hasError(controlName: string, errorName: string) {
    return this.addScreeningRoomForm.controls[controlName].hasError(errorName);
  }
}