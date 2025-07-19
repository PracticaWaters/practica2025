import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddTimeslotTransfer } from '../../../app-logic/add-timeslot-transfer';
import { FormatService } from '../../../app-logic/format/format-service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Format } from '../../../app-logic/format/format';

@Component({
  selector: 'app-select-format',
  standalone: false,
  templateUrl: './select-format.html',
  styleUrl: './select-format.css'
})
export class SelectFormat implements OnInit{
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  formatList: any;
  listColumns: string[] = ['id', 'name', 'select'];

  constructor(
    private addTimeslotTransfer: AddTimeslotTransfer,
    private formatService: FormatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formatService.getFormats().subscribe((data) => {
      if (data) {
        this.formatList = new MatTableDataSource<Format>(data);
        this.formatList.paginator = this.paginator;
        this.formatList.sort = this.sort;
      }
    });
  }

  isEmpty(): boolean {
    return !this.formatList || this.formatList.data.length === 0;
  }

  select(format: Format) {
    this.addTimeslotTransfer.setFormat(format);
    this.router.navigate(['/add-timeslot', 0]);
  }
}
