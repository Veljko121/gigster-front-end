import { Component } from '@angular/core';
import { RegisteredUser } from '../model/registered-user.model';
import { RegisteredUserService } from '../registered-user.service';
import { ProfilePictureService } from '../profile-picture.service';

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
    private profilePicturesService: ProfilePictureService
  ) { }

  ngOnInit(): void {
    this.loadLoggedInRegisteredUser();
  }

  loadLoggedInRegisteredUser(): void {
    this.registeredUserService.getLoggedInRegisteredUser().subscribe({
      next: registeredUser => {
        this.registeredUser = registeredUser;
        this.loadProfilePicture(registeredUser.profilePicturePath);
      },
      error: () => {
        alert("ERROR");
      }
    })
  }

  loadProfilePicture(profilePictureName: string): void {
    this.profilePicturePath = this.profilePicturesService.getProfilePicturePath(profilePictureName);
  }

}
