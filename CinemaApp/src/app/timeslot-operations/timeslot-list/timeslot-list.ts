import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeslotData } from '../../app-logic/timeslot-data';
import { Timeslot } from '../../app-logic/timeslot';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-timeslot-list',
  standalone: false,
  templateUrl: './timeslot-list.html',
  styleUrl: './timeslot-list.css'
})
export class TimeslotList implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

timeslotList: any;
  listColumns: string[] = [
    'id',
    'startTime',
    'endTime',
    'screeningRoom',
    'movie',
  ];

  constructor(private timeslotData: TimeslotData) {}

  ngOnInit(): void {
    this.timeslotData.getData().subscribe((data) => {
      if (data) {
        this.timeslotList = new MatTableDataSource<Timeslot>(
          data
        );
        this.timeslotList.paginator = this.paginator;
        this.timeslotList.sort = this.sort;
      }
    });
  }

  delete(item: Timeslot): void{
    this.timeslotData.delete(item);
  }
}

