import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScreeningRoomListMock } from '../../../app-logic/screening-room-list-mock';
import { MatTableDataSource } from '@angular/material/table';
import { ScreeningRoomData } from '../../../app-logic/screening-room-data';
import { AddTimeslotTransfer } from '../../../app-logic/add-timeslot-transfer';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-select-screening-room',
  standalone: false,
  templateUrl: './select-screening-room.html',
  styleUrl: './select-screening-room.css',
})
export class SelectScreeningRoom implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  screeningRoomList: any;
  listColumns: string[] = [
    'id',
    'name',
    'numOfRows',
    'numOfSeatsPerRow',
    'format',
    'select',
  ];

  constructor(
    private screeningRoomListMock: ScreeningRoomListMock,
    private addTimeslotTransfer: AddTimeslotTransfer,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.screeningRoomListMock.getData().subscribe((data) => {
      if (data) {
        this.screeningRoomList = new MatTableDataSource<ScreeningRoomData>(
          data
        );
        this.screeningRoomList.paginator = this.paginator;
        this.screeningRoomList.sort = this.sort;
      }
    });
  }

  select(item: ScreeningRoomData) {
    this.addTimeslotTransfer.setScreeningRoom(item);
    this.router.navigate(['/add-timeslot',0])
  }
}
