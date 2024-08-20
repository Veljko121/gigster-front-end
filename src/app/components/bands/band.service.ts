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

  uploadBandPhoto(photo: File, bandId: number): Observable<any> {
    const path = this.basePath + '/' + bandId + '/photo';
    const formData = new FormData();
    formData.append('file', photo);
    return this.http.patch(path, formData);
  }

  getBandPhoto(bandId: number): string {
    const path = this.basePath + '/' + bandId + '/photo';
    return path;
  }

  updateBand(bandId: number, bandRequest: BandRequest): Observable<Band> {
    const path = this.basePath + '/' + bandId;
    return this.http.put<Band>(path, bandRequest);
  }
  
  deleteBand(bandId: number): Observable<any> {
    const path = this.basePath + '/' + bandId;
    return this.http.delete<any>(path);
  }

}
