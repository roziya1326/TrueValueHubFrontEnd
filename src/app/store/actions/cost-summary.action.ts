import { createAction, props } from '@ngrx/store';

export const updateTotalMaterialCost = createAction(
  '[Material Form] Update Total Material Cost',
  props<{ totalMaterialCost: number }>()
);
