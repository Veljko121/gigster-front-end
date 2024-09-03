import { Component, input, OnInit } from '@angular/core';
import { GigListing } from '../model/gig-listing.model';
import { TagComponent } from "../tag/tag.component";
import { BandService } from '../band.service';
import { DefaultImageDirective } from '../../../directives/default-image.directive';

@Component({
  selector: 'gig-gig-listing-card',
  standalone: true,
  imports: [
    TagComponent,
    DefaultImageDirective
  ],
  templateUrl: './gig-listing-card.component.html',
  styleUrls: [
    '../card-styles.css',
    './gig-listing-card.component.css',
  ]
})
export class GigListingCardComponent implements OnInit {

  photoUrl?: string;
  
  loadProfilePicture(id: number): void {
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
  
  ngOnInit(): void {
    this.loadProfilePicture(this.gigListing().band.id);
    this.minimumPrice = this.gigListing().getMinimumPrice(this.minimumHours() || this.gigListing().minimumDurationHours);
    this.maximumPrice = this.gigListing().getMaximumPrice(this.maximumHours() || this.gigListing().maximumDurationHours);
  }

}
