import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';

  submit(): void {
    console.log('SUBMIT FUNCTION RAN');

    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: response => {
          console.log('Login success', response);

          switch (response.role) {
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;

            case 'COMPANY':
              this.router.navigate(['/company']);
              break;

            case 'GAMER':
              this.router.navigate(['/gamer']);
              break;

            default:
              this.router.navigate(['/access-denied']);
              break;
          }
        },

        error: error => {
          console.error('Login error', error);
        },
      });
  }
}