import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  price: number;
  description: string | null;
}

export interface GameRequest {
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7259/api/company';

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${this.apiUrl}/games`,
      {
        withCredentials: true,
      }
    );
  }

  createGame(game: GameRequest): Observable<Game> {
    return this.http.post<Game>(
      `${this.apiUrl}/games`,
      game,
      {
        withCredentials: true,
      }
    );
  }

  updateGame(
    id: number,
    game: GameRequest
  ): Observable<Game> {
    return this.http.put<Game>(
      `${this.apiUrl}/games/${id}`,
      game,
      {
        withCredentials: true,
      }
    );
  }
}