import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [AuthComponent, LoginComponent, ForgotPasswordComponent]
})
export class AuthModule { }
