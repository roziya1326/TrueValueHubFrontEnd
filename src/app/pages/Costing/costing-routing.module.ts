import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostPageComponent } from './cost-page/cost-page.component';

const routes: Routes = [
  {
    path: '',
    component: CostPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostingRoutingModule {}
