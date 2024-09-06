import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { GigListingRequest } from './model/gig-listing.request.model';
import { GigListing } from './model/gig-listing.model';
import { map, Observable } from 'rxjs';
import { PagedResult } from '../../utils/model/paged-result.model';

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
    return this.http.get<GigListing[]>(path).pipe(map(data => data.map(songData => Object.assign(new GigListing(), songData))));
  }

  deleteGigListing(gigListingId: number): Observable<any> {
    const path = this.basePath + '/' + gigListingId;
    return this.http.delete(path);
  }

  getMaximumPrice(): Observable<number> {
    const path = this.basePath + '/maximum-price';
    return this.http.get<number>(path);
  }

  getMinimumHours(): Observable<number> {
    const path = this.basePath + '/minimum-hours';
    return this.http.get<number>(path);
  }

  getMaximumHours(): Observable<number> {
    const path = this.basePath + '/maximum-hours';
    return this.http.get<number>(path);
  }

  searchGigListings(
    page?: number | null,
    pageSize?: number| null,
    query?: string | null,
    bandTypes?: string[] | null,
    genreIds?: number[] | null,
    maximumPrice?: number | null,
    durationHours?: number | null,
    sortBy?: string | null,
  ): Observable<PagedResult<GigListing>> {
    const path = this.basePath + '/search';
  
    let params = new HttpParams();
  
    if (page !== undefined && page !== null) {
      params = params.set('page', page.toString());
    }
  
    if (pageSize !== undefined && pageSize !== null) {
      params = params.set('pageSize', pageSize.toString());
    }
  
    if (query !== undefined && query !== null && query !== '') {
      params = params.set('query', query);
    }
  
    if (bandTypes && bandTypes.length > 0) {
      bandTypes.forEach(id => {
        params = params.append('bandTypes', id.toString());
      });
    }
  
    if (maximumPrice !== undefined && maximumPrice !== null) {
      params = params.set('maximumPrice', maximumPrice.toString());
    }
  
    if (durationHours !== undefined && durationHours !== null) {
      params = params.set('durationHours', durationHours.toString());
    }
  
    if (genreIds && genreIds.length > 0) {
      genreIds.forEach(id => {
        params = params.append('genreIds', id.toString());
      });
    }
  
    if (sortBy !== undefined && sortBy !== null && sortBy !== '') {
      params = params.set('sortBy', sortBy);
    }
  
    return this.http.get<PagedResult<GigListing>>(path, { params }).pipe(
      map(pagedResult => {
        pagedResult.content = pagedResult.content.map(item => Object.assign(new GigListing(), item));
        return pagedResult;
      })
    );
  }

}
