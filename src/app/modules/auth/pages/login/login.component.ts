import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [''],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  isTextFieldType!: boolean;
  submitted: any = false;
  wrongPass: any = false;

  public currentLanguage = '';

  windowWidth: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      email: [null, [Validators.required, this.customEmailValidator()]],
      password: [null, [Validators.required]],
      rememberMe: [false],
    });

    const savedPassword = localStorage.getItem('rememberedPassword');
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedPassword && savedEmail) {
      this.formulario.patchValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.formulario.valid) {
      if (this.formulario.value.rememberMe) {
        localStorage.setItem(
          'rememberedPassword',
          this.formulario.value.password
        );
        localStorage.setItem('rememberedEmail', this.formulario.value.email);
        localStorage.setItem('rememberLogged', 'Yes');
      } else {
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberedEmail');
      }
      this.authService
        .login(this.formulario.value)
        .then((response) => {
          this.router.navigate(['/admin']);
        })
        .catch((error) => {
          if (error.message === 'Firebase: Error (auth/wrong-password).') {
            this.wrongPass = true;
            this.alertService.openAlertError(
              'Contraseña incorrecta, intente de nuevo.'
            );
          }
          if (error.message === 'Firebase: Error (auth/user-not-found).') {
            this.alertService.openAlertError(
              'Usuario no encontrado, revise el correo o la contraseña.'
            );
          }
        });
    }
  }

  resetPass() {
    this.authService
      .resetPassword(this.formulario.value)
      .then((response) => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.error(error));
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(control.value)) {
        return { invalidEmail: true };
      }

      return null;
    };
  }

  togglemyPasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  setEmailValidator() {
    this.formulario.get('email')?.setValidators(Validators.email);
  }

  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  }
}
