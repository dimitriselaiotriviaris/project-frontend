import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  username = '';
  email = '';
  password = '';

  roleId = 3;
  errorMessage = '';

  submit(): void {
    this.errorMessage = '';

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/;

    if (!passwordPattern.test(this.password)) {
      return;
    }
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
        if (error.status === 409) {
          this.errorMessage = error.error?.message ?? 'A user with this email already exists.';
          this.changeDetectorRef.detectChanges();
          return;
        }

        this.errorMessage = 'Registration failed. Please try again later.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
