import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GigListingService } from '../gig-listing.service';
import { Band } from '../model/band.model';
import { GigListingRequest } from '../model/gig-listing.request.model';

@Component({
  selector: 'gig-create-gig-listing',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-gig-listing.component.html',
  styleUrls: ['./create-gig-listing.component.css', '../../shared-styles.css']
})
export class CreateGigListingComponent {

  band: Band;

  gigListingForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    startingPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    pricePerAdditionalHour: new FormControl(0, [Validators.required, Validators.min(0)]),
    minimumDurationHours: new FormControl(0, [Validators.required, Validators.min(0)]),
    maximumAdditionalHours: new FormControl(0, [Validators.required, Validators.min(0)]),
    durationDays: new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(
    private dialogRef: MatDialogRef<CreateGigListingComponent>,
    private gigListingService: GigListingService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.band = data.band;
  }

  createGigListing(): void {
    const gigListingRequest: GigListingRequest = {
      bandId: this.band?.id || -1,
      title: this.gigListingForm.value.title || '',
      startingPrice: this.gigListingForm.value.startingPrice || 0,
      pricePerAdditionalHour: this.gigListingForm.value.pricePerAdditionalHour || 0,
      minimumDurationHours: this.gigListingForm.value.minimumDurationHours || 0,
      maximumAdditionalHours: this.gigListingForm.value.maximumAdditionalHours || 0,
      durationDays: this.gigListingForm.value.durationDays || 1,
    }

    console.log(gigListingRequest);

    this.gigListingService.createGigListing(gigListingRequest).subscribe({
      next: result => {
        this.dialogRef.close(result);
      },
      error: result => {
        alert("Error when creating gig listing.");
      }
    })
  }

}
