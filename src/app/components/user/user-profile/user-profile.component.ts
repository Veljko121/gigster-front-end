import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../model/registered-user.model';
import { RegisteredUserService } from '../registered-user.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'msm-user-profile',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  registeredUser: RegisteredUser | undefined;
  profilePicturePath: string | undefined;

  constructor(
    private registeredUserService: RegisteredUserService,
    private dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.loadLoggedInRegisteredUser();
  }

  loadLoggedInRegisteredUser(): void {
    this.registeredUserService.getLoggedInRegisteredUser().subscribe({
      next: registeredUser => {
        this.registeredUser = registeredUser;
        this.loadProfilePicture(this.registeredUser.id);
      },
      error: () => {
        alert("Error while loading profile page.");
      }
    })
  }

  loadProfilePicture(id: number): void {
    this.profilePicturePath = this.registeredUserService.getProfilePicturePathByRegisteredUserId(id) + '?' + (new Date()).getTime();
  }

  openFile(): void {
    document.getElementById('file-dialog')?.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.registeredUserService.updateProfilePicture(file).subscribe({
        next: () => {
          this.loadProfilePicture(this.registeredUser!.id);
        },
        error: () => {
          alert('Error when updating profile picture');
        }
      })
    }
  }

  openUpdateProfileDialog(): void {
    let dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {
        registeredUser: this.registeredUser
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadLoggedInRegisteredUser();
    })
  }

}
