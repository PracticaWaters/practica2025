import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timeslot } from '../../app-logic/timeslot';
import { TimeslotData } from '../../app-logic/timeslot-data';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmModel } from '../../app-logic/film/film.model';

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
  selectedMovie?: FilmModel;

  constructor(
    private formBuilder: FormBuilder,
    private timeslotData: TimeslotData,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      this.item = new Timeslot();

      this.addTimeslotForm = this.formBuilder.group({
        name: [this.item.startTime, Validators.required],
        description: [this.item.endTime, Validators.maxLength(50)],
      });
    } else {
      this.timeslotData.getTimeslotById(this.itemId).subscribe((data) => {
        this.item = data;

        this.addTimeslotForm = this.formBuilder.group({
          name: [this.item.startTime, Validators.required],
          description: [this.item.endTime, Validators.maxLength(50)],
        });
      });
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
