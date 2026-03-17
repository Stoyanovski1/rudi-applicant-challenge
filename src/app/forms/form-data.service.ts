// Um die Daten zwischen den einzelnen Schritten zu speichern,
// habe ich einen Angular Service implementiert.
// Ohne einen gemeinsamen Speicher würden die Daten beim Navigieren verloren gehen.

import { Injectable } from '@angular/core';

// Der Service ist mit @Injectable definiert und wird mit providedIn: 'root'
// global in der Anwendung bereitgestellt. -> Das nennt man Singleton Service.
@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  // Daten speichern
  private stepOneData: any = null;
  private stepTwoData: any = null;

  // Step 1 Daten speichern
  setStepOneData(data: any) {
    this.stepOneData = data;
  }

  // Step 1 Daten abrufen
  getStepOneData() {
    return this.stepOneData;
  }

  // Step 2 Daten speichern
  setStepTwoData(data: any) {
    this.stepTwoData = data;
  }

  // Step 2 Daten abrufen
  getStepTwoData() {
    return this.stepTwoData;
  }

  // Reset Funktion -> Start Over
  clearAll() {
    this.stepOneData = null;
    this.stepTwoData = null;
  }
}