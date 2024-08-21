import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../model/registered-user.model';
import { RegisteredUserService } from '../registered-user.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateBandComponent } from '../../bands/create-band/create-band.component';
import { BandService } from '../../bands/band.service';
import { Band } from '../../bands/model/band.model';
import { BandCardComponent } from "../../bands/band-card/band-card.component";
import { UpdateBandComponent } from '../../bands/update-band/update-band.component';
import { DefaultImageDirective } from '../../../directives/default-image.directive';
import { ConfirmationDialogComponent } from '../../layout/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'gig-user-profile',
  standalone: true,
  imports: [
    MatDialogModule,
    BandCardComponent,
    DefaultImageDirective,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  registeredUser: RegisteredUser | undefined;
  bands: Band[] = [];
  profilePicturePath: string | undefined;

  constructor(
    private registeredUserService: RegisteredUserService,
    private bandService: BandService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadLoggedInRegisteredUser();
    this.loadMyBands();
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

  loadMyBands(): void {
    this.bandService.getMyBands().subscribe({
      next: result => {
        this.bands = result;
      },
      error: () => {
        alert("Error while loading bands.");
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

  openCreateBandDialog(): void {
    let dialogRef = this.dialog.open(CreateBandComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadMyBands();
    })
  }

  updateBand(band: Band): void {
    let dialogRef = this.dialog.open(UpdateBandComponent, {
      data: {
        band: band
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.bands = [];
      this.loadMyBands();
    })
  }

  deleteBand(band: Band): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure you want to delete band '" + band.name + "'?"
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.bandService.deleteBand(band.id).subscribe({
            next: result => {
              this.loadMyBands();
            },
            error: () => {
              alert('Error when deleting band.');
            }
          })
        }
      }
    })
  }

}
