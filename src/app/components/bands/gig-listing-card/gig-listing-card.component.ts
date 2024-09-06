import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GigListing } from '../model/gig-listing.model';
import { TagComponent } from "../tag/tag.component";
import { BandService } from '../band.service';
import { DefaultImageDirective } from '../../../directives/default-image.directive';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'gig-gig-listing-card',
  standalone: true,
  imports: [
    TagComponent,
    DefaultImageDirective,
    TitleCasePipe,
  ],
  templateUrl: './gig-listing-card.component.html',
  styleUrls: [
    '../card-styles.css',
    './gig-listing-card.component.css',
  ]
})
export class GigListingCardComponent implements OnInit, OnChanges {

  photoUrl?: string;
  
  loadBandPicture(): void {
    const id = this.gigListing().band.id;
    this.photoUrl = this.bandService.getBandPhoto(id) + '?' + (new Date()).getTime();
  }
  
  gigListing = input.required<GigListing>();
  minimumHours = input<number>();
  maximumHours = input<number>();
  minimumPrice: number = 0;
  maximumPrice: number = 0;

  constructor(
    private bandService: BandService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gigListing']) {
      this.loadBandPicture();
    }
  }
  
  ngOnInit(): void {
    this.loadBandPicture();
    this.minimumPrice = this.gigListing().getMinimumPrice(this.minimumHours() || this.gigListing().minimumDurationHours);
    this.maximumPrice = this.gigListing().getMaximumPrice(this.maximumHours() || this.gigListing().maximumDurationHours);
  }

}
