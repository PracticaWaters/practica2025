import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScreeningRoomListMock } from '../../app-logic/screening-room-list-mock';
import { MatTableDataSource } from '@angular/material/table';
import { ScreeningRoom } from '../../screening-room/screening-room/screening-room';
import { ScreeningRoomData } from '../../app-logic/screening-room.data';

@Component({
  selector: 'app-screening-room-list',
  standalone: false,
  templateUrl: './screening-room-list.html',
  styleUrl: './screening-room-list.css',
})
export class ScreeningRoomList implements OnInit {
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
    'seatList',
    'actions'
  ];

  constructor(private screeningRoomListMock: ScreeningRoomListMock) {}

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
}