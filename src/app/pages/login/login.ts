import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  email = '';
  password = '';

  submit(): void {
    console.log('SUBMIT FUNCTION RAN');
    console.log('Angular submit ran', {
      email: this.email,
      password: this.password,
    });

    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: response => {
          console.log('Login success', response);
        },
        error: error => {
          console.error('Login error', error);
        },
      });
  }
}
