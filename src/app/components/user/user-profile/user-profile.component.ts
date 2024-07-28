import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.model';
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

  constructor(
    private registeredUserService: RegisteredUserService
  ) { }

  ngOnInit(): void {
    this.loadLoggedInRegisteredUser();
  }

  loadLoggedInRegisteredUser(): void {
    this.registeredUserService.getLoggedInRegisteredUser().subscribe({
      next: registeredUser => {
        this.registeredUser = registeredUser;
      },
      error: () => {
        alert("ERROR");
      }
    })
  }

}
