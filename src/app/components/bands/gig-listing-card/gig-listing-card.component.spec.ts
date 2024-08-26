import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigListingCardComponent } from './gig-listing-card.component';

describe('GigListingCardComponent', () => {
  let component: GigListingCardComponent;
  let fixture: ComponentFixture<GigListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GigListingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
