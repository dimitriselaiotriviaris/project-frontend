import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  email = '';
  password = '';

  roleId = 3;

  submit(): void {
    const request: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
    };

    this.authService.register(request).subscribe({
      next: response => {
        console.log('Registration success', response);
        this.router.navigate(['/login']);
      },

      error: error => {
        console.error('Registration error', error);
      },
    });
  }
}
