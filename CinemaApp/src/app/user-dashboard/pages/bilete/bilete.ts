import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Bilet {
  id: number;
  dateTime: Date;
  movieTitle: string;
  ticketType: string;
}

@Component({
  selector: 'app-bilete',
  standalone: false,
  templateUrl: './bilete.html'
})
export class Bilete implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['dateTime', 'movieTitle', 'ticketType', 'actions'];
  dataSource = new MatTableDataSource<Bilet>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = [
      { id: 1, dateTime: new Date(), movieTitle: 'Dune: Part Two', ticketType: 'Standard' },
      { id: 2, dateTime: new Date(), movieTitle: 'Oppenheimer', ticketType: 'VIP' },
    ];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
