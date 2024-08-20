import { Component, input, OnInit } from '@angular/core';
import { Band } from '../model/band.model';
import { TagComponent } from "../tag/tag.component";
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { BandService } from '../band.service';

@Component({
  selector: 'gig-band-card',
  standalone: true,
  imports: [
    TagComponent,
    TitleCasePipe,
    NgOptimizedImage,
  ],
  templateUrl: './band-card.component.html',
  styleUrl: './band-card.component.css'
})
export class BandCardComponent implements OnInit {

  band = input.required<Band>();
  photoUrl?: string;

  constructor(
    private bandService: BandService
  ) {
  }
  
  ngOnInit(): void {
    this.loadProfilePicture(this.band().id);
  }
  
  loadProfilePicture(id: number): void {
    this.photoUrl = this.bandService.getBandPhoto(id) + '?' + (new Date()).getTime();
  }

}
