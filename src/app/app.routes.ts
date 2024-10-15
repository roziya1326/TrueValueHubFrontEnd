import { Routes } from '@angular/router';
import { CostPageComponent } from './pages/Costing/cost-page/cost-page.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'costing',
    loadChildren: () =>
      import('./pages/Costing/costing.module').then((m) => m.CostingModule),
  },
];
