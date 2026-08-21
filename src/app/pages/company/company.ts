import {
  Component,
  inject,
  afterNextRender,
  ChangeDetectorRef,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import {
  CompanyService,
  Game,
} from '../../services/company.service';

@Component({
  selector: 'app-company',
  imports: [
    FormsModule,
  ],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company {
  private readonly companyService = inject(CompanyService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  games: Game[] = [];

  name = '';
  price = 0;
  description = '';

  editingId: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.loadGames();
    });
  }

  loadGames(): void {
    this.companyService.getGames().subscribe({
      next: games => {
        console.log('GAMES FROM API:', games);
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

  saveGame(): void {
    if (!this.name.trim()) {
      return;
    }

    const request = {
      name: this.name.trim(),
      price: this.price,
      description: this.description.trim(),
    };

    if (this.editingId !== null) {
      this.companyService
        .updateGame(
          this.editingId,
          request
        )
        .subscribe({
          next: () => {
            this.resetForm();
            this.loadGames();
          },

          error: error => {
            console.error(
              'Could not update game',
              error
            );
          },
        });

      return;
    }

    this.companyService
      .createGame(request)
      .subscribe({
        next: () => {
          this.resetForm();
          this.loadGames();
        },

        error: error => {
          console.error(
            'Could not create game',
            error
          );
        },
      });
  }

  editGame(game: Game): void {
    this.editingId = game.id;

    this.name = game.name;
    this.price = game.price;
    this.description =
      game.description ?? '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.editingId = null;

    this.name = '';
    this.price = 0;
    this.description = '';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: error => {
        console.error(
          'Logout failed',
          error,
        );
      },
    });
  }
}