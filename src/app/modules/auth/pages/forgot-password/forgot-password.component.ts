import { Component, inject } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
    `
      .error {
        color: red;
      }

      .success {
        color: green;
      }
    `,
  ],
})
export class ForgotPasswordComponent {
  public currentLanguage = '';

  windowWidth: number = 0;

  passForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.customEmailValidator()],
    }),
  });

  resetError!: string;
  resetSuccess!: boolean;
  wrongPass: any = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.updateWindowWidth();
  }

  resetPassword() {
    if (this.passForm.invalid) return;
    this.authService
      .resetPassword(this.passForm.value)
      .then(() => {
        this.alertService.openAlert(
          'Link de reestablecimiento de contraseña enviado, revise su correo y siga las instrucciones.'
        );
        this.passForm.reset();
      })
      .catch((error) => {
        if ('Firebase: Error (auth/user-not-found).') {
          this.alertService.openAlertError(
            'Usuario no encontrado, revise el correo.'
          );
          this.passForm.reset();
        }
      });
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailPattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(control.value)) {
        return { invalidEmail: true };
      }

      return null;
    };
  }

  goBack(): void {
    window.history.back();
  }

  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  }
}
