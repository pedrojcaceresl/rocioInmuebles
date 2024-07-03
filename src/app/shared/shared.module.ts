import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { SidebarComponent, SidebarItemComponent, SidebarItemGroupComponent } from './components/sidebar';
import { SanitizeHtmlPipe } from './pipes';
import { RouterModule } from '@angular/router';
import { DarkThemeToggleComponent } from './components/dark-theme-toggle';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { HeaderComponent } from './components/header/header.component';
import { SvgIconComponent, provideAngularSvgIcon } from 'angular-svg-icon';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    SanitizeHtmlPipe,
    DarkThemeToggleComponent,
    ImageUploaderComponent,
    PaginadorComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule,
    FooterComponent,
    SvgIconComponent,
  ],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    NavbarComponent,
    DarkThemeToggleComponent,
    ImageUploaderComponent,
    PaginadorComponent,
    HeaderComponent,
  ],
  providers:[ provideAngularSvgIcon() ],
})
export class SharedModule {}
