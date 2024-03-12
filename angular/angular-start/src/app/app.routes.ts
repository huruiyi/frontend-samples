import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'basic-form', loadChildren: () => import('./pages/form/basic-form/basic-form.routes').then(m => m.BASIC_FORM_ROUTES) }
];
