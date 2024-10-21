import { createReducer, on } from '@ngrx/store';
import { updateTotalMaterialCost } from '../actions/cost-summary.action';

export interface CostSummaryState {
  totalMaterialCost: number;
}

export const initialState: CostSummaryState = {
  totalMaterialCost: 0
};

export const costSummaryReducer = createReducer(
  initialState,
  on(updateTotalMaterialCost, (state, { totalMaterialCost }) => ({
    ...state,
    totalMaterialCost
  }))
);
