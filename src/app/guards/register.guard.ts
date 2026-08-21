import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router,
} from '@angular/router';

import {
  catchError,
  map,
  of,
} from 'rxjs';

import { AuthService } from '../services/auth.service';

export const registerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map(user => {
      switch (user.role) {
        case 'COMPANY':
          return router.createUrlTree([
            '/company',
          ]);

        case 'GAMER':
          return router.createUrlTree([
            '/gamer',
          ]);

        case 'ADMIN':
          return router.createUrlTree([
            '/admin',
          ]);

        default:
          return true;
      }
    }),

    catchError(() => {
      // Not logged in, so register page is allowed.
      return of(true);
    }),
  );
};