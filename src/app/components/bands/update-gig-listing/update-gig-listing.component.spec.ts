import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGigListingComponent } from './update-gig-listing.component';

describe('UpdateGigListingComponent', () => {
  let component: UpdateGigListingComponent;
  let fixture: ComponentFixture<UpdateGigListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGigListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGigListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
