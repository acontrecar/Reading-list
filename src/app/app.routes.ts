import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './books/layout/home-layout/home-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./books/routes/book.routes').then((r) => r.BOOK_ROUTES),
      },
    ],
  },
];
