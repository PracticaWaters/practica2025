import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Format } from '../../app-logic/format/format';
import { TimeslotData } from '../../app-logic/timeslot-data';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService } from '../../app-logic/format/format-service';

@Component({
  selector: 'app-add-format',
  standalone: false,
  templateUrl: './add-format.html',
  styleUrl: './add-format.css',
})
export class AddFormat implements OnInit{
  addFormatForm: FormGroup;
  item!: Format;
  itemId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private formatService: FormatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.addFormatForm = this.formBuilder.group({});
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemId = params['id'];
      } else {
        this.itemId = 0;
      }
    });

    this.addFormatForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.itemId == 0) {
      this.item = new Format();

      this.addFormatForm = this.formBuilder.group({
        name: [this.item.name, Validators.required],
      });
    } else {
      this.formatService.getFormatById(this.itemId).subscribe((data) => {
        this.item = data;

        this.addFormatForm = this.formBuilder.group({
          name: [this.item.name, Validators.required],
        });
      });
    }
  }

  onSubmit() {
    if (this.itemId == 0) {
      this.item = new Format(this.addFormatForm.value);

      this.formatService.addFormat(this.item);
    } else {
      this.item.name = this.addFormatForm.value.name;
      this.formatService.updateFormat(this.item);
    }
    this.router.navigate(['/format-list']);
  }

  hasError(controlName: string, errorName: string) {
    return this.addFormatForm.controls[controlName].hasError(errorName);
  }
}
