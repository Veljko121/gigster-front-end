import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisteredUserService } from '../registered-user.service';
import { RegisteredUserUpdate } from '../model/registered-user-update.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisteredUser } from '../model/registered-user.model';

@Component({
  selector: 'gig-update-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css', '../../shared-styles.css']
})
export class UpdateProfileComponent {

  registeredUser: RegisteredUser;

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<UpdateProfileComponent>,
    private registeredUserService: RegisteredUserService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.registeredUser = this.data.registeredUser;
    this.registrationForm.patchValue({
      firstName: this.registeredUser.firstName,
      lastName: this.registeredUser.lastName,
      email: this.registeredUser.email,
      username: this.registeredUser.username,
    });
  }

  updateProfile(): void {
    const registeredUserUpdate: RegisteredUserUpdate = {
      firstName: this.registrationForm.value.firstName || '',
      lastName: this.registrationForm.value.lastName || '',
      username: this.registrationForm.value.username || '',
      email: this.registrationForm.value.email || '',
    }

    this.registeredUserService.updateProfile(registeredUserUpdate).subscribe({
      next: result => {
        this.dialogRef.close(result);
      },
      error: () => {
        alert('Error while updating profile.');
      }
    })
  }

}
