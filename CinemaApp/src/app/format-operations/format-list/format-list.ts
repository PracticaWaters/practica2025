import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormatService } from '../../app-logic/format/format-service';
import { MatTableDataSource } from '@angular/material/table';
import { Format } from '../../app-logic/format/format';

@Component({
  selector: 'app-format-list',
  standalone: false,
  templateUrl: './format-list.html',
  styleUrl: './format-list.css',
})
export class FormatList implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  formatList: any;
  listColumns: string[] = ['id', 'name' , 'edit', 'delete'];

  constructor(private formatService: FormatService) {}

  ngOnInit(): void {
    this.formatService.getFormats().subscribe((data) => {
      if (data) {
        this.formatList = new MatTableDataSource<Format>(data);
        this.formatList.paginator = this.paginator;
        this.formatList.sort = this.sort;
      }
    });
  }

  delete(item: Format): void {
    this.formatService.deleteFormat(item);
  }
}
