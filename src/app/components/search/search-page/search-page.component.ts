import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GigListingService } from '../../bands/gig-listing.service';
import { Genre } from '../../bands/model/genre.model';
import { GenreService } from '../../bands/genre.service';
import { BandService } from '../../bands/band.service';
import { TitleCasePipe } from '@angular/common';
import { GigListing } from '../../bands/model/gig-listing.model';
import { GigListingCardComponent } from '../../bands/gig-listing-card/gig-listing-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagedResult } from '../../../utils/model/paged-result.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin } from 'rxjs';


export interface SearchRequest {
  page?: number,
  pageSize?: number,
  query?: string,
  bandTypes?: string[],
  genreIds?: number[],
  price?: number,
  durationHours?: number,
  sortBy?: string,
}

@Component({
  selector: 'gig-search-page',
  standalone: true,
  imports: [
    TitleCasePipe,
    GigListingCardComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {

  searchRequest: SearchRequest = { };

  // controls parameters
  maximumPrice?: number;
  minimumDuration?: number;
  maximumDuration?: number;
  bandTypes?: string[];
  genres?: Genre[];
  selected_genres?: boolean[];

  // search results
  pagedResult?: PagedResult<GigListing>;

  constructor(
    private gigListingService: GigListingService,
    private bandService: BandService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    forkJoin({
      maximumPrice: this.gigListingService.getMaximumPrice(),
      minimumDuration: this.gigListingService.getMinimumHours(),
      maximumDuration: this.gigListingService.getMaximumHours(),
      bandTypes: this.bandService.getBandTypes(),
      genres: this.genreService.getAll(),
    }).subscribe({
      next: ({ maximumPrice, minimumDuration, maximumDuration, bandTypes, genres }) => {

        this.maximumPrice = maximumPrice;
        this.minimumDuration  = minimumDuration;
        this.maximumDuration = maximumDuration;
        this.bandTypes = bandTypes;
        this.genres = genres;

        this.route.queryParams.subscribe({
          next: queryParams => {
            this.searchRequest = {
              page: queryParams['page'] - 1 || 0,
              pageSize: queryParams['pageSize'] || 20,
              query: queryParams['query'] || '',
              bandTypes: queryParams['bandTypes'] 
                ? Array.isArray(queryParams['bandTypes']) 
                  ? queryParams['bandTypes'] 
                  : [queryParams['bandTypes']]
                : [],
              genreIds: queryParams['genreIds']
                ? Array.isArray(queryParams['genreIds'])
                  ? queryParams['genreIds'].map(Number)
                  : [Number(queryParams['genreIds'])]
                : [],
              price: queryParams['price'] || maximumPrice,
              durationHours: queryParams['durationHours'] || minimumDuration,
              sortBy: queryParams['sortBy'] || 'name',
            };

            this.cdr.detectChanges();

            this.uncheckAllCheckboxes();

            for (let i = 0; i < this.searchRequest.bandTypes!.length; i++) {
              const bandType_checkbox_name = 'band_type_' + this.searchRequest.bandTypes![i];
              let bandType_checkbox = document.getElementById(bandType_checkbox_name) as HTMLInputElement;
              bandType_checkbox.checked = true;
            }

            for (let i = 0; i < this.searchRequest.genreIds!.length; i++) {
              const genre_checkbox_name = 'genre_' + this.searchRequest.genreIds![i];
              let genre_checkbox = document.getElementById(genre_checkbox_name) as HTMLInputElement;
              genre_checkbox.checked = true;
            }

            this.searchGigListings();
          },
          error: () => {
            alert('Error while loading query params.');
          }
        });
      },
      error: () => {
        alert('Error while loading initial values.');
      }
    });
  }

  uncheckAllCheckboxes(): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  onPriceChanged(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        price: this.searchRequest.price,
        page: 1,
       },
      queryParamsHandling: 'merge',
    });
  }

  onDurationHoursChanged(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        durationHours: this.searchRequest.durationHours,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageSizeChanged(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pageSize: this.searchRequest.pageSize,
        page: 1,
      },
      queryParamsHandling: 'merge',
    }).then();
  }

  onSortByChanged(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: this.searchRequest.sortBy,
        page: 1,
      },
      queryParamsHandling: 'merge',
    }).then();
  }

  searchGigListings(): void {
    this.gigListingService.searchGigListings(
      this.searchRequest.page,
      this.searchRequest.pageSize,
      this.searchRequest.query,
      this.searchRequest.bandTypes,
      this.searchRequest.genreIds,
      this.searchRequest.price,
      this.searchRequest.durationHours,
      this.searchRequest.sortBy,
    ).subscribe({
      next: result => {
        this.pagedResult = result;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        alert('Error while searchig gig-listings.');
      }
    })
  }

  previousPage() {
    this.changePage((this.searchRequest.page || 0) - 1);
  }

  nextPage() {
    this.changePage((this.searchRequest.page || 0) + 1);
  }

  firstPage() {
    this.changePage(0);
  }

  lastPage() {
    this.changePage((this.pagedResult?.page.totalPages || 0) - 1);
  }

  changePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page + 1 },
      queryParamsHandling: 'merge',
    });
    if (page >= 0 && page <= (this.pagedResult?.page.totalPages || 0) - 1) {
      this.searchRequest.page = page;
    }
  }

  onBandTypeChange(event: any, bandType: string): void {
    if (event.target.checked) {
      if (!this.searchRequest.bandTypes?.includes(bandType)) {
        this.searchRequest.bandTypes?.push(bandType);
      }
    } else {
      const index = this.searchRequest.bandTypes?.indexOf(bandType);
      if (index !== undefined && index !== -1) {
        this.searchRequest.bandTypes?.splice(index, 1);
      }
    }
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        bandTypes: this.searchRequest.bandTypes,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });

    this.searchGigListings();
  }
  
  

  onGenreChange(event: any, genreId: number): void {  
    if (event.target.checked) {
      if (!this.searchRequest.genreIds?.includes(genreId)) {
        this.searchRequest.genreIds?.push(genreId);
      }
    } else {
      const index = this.searchRequest.genreIds?.indexOf(genreId);
      if (index !== undefined && index !== -1) {
        this.searchRequest.genreIds?.splice(index, 1);
      }
    }
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        genreIds: this.searchRequest.genreIds,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
  

}
