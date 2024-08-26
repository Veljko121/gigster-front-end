import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { GigListingRequest } from './model/gig-listing.request.model';
import { GigListing } from './model/gig-listing.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigListingService {

  basePath = environment.apiHost + 'listings/gigs'

  constructor(
    private http: HttpClient
  ) { }

  createGigListing(gigListingRequest: GigListingRequest): Observable<GigListing> {
    const path = this.basePath;
    return this.http.post<GigListing>(path, gigListingRequest);
  }

  getMyGigListings(): Observable<GigListing[]> {
    const path = this.basePath + '/my';
    return this.http.get<GigListing[]>(path);
  }

  deleteGigListing(gigListingId: number): Observable<any> {
    const path = this.basePath + '/' + gigListingId;
    return this.http.delete(path);
  }

}
