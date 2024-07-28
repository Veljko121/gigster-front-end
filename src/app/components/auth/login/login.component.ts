import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../model/login.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'msm-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared-styles.css']
})
export class LoginComponent {

  invalidUsernameOrPassword: Boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    this.authService.login(login).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.invalidUsernameOrPassword = true;
      }
    });
  }

}
