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

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'admin',
        component: Admin
    },
    {
        path: 'company',
        component: Company
    },
    {
        path: 'gamer',
        component: Gamer
    },
    {
        path: 'access-denied',
        component: AccessDenied
    },
    {
        path: 'register',
        component: Register
    }
];
