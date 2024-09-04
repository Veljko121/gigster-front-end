import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  styleUrls: [
    '../card-styles.css',
    './band-card.component.css',
  ]
})
export class BandCardComponent implements OnInit, OnChanges {

  band = input.required<Band>();
  photoUrl?: string;

  constructor(
    private bandService: BandService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['band']) {
      this.loadBandPicture();
    }
  }
  
  ngOnInit(): void {
    this.loadBandPicture();
  }
  
  loadBandPicture(): void {
    const id = this.band().id;
    this.photoUrl = this.bandService.getBandPhoto(id) + '?' + (new Date()).getTime();
  }

}
