import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Registration } from '../model/registration.model';

@Component({
  selector: 'msm-registration',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../shared-styles.css', '../../shared-styles.css']
})
export class RegistrationComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register(): void {
    const registration: Registration = {
      firstName: this.registrationForm.value.firstName || '',
      lastName: this.registrationForm.value.lastName || '',
      email: this.registrationForm.value.email || '',
      username: this.registrationForm.value.username || '',
      password: this.registrationForm.value.password || '',
    }
    this.authService.register(registration).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

}
