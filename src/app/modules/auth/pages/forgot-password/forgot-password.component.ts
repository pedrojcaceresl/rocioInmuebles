import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  form!: FormGroup;

  constructor( 
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ){}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.form.value)
    this.authService.forgotPassword(this.form.value)
    alert('Por favor verifique su correo!')
    this.router.navigate(['/auth/login'])
  }


}
