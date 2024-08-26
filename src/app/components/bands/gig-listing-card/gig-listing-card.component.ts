import { Component, input } from '@angular/core';
import { GigListing } from '../model/gig-listing.model';
import { TagComponent } from "../tag/tag.component";

@Component({
  selector: 'gig-gig-listing-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './gig-listing-card.component.html',
  styleUrls: [
    '../card-styles.css',
    './gig-listing-card.component.css',
  ]
})
export class GigListingCardComponent {

  gigListing = input.required<GigListing>();

  constructor() { }

}
