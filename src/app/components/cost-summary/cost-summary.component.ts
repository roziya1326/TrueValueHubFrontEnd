import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CostSummaryState } from '../../store/reducers/cost-summary.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cost-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-summary.component.html',
  styleUrl: './cost-summary.component.css'
})
export class CostSummaryComponent {
  totalMaterialCost$: Observable<number>;

  constructor(private store: Store<{ costSummary: CostSummaryState }>) {
    this.totalMaterialCost$ = this.store.select(state => state.costSummary.totalMaterialCost);
  }
}
