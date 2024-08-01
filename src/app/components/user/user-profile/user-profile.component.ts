import { Component } from '@angular/core';
import { RegisteredUser } from '../model/registered-user.model';
import { RegisteredUserService } from '../registered-user.service';

@Component({
  selector: 'msm-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  registeredUser: RegisteredUser | undefined;
  profilePicturePath: string | undefined;

  constructor(
    private registeredUserService: RegisteredUserService,
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
        alert("ERROR");
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
          alert('ERROR when updating profile picture');
        }
      })
    }
  }

}
