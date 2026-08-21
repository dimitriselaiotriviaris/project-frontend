import {
  Component,
  inject,
  afterNextRender,
  ChangeDetectorRef,
} from '@angular/core';

import {
  GamerService,
  GamerGame,
} from '../../services/gamer.service';

@Component({
  selector: 'app-gamer',
  imports: [],
  templateUrl: './gamer.html',
  styleUrl: './gamer.css',
})
export class Gamer {
  private readonly gamerService =
    inject(GamerService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  games: GamerGame[] = [];
  library: GamerGame[] = [];

  constructor() {
    afterNextRender(() => {
      this.loadGames();
      this.loadLibrary();
    });
  }

  loadGames(): void {
    this.gamerService.getGames().subscribe({
      next: games => {
        this.games = games;
        this.cdr.detectChanges();
      },

      error: error => {
        console.error(
          'Could not load games',
          error
        );
      },
    });
  }

  loadLibrary(): void {
    this.gamerService
      .getLibrary()
      .subscribe({
        next: games => {
          this.library = games;
          this.cdr.detectChanges();
        },

        error: error => {
          console.error(
            'Could not load library',
            error
          );
        },
      });
  }

  addGame(gameId: number): void {
    this.gamerService
      .addToLibrary(gameId)
      .subscribe({
        next: () => {
          this.loadLibrary();
        },

        error: error => {
          console.error(
            'Could not add game',
            error
          );
        },
      });
  }

  removeGame(gameId: number): void {
    this.gamerService
      .removeFromLibrary(gameId)
      .subscribe({
        next: () => {
          this.loadLibrary();
        },

        error: error => {
          console.error(
            'Could not remove game',
            error
          );
        },
      });
  }

  isInLibrary(gameId: number): boolean {
    return this.library.some(
      game => game.id === gameId
    );
  }
}