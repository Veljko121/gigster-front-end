import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Band } from './model/band.model';
import { BandRequest } from './model/band.request.model';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  basePath = environment.apiHost + 'bands'

  constructor(
    private http: HttpClient
  ) { }

  createBand(bandRequest: BandRequest): Observable<Band> {
    const path = this.basePath;
    return this.http.post<Band>(path, bandRequest);
  }
  
  getBandTypes(): Observable<string[]> {
    const path = this.basePath + '/types';
    return this.http.get<string[]>(path);
  }
  
  getMyBands(): Observable<Band[]> {
    const path = this.basePath + '/my';
    return this.http.get<Band[]>(path);
  } 

}
