import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { Genre } from './model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  basePath = environment.apiHost + 'genres'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Genre[]> {
    const path = this.basePath;
    return this.http.get<Genre[]>(path);
  }

}
