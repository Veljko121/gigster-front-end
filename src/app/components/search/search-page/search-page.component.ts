import { Component, OnInit } from '@angular/core';
import { GigListingService } from '../../bands/gig-listing.service';
import { Genre } from '../../bands/model/genre.model';
import { GenreService } from '../../bands/genre.service';
import { BandService } from '../../bands/band.service';
import { TitleCasePipe } from '@angular/common';
import { GigListing } from '../../bands/model/gig-listing.model';
import { GigListingCardComponent } from '../../bands/gig-listing-card/gig-listing-card.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PagedResult } from '../../../utils/model/paged-result.model';

@Component({
  selector: 'gig-search-page',
  standalone: true,
  imports: [
    TitleCasePipe,
    GigListingCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {

  genres: Genre[] = [];
  bandTypes: string[] = [];
  gigListings: GigListing[] = [];
  maximumPrice: number = 0;
  maximumDuration: number = 0;
  minimumDuration: number = 0;
  page: number = 0;
  pageSize: number = 20;
  pagedResult?: PagedResult<GigListing>;

  searchForm = new FormGroup({
    page: new FormControl(this.page),
    pageSize: new FormControl(this.pageSize),
    text: new FormControl(''),
    bandTypes: new FormArray([]),
    genres: new FormArray([]),
    maximumPrice: new FormControl(0),
    durationHours: new FormControl(0)
  });

  constructor(
    private gigListingService: GigListingService,
    private bandService: BandService,
    private genreService: GenreService,
  ) { }
  
  ngOnInit(): void {
    this.loadGenres();
    this.loadBandTypes();
    this.loadPriceParameters();
  }

  loadPriceParameters() {
    this.gigListingService.getMaximumPrice().subscribe({
      next: result => {
        this.maximumPrice = result;
        this.searchForm.get('maximumPrice')?.setValue(this.maximumPrice);
        // this.searchGigListings();
        this.gigListingService.getMinimumHours().subscribe({
          next: result => {
            this.minimumDuration = result;
            this.searchForm.get('durationHours')?.setValue(this.minimumDuration);
            this.searchGigListings();
          },
          error: () => {
            alert('Error while loading maximum price.');
          }
        })
      },
      error: () => {
        alert('Error while loading maximum price.');
      }
    })
  }
  
  loadGenres(): void {
    this.genreService.getAll().subscribe({
      next: (result) => {
        this.genres = result.sort((a, b) => a.name.localeCompare(b.name));
        this.addGenreControls();
      },
      error: () => {
        alert('Error while loading genres.');
      }
    })
  }
  
  addGenreControls(): void {
    this.genres.forEach(() => {
      (this.searchForm.get('genres') as FormArray).push(new FormControl(false));
    });
  }
  
  getSelectedGenres(): number[] {
    const genres = this.searchForm.value.genres;
    
    if (!genres) return [];
    
    const selectedGenreIds = genres
    .map((checked: boolean, i: number) => (checked ? this.genres[i].id : null))
    .filter((id): id is number => id !== null);
    
    return selectedGenreIds;
  }
  
  loadBandTypes(): void {
    this.bandService.getBandTypes().subscribe({
      next: result => {
        this.bandTypes = result;
        this.addBandTypeControls();
      }
    })
  }
  
  addBandTypeControls(): void {
    this.bandTypes.forEach(() => {
      (this.searchForm.get('bandTypes') as FormArray).push(new FormControl(false));
    });
  }

  getSelectedBandTypes(): string[] {
    const bandTypes = this.searchForm.value.bandTypes;
  
    if (!bandTypes) return [];
    
    const selectedBandTypes = bandTypes
      .map((checked: boolean, i: number) => (checked ? this.bandTypes[i] : null))
      .filter((id): id is string => id !== null);
    
    return selectedBandTypes;
  }  

  searchGigListings(): void {
    const values = this.searchForm.value;
    this.gigListingService.searchGigListings(values.page, values.pageSize, values.text, this.getSelectedBandTypes(), this.getSelectedGenres(), values.maximumPrice, values.durationHours).subscribe({
      next: result => {
        this.pagedResult = result;
        this.gigListings = [];
        this.gigListings = this.pagedResult.content;
        this.maximumDuration = this.findMaximumDuration(this.gigListings);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
  }

  findMaximumPrice(gigListings: GigListing[]): number {
    let maximumPrice = 0;
    gigListings.forEach(gigListing => {
      if (gigListing.maximumPrice > maximumPrice) maximumPrice = gigListing.maximumPrice;
    });
    return maximumPrice;
  }

  findMaximumDuration(gigListings: GigListing[]): number {
    let maximumDuration = 0;
    gigListings.forEach(gigListing => {
      if (gigListing.maximumDurationHours > maximumDuration) maximumDuration = gigListing.maximumDurationHours;
    });
    return maximumDuration;
  }

  previousPage() {
    this.changePage((this.searchForm.value.page || 0) - 1);
  }

  nextPage() {
    this.changePage(this.page + 1);
  }

  firstPage() {
    this.changePage(0);
  }

  lastPage() {
    console.log('helllooo')
    this.changePage((this.pagedResult?.page.totalPages || 0) - 1);
  }

  changePage(page: number) {
    console.log((this.pagedResult?.page.totalPages || 0) - 1 + 'ukupno ' + page);
    if (page >= 0 && page <= (this.pagedResult?.page.totalPages || 0) - 1) {
      this.searchForm.get('page')?.setValue(page);
      this.page = page;
      console.log(this.page);
      this.searchGigListings();
    }
  }

}
