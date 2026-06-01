import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/project-list/project-list.component').then(m => m.ProjectListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/new',
    loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/edit',
    loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
];
