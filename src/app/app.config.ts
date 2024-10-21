import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore} from '@ngrx/store';
import { provideEffects} from '@ngrx/effects';
import { costSummaryReducer } from './store/reducers/cost-summary.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideAnimations(),
    provideToastr(), provideAnimationsAsync(), provideStore({costSummary: costSummaryReducer}),provideEffects()]
};
