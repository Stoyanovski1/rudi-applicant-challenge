import { Routes } from '@angular/router';
import { stepTwoGuard, summaryGuard } from './forms/step.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'step-1', pathMatch: 'full' },
  { path: 'step-1', loadComponent: () => import('./forms/step-one/step-one').then(m => m.StepOne) },
  { path: 'step-2', canActivate: [stepTwoGuard], loadComponent: () => import('./forms/step-two/step-two').then(m => m.StepTwo) },
  { path: 'summary', canActivate: [summaryGuard], loadComponent: () => import('./forms/summary/summary').then(m => m.Summary) },
];
