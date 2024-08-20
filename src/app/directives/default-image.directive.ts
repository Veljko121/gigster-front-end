import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[gigDefaultImage]',
  standalone: true
})
export class DefaultImageDirective {

  @Input() gigDefaultImage: string = 'assets/default-picture.png';

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    this.el.nativeElement.src = this.gigDefaultImage;
  }

}