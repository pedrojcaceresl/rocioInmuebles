import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';



@NgModule({
  declarations: [
    AboutComponent,
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    FooterComponent
  ]
})
export class AboutModule { }
