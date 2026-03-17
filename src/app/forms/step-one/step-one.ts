import { Component } from '@angular/core'; // für die Angular-Komponente
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; // für das Formular (Felder)
import { Router } from '@angular/router'; // für die Navivation zwischen den Schritten
import { FormDataService } from '../form-data.service'; // für die Formulardaten zwischen den Schritten zu speichern
import { CommonModule } from '@angular/common'; // damit ich Direktiven wie *ngIf im Template verwenden kann

// Component Metadata -> Ich verwende eine Standalone-Komponente, wodurch ich kein klassisches Angular Module benötige.
@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-one.html',
  styleUrl: './step-one.scss'
})
export class StepOne {
  form!: FormGroup; // Reactive Form als FormGroup, die alle Form Controls enthält.

  constructor(
    private fb: FormBuilder, // FormBuilder zum Erstellen des Formulars
    private router: Router,
    private formDataService: FormDataService
  ) {
    // Daten wieder laden
    const savedData = this.formDataService.getStepOneData();

    // Formular erstellen -> Reactive Form -> Validierung
    this.form = this.fb.group({
      firstName: [savedData?.firstName || '', Validators.required],
      lastName: [savedData?.lastName || '', Validators.required],
      email: [savedData?.email || '', [Validators.required, Validators.email]]
    });
  }

  // Next Button Logik -> speichere ich die Daten im FormDataService
  next() {
    if (this.form.valid) {
      this.formDataService.setStepOneData(this.form.value);
      this.router.navigate(['/step-2']);
    }
  }
}