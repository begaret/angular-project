import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: WelcomeComponent },
  { path: 'student', component: StudentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/login' }
];

