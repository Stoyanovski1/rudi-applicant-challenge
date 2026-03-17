// Zusätzlich habe ich Route Guards implementiert.
// Route Guards werden verwendet, um den Zugriff auf bestimmte Routen zu kontrollieren.
// Der Benutzter kann nicht auf Step 2 oder Summary zugreifen ohne die
// vorherigen Schritte abgeschlossen zu haben

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FormDataService } from './form-data.service';

// Dieser Guard wird für die Route /step-2 verwendet.
export const stepTwoGuard: CanActivateFn = () => {

  // Dependency Injection -> um den F und den R zu erhalten.
  const formDataService = inject(FormDataService);
  const router = inject(Router);

  // Prüfen ob Step 1 Daten existieren
  const stepOneData = formDataService.getStepOneData();

  // Zugriff erlauben oder blockieren
  if (stepOneData) {
    return true;
  }

  // Sonst zurück zu Step 1
  router.navigate(['/step-1']);
  return false;
};

// Dieser Guard schützt die Summary-Seite.
export const summaryGuard: CanActivateFn = () => {

  // Dependency Injection -> um den F und den R zu erhalten.
  const formDataService = inject(FormDataService);
  const router = inject(Router);

  // Beide Schritte prüfen ob die passen (ausgefüllt)
  const stepOneData = formDataService.getStepOneData();
  const stepTwoData = formDataService.getStepTwoData();

  // Zugriff erlauben
  if (stepOneData && stepTwoData) {
    return true;
  }

  // Wenn Step-1 passt (ausgefüllt ist), klicke ich auf summary(menü), wird -> Step-2 landen
  if(stepOneData){
    router.navigate(['/step-2']);
    return false;
  }

  // Sonst zurück zu Step 1
  router.navigate(['/step-1']);
  return false;
};