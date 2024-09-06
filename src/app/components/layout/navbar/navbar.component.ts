import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/model/user.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'gig-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: User | undefined | null = null;
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  search(): void {
    if (this.searchText.trim() != '') {
      this.router.navigate(['/search'], { queryParams: { query: this.searchText } });
    }
  }

}
