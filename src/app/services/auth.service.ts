import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  id: number;
  username: string;
  role: 'ADMIN' | 'COMPANY' | 'GAMER';
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roleId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://localhost:7259/api/auth';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
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

  me(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(
      `${this.apiUrl}/me`,
      {
        withCredentials: true,
      },
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  register(data: RegisterRequest) {
    return this.http.post(
      `${this.apiUrl}/register`,
      data,
      {
        withCredentials: true,
      },
    );
  }
}