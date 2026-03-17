import { Component } from '@angular/core'; // für die Angular-Komponente
import { CommonModule } from '@angular/common'; // damit ich Direktiven wie *ngIf im Template verwenden kann
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // für das Formular (Felder)
import { Router } from '@angular/router'; // für die Navivation zwischen den Schritten
import { FormDataService } from '../form-data.service'; // für die Formulardaten zwischen den Schritten zu speichern

// Component Metadata -> Ich verwende eine Standalone-Komponente, wodurch ich kein klassisches Angular Module benötige.
@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-two.html',
  styleUrl: './step-two.scss',
})
export class StepTwo {
  form: FormGroup; // Reactive Form als FormGroup, die alle Form Controls enthält.
  countries = ['Austria', 'Germany', 'Switzerland', 'Other'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {
    // Daten wieder laden
    const savedData = this.formDataService.getStepTwoData();

    // Formular erstellen -> Reactive Form -> Validierung
    this.form = this.fb.group({
      street: [savedData?.street || '', Validators.required],
      city: [savedData?.city || '', Validators.required],
      zip: [savedData?.zip || '', Validators.required],
      country: [savedData?.country || '', Validators.required],
      otherCountry: [savedData?.otherCountry || ''],
    });

    this.form.get('country')?.valueChanges.subscribe((value) => {
      const otherCountryControl = this.form.get('otherCountry');

      if (value === 'Other') {
        otherCountryControl?.setValidators([Validators.required]);
      } else {
        otherCountryControl?.clearValidators();
        otherCountryControl?.setValue('');
      }

      otherCountryControl?.updateValueAndValidity();
    });

    if (this.form.get('country')?.value === 'Other') {
      this.form.get('otherCountry')?.setValidators([Validators.required]);
      this.form.get('otherCountry')?.updateValueAndValidity();
    }
  }

  // Next Button Logik -> speichere ich die Daten im FormDataService
  next(): void {
    if (this.form.valid) {
      this.formDataService.setStepTwoData(this.form.value);
      this.router.navigate(['/summary']);
    }
  }

  back(): void {
    this.router.navigate(['/step-1']);
  }
}