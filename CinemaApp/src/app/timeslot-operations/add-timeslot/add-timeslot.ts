import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timeslot } from '../../app-logic/timeslot';
import { TimeslotData } from '../../app-logic/timeslot-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../app-logic/film/film';
import { AddTimeslotTransfer } from '../../app-logic/add-timeslot-transfer';
import { ScreeningRoomData } from '../../app-logic/screening-room-data';
import { ScreeningRoomListMock } from '../../app-logic/screening-room-list-mock';
import { FilmService } from '../../app-logic/film/film-service';

@Component({
  selector: 'app-add-timeslot',
  standalone: false,
  templateUrl: './add-timeslot.html',
  styleUrl: './add-timeslot.css',
})
export class AddTimeslot implements OnInit {
  addTimeslotForm: FormGroup;
  item!: Timeslot;
  itemId!: number;
  selectedMovie?: Film;
  selectedScreeningRoom?: ScreeningRoomData;

  constructor(
    private formBuilder: FormBuilder,
    private timeslotData: TimeslotData,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private addTimeslotTransfer: AddTimeslotTransfer,
    private screeningRoomListMock: ScreeningRoomListMock,
    private filmService: FilmService
  ) {
    this.addTimeslotForm = this.formBuilder.group({});
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemId = params['id'];
      } else {
        this.itemId = 0;
      }
    });

    this.addTimeslotForm = this.formBuilder.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.itemId == 0) {
      console.log('Movie:', this.selectedMovie);
      console.log('Screening Room:', this.selectedScreeningRoom);
      this.item = new Timeslot();

      this.addTimeslotForm = this.formBuilder.group({
        startTime: [this.item.startTime, Validators.required],
        endTime: [this.item.endTime, Validators.required],
      });
      this.selectedMovie = this.addTimeslotTransfer.getMovie();
      this.selectedScreeningRoom = this.addTimeslotTransfer.getScreeningRoom();
    } else {
      this.timeslotData.getTimeslotById(this.itemId).subscribe((data) => {
        this.item = data;

        this.addTimeslotForm = this.formBuilder.group({
          name: [this.item.startTime, Validators.required],
          description: [this.item.endTime, Validators.maxLength(50)],
        });
      });
      this.selectedMovie = this.addTimeslotTransfer.getMovie();
      this.selectedScreeningRoom = this.addTimeslotTransfer.getScreeningRoom();
    }
  }

  onSubmit() {
    if (this.itemId == 0) {
      this.item = new Timeslot(this.addTimeslotForm.value);

      this.timeslotData.addTimeslot(this.item);
    } else {
      this.item.startTime = this.addTimeslotForm.value.startTime;
      this.item.endTime = this.addTimeslotForm.value.endTime;
      this.item.movie = this.addTimeslotForm.value.movie;
      this.item.screeningRoom = this.addTimeslotForm.value.screeningRoom;
      this.timeslotData.updateTimeslot(this.item);
    }
    this.router.navigate(['/timeslot-list']);
  }

  hasError(controlName: string, errorName: string) {
    return this.addTimeslotForm.controls[controlName].hasError(errorName);
  }
}
