import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'student', component: StudentComponent },
  { path: '**', redirectTo: '/main' }
];

