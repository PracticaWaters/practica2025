import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddTimeslotTransfer } from '../../../app-logic/add-timeslot-transfer';
import { MovieData } from '../../../app-logic/movie-data';
import { MatTableDataSource } from '@angular/material/table';
import { Film } from '../../../app-logic/film/film';

@Component({
  selector: 'app-select-movie',
  standalone: false,
  templateUrl: './select-movie.html',
  styleUrl: './select-movie.css',
})
export class SelectMovie implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  movieList: any;
  listColumns: string[] = ['id', 'name', 'image', 'duration'];

  constructor(
    private addTimeslotTransfer: AddTimeslotTransfer,
    private movieData: MovieData
  ) {}

  ngOnInit(): void {
    this.movieData.getData().subscribe((data) => {
      if (data) {
        this.movieList = new MatTableDataSource<Film>(data);
        this.movieList.paginator = this.paginator;
        this.movieList.sort = this.sort;
      }
    });
  }

  isEmpty(): boolean {
    return !this.movieList || this.movieList.data.length === 0;
  }

  select(movie: Film){
    this.addTimeslotTransfer.setMovie(movie);
  }
}
