import { Component, Input } from '@angular/core';

@Component({
  selector: 'gig-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() backgroundColor: string = '';
}
