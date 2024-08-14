import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'gig-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: User | undefined | null = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
