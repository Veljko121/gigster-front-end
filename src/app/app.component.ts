import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'gig-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'Gigster';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.checkIfUserExists();
  }

}
