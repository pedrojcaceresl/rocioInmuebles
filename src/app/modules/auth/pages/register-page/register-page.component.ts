import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{

  formReg: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSubmit(){
    console.log(this.formReg.value)
    this.authService.register(this.formReg.value)
    .then(response =>{
      console.log(response)
      this.router.navigate(['/auth/login'])
    })
    .catch(error =>{
      console.log(error)
    })
  }

}
