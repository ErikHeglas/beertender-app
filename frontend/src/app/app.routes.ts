import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'beer-list',
    loadComponent: () =>
      import('./beer-list/beer-list.component').then(
        (m) => m.BeerListComponent
      ),
  },
  {
    path: 'beer-add',
    loadComponent: () =>
      import('./beer-add/beer-add.component').then((m) => m.BeerAddComponent),
  },
  {
    path: 'beer-edit/:id',
    loadComponent: () =>
      import('./beer-edit/beer-edit.component').then(
        (m) => m.BeerEditComponent
      ),
  },
  {
    path: '',
    redirectTo: 'beer-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'beer-list',
    pathMatch: 'full',
  },
];
