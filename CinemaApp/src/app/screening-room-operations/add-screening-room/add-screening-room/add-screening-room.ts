import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreeningRoomListMock } from '../../../app-logic/screening-room-list-mock';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreeningRoomData } from '../../../app-logic/screening-room-data';
import { Seat } from '../../../app-logic/seat';

@Component({
  selector: 'app-add-screening-room',
  standalone: false,
  templateUrl: './add-screening-room.html',
  styleUrl: './add-screening-room.css',
  encapsulation: ViewEncapsulation.None
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
      numOfRows: [[], Validators.required],
      numOfSeatsPerRow: [[], Validators.required],
      format: ['', Validators.required],
      seatList: [],
    });
  }
  ngOnInit(): void {
    if (this.screeningRoomId == 0) {
      this.screeningRoom = new ScreeningRoomData();

      this.addScreeningRoomForm = this.formBuilder.group({
        name: ['', Validators.required],
        numOfRows: ['', Validators.required],
        numOfSeatsPerRow: ['', Validators.required],
        format: ['', Validators.required],
        seatList: [],
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
            format: ['', Validators.required],
            seatList: [],
          });
        });
    }
  }

  onSubmit() {
    if (this.screeningRoomId == 0) {
      this.screeningRoom = new ScreeningRoomData();

      this.screeningRoom.name = this.addScreeningRoomForm.value.name;
      this.screeningRoom.numOfRow = this.addScreeningRoomForm.value.numOfRows;
      this.screeningRoom.numOfSeatsPerRow =
        this.addScreeningRoomForm.value.numOfSeatsPerRow;
      this.screeningRoom.seatList = this.addScreeningRoomForm.value.seatList;

      const formatString: string = this.addScreeningRoomForm.value.format;
      this.screeningRoom.format = formatString
        .split(',')
        .map((f: string) => f.trim());

      this.screeningRoom.seatList = new Array<string>();

      this.screeningRoomListMock.addScreeningRoom(this.screeningRoom);
    } else {
      this.screeningRoom.name = this.addScreeningRoomForm.value.name;
      this.screeningRoom.numOfRow = this.addScreeningRoomForm.value.numOfRows;
      this.screeningRoom.numOfSeatsPerRow =
        this.addScreeningRoomForm.value.numOfSeatsPerRow;
      this.screeningRoom.seatList = this.addScreeningRoomForm.value.seatList;

      const formatString: string = this.addScreeningRoomForm.value.format;
      this.screeningRoom.format = formatString
        .split(',')
        .map((f: string) => f.trim());

      this.screeningRoom.seatList = new Array<string>();

      this.screeningRoomListMock.updateScreeningRoom(this.screeningRoom);
    }
    this.router.navigate(['/screening-room-list']);
  }

  hasError(controlName: string, errorName: string) {
    return this.addScreeningRoomForm.controls[controlName].hasError(errorName);
  }
}
