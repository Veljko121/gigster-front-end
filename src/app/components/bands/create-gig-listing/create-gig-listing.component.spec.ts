import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGigListingComponent } from './create-gig-listing.component';

describe('CreateGigListingComponent', () => {
  let component: CreateGigListingComponent;
  let fixture: ComponentFixture<CreateGigListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGigListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGigListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
