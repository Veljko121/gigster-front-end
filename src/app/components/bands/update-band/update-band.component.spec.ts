import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBandComponent } from './update-band.component';

describe('UpdateBandComponent', () => {
  let component: UpdateBandComponent;
  let fixture: ComponentFixture<UpdateBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
