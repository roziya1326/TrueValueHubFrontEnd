import { Routes } from '@angular/router';
import { NavbarComponent } from './components/nav-bar/navbar.component';
import { CostPageComponent } from './pages/Costing/cost-page/cost-page.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';

export const routes: Routes = [

      {
        path: 'home',
        component: HomePageComponent,
        children:[]
      },
      {
        path: 'costing',
        component: CostPageComponent,
        children: [],
    },  
];
