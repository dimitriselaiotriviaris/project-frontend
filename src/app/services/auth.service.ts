import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(
      'https://localhost:7259/api/auth/login',
      {
        username: email,
        password,
        keepLoggedIn: false,
      },
      {
        withCredentials: true,
      },
    );
  }
}