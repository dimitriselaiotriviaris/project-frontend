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

export const roleGuard: CanActivateFn = route => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole =
    route.data['role'] as string;

  return authService.me().pipe(
    map(user => {
      if (user.role === requiredRole) {
        return true;
      }

      // Logged in, but wrong page.
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
          return router.createUrlTree([
            '/login',
          ]);
      }
    }),

    catchError(() => {
      return of(
        router.createUrlTree(['/login']),
      );
    }),
  );
};