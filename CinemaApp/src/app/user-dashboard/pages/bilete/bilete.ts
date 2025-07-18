import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { QrDialog } from '../../../qr-dialog/qr-dialog';

interface Bilet {
  id: number;
  dateTime: Date;
  movieTitle: string;
  ticketType: string;
}

@Component({
  selector: 'app-bilete',
  standalone: false,
  templateUrl: './bilete.html',
  styleUrl: './bilete.css',
  encapsulation: ViewEncapsulation.None,
})
export class Bilete implements OnInit, AfterViewInit {
constructor(private dialog: MatDialog) {}

  deschideDialogQR(film: Bilet): void {

  const qrData = `id=${film.id};title=${film.movieTitle}`;
  
  this.dialog.open(QrDialog, {
    data: { qrData},
    width: 'auto',
    height: 'auto',
    panelClass: 'qr-dialog-panel',
    backdropClass: 'transparent-backdrop',
  });
}

  displayedColumns: string[] = [
    'dateTime',
    'movieTitle',
    'ticketType',
    'actions',
  ];
  dataSource = new MatTableDataSource<Bilet>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = [
      {
        id: 1,
        dateTime: new Date('2025-07-16T18:30:00'),
        movieTitle: 'Spider-Man: No Way Home',
        ticketType: 'Standard',
      },
      {
        id: 2,
        dateTime: new Date('2025-07-17T20:00:00'),
        movieTitle: 'Avatar: The Way of Water',
        ticketType: 'VIP',
      },
      {
        id: 3,
        dateTime: new Date('2025-07-18T14:15:00'),
        movieTitle: 'The Batman',
        ticketType: 'Standard',
      },
      {
        id: 4,
        dateTime: new Date('2025-07-19T19:45:00'),
        movieTitle: 'Top Gun: Maverick',
        ticketType: 'VIP',
      },
      {
        id: 5,
        dateTime: new Date('2025-07-20T21:00:00'),
        movieTitle: 'Black Panther: Wakanda Forever',
        ticketType: 'Standard',
      },
      {
        id: 6,
        dateTime: new Date('2025-07-21T16:00:00'),
        movieTitle: 'Doctor Strange in the Multiverse of Madness',
        ticketType: 'VIP',
      },
      {
        id: 7,
        dateTime: new Date('2025-07-22T18:45:00'),
        movieTitle: 'Jurassic World: Dominion',
        ticketType: 'Standard',
      },
      {
        id: 8,
        dateTime: new Date('2025-07-23T20:30:00'),
        movieTitle: 'Thor: Love and Thunder',
        ticketType: 'VIP',
      },
      {
        id: 9,
        dateTime: new Date('2025-07-24T17:15:00'),
        movieTitle: 'Black Widow',
        ticketType: 'Standard',
      },
      {
        id: 10,
        dateTime: new Date('2025-07-25T19:00:00'),
        movieTitle: 'Guardians of the Galaxy Vol. 3',
        ticketType: 'VIP',
      },
      {
        id: 11,
        dateTime: new Date('2025-07-26T15:30:00'),
        movieTitle: 'The Flash',
        ticketType: 'Standard',
      },
      {
        id: 12,
        dateTime: new Date('2025-07-27T21:15:00'),
        movieTitle: 'Aquaman and the Lost Kingdom',
        ticketType: 'VIP',
      },
    ];

    this.dataSource.filterPredicate = (data: Bilet, filter: string) => {
      const dataStr =
        `${data.movieTitle} ${data.ticketType} ${data.dateTime}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
