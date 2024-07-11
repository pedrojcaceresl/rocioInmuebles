import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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

  isAuthenticated = false;


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
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .then(response=>{
        console.log(response)
        this.isAuthenticated = true;
        sessionStorage.setItem("authToken", "mock-token");
        this.router.navigate(['/admin']);
      })
      .catch(error=>{
        console.log(error)
      });
    }
  }
}
