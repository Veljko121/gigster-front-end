import { Component, Inject } from '@angular/core';
import { GigListing } from '../model/gig-listing.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GigListingUpdateRequest } from '../model/gig-listing-update.request.model';
import { GigListingService } from '../gig-listing.service';

@Component({
  selector: 'gig-update-gig-listing',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-gig-listing.component.html',
  styleUrls: [
    './update-gig-listing.component.css',
    '../../shared-styles.css',
  ]
})
export class UpdateGigListingComponent {

  gigListing: GigListing;

  gigListingForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    startingPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    pricePerAdditionalHour: new FormControl(0, [Validators.required, Validators.min(0)]),
    minimumDurationHours: new FormControl(0, [Validators.required, Validators.min(0)]),
    maximumAdditionalHours: new FormControl(0, [Validators.required, Validators.min(0)]),
    durationDays: new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(
    private dialogRef: MatDialogRef<UpdateGigListingComponent>,
    private gigListingService: GigListingService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.gigListing = data.gigListing;
    this.gigListingForm.patchValue({
      title: this.gigListing.title,
      startingPrice: this.gigListing.startingPrice,
      pricePerAdditionalHour: this.gigListing.pricePerAdditionalHour,
      minimumDurationHours: this.gigListing.minimumDurationHours,
      maximumAdditionalHours: this.gigListing.maximumAdditionalHours,
      durationDays: this.gigListing.durationDays,
    });
  }

  updateGigListing(): void {
    const gigListingUpdateRequest: GigListingUpdateRequest = {
      title: this.gigListingForm.value.title || '',
      startingPrice: this.gigListingForm.value.startingPrice || 0,
      pricePerAdditionalHour: this.gigListingForm.value.pricePerAdditionalHour || 0,
      minimumDurationHours: this.gigListingForm.value.minimumDurationHours || 0,
      maximumAdditionalHours: this.gigListingForm.value.maximumAdditionalHours || 0,
    }

    this.gigListingService.updateGigListing(this.gigListing.id, gigListingUpdateRequest).subscribe({
      next: result => {
        this.dialogRef.close(result);
      },
      error: () => {
        alert("Error when updating gig listing.");
      }
    })
  }

}
