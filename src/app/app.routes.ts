import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './home/home';
import { Admin } from './pages/admin/admin';
import { Teacher } from './pages/teacher/teacher';
import { Student } from './pages/student/student';
import { AccessDenied } from './pages/access-denied/access-denied';
import { Register } from './pages/register/register';
import { Company } from './pages/company/company';
import { Gamer } from './pages/gamer/gamer';
import { roleGuard } from './guards/role.guard';
import { loginGuard } from './guards/login.guard';
import { registerGuard } from './guards/register.guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login,
        canActivate: [loginGuard]
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [roleGuard],
        data: { role: 'ADMIN' }
    },
    {
        path: 'company',
        component: Company,
        canActivate: [roleGuard],
        data: { role: 'COMPANY' }
    },
    {
        path: 'gamer',
        component: Gamer,
        canActivate: [roleGuard],
        data: { role: 'GAMER' }
    },
    {
        path: 'access-denied',
        component: AccessDenied
    },
    {
        path: 'register',
        component: Register,
        canActivate: [registerGuard]
    }
];
