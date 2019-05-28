import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  href = 'https://swapi.co/api/';
  constructor(private http: HttpClient) { }

  getStarWarsData(page: number): string {
    if (page) {
      return 'page=' + page;
    } else {
      return '';
    }
  }

  getCharacters(page?: number): Observable<any> {
    return this.http.get(`${this.href}people/?${this.getStarWarsData(page)}`)
      .pipe(
        map(data => data['results'])
      );
  }

  getFilms(page?: number): Observable<any> {
    return this.http.get(`${this.href}films/?${this.getStarWarsData(page)}`)
      .pipe(
        map(data => data['results'])
      );
  }
}
