import { Component } from '@angular/core'; // für die Angular-Komponente
import { CommonModule } from '@angular/common'; // damit ich Direktiven wie *ngIf im Template verwenden kann
import { Router } from '@angular/router'; // für die Navivation zwischen den Schritten
import { FormDataService } from '../form-data.service'; // um auf die gespeicherten Formulardaten zuzugreifen

// Component Metadata -> Standalone-Komponente
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  // Daten speichern
  stepOneData: any;
  stepTwoData: any;

  constructor(
    // Dependency Injection -> zuzugreifen
    private formDataService: FormDataService,
    private router: Router
  ) {

    // Daten laden
    this.stepOneData = this.formDataService.getStepOneData();
    this.stepTwoData = this.formDataService.getStepTwoData();
  }

  // Edit Step 1
  editStepOne() {
    this.router.navigate(['/step-1']);
  }

  // Edit Step 2
  editStepTwo() {
    this.router.navigate(['/step-2']);
  }

  // Vom Anfang anfangen
  startOver() {
    this.formDataService.clearAll();
    this.router.navigate(['/step-1']);
  }
}