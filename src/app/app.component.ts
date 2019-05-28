import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

export interface PersonDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: any[];
  species: any[];
  vehicles: any[];
  starships: any[];
  created: string;
  edited: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {

  pageCount = 0;
  fetchedCharactersData = [];
  dataSource;
  columnsToDisplay = ['name', 'gender'];
  expandedElement: PersonDetails | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.onLoadMore();
  }

  onLoadMore(): void {
    this.pageCount += 1;
    this.appService.getCharacters(this.pageCount)
      .subscribe(response => {
        let data = this.fetchedCharactersData;
        data = data.concat(response);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.fetchedCharactersData = data;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
