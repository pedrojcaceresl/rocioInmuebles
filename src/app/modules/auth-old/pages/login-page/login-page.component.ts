import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: string = '';

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(): void {
    console.log('submit!')
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isLogged = this.authService.login(email, password);

      if (isLogged) {
          this.router.navigate(['/admin']);
      } else {
          this.router.navigate(['/propiedades']);

        this.errorMessage = "Email o contraseña inválido";
      }
    }
  }
}
