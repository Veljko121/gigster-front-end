import { Component, input, OnInit } from '@angular/core';
import { Band } from '../model/band.model';
import { TagComponent } from "../tag/tag.component";
import { TitleCasePipe } from '@angular/common';
import { BandService } from '../band.service';
import { DefaultImageDirective } from '../../../directives/default-image.directive';

@Component({
  selector: 'gig-band-card',
  standalone: true,
  imports: [
    TagComponent,
    TitleCasePipe,
    DefaultImageDirective,
  ],
  templateUrl: './band-card.component.html',
  styleUrls: [ '../card-styles.css', './band-card.component.css' ]
})
export class BandCardComponent implements OnInit {

  band = input.required<Band>();
  photoUrl?: string;

  constructor(
    private bandService: BandService
  ) { }
  
  ngOnInit(): void {
    this.loadProfilePicture(this.band().id);
  }
  
  loadProfilePicture(id: number): void {
    this.photoUrl = this.bandService.getBandPhoto(id) + '?' + (new Date()).getTime();
  }

}
