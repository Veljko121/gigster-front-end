import { Component, input, OnInit } from '@angular/core';
import { Band } from '../model/band.model';
import { TagComponent } from "../tag/tag.component";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'gig-band-card',
  standalone: true,
  imports: [TagComponent, TitleCasePipe],
  templateUrl: './band-card.component.html',
  styleUrl: './band-card.component.css'
})
export class BandCardComponent {

  band = input.required<Band>();

}
