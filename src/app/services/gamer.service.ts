import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GamerGame {
  id: number;
  name: string;
  price: number;
  description: string | null;
  companyUsername: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamerService {
  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7259/api/gamer';

  getGames(): Observable<GamerGame[]> {
    return this.http.get<GamerGame[]>(
      `${this.apiUrl}/games`,
      {
        withCredentials: true,
      }
    );
  }

  getLibrary(): Observable<GamerGame[]> {
    return this.http.get<GamerGame[]>(
      `${this.apiUrl}/library`,
      {
        withCredentials: true,
      }
    );
  }

  addToLibrary(
    gameId: number
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/library/${gameId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  removeFromLibrary(
    gameId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/library/${gameId}`,
      {
        withCredentials: true,
      }
    );
  }
}