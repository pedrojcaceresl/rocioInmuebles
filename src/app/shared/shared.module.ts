import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { SidebarComponent, SidebarItemComponent, SidebarItemGroupComponent } from './components/sidebar';
import { SanitizeHtmlPipe } from './pipes';
import { RouterModule } from '@angular/router';
import { DarkThemeToggleComponent } from './components/dark-theme-toggle';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { PaginadorComponent } from './components/paginador/paginador.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    SanitizeHtmlPipe,
    DarkThemeToggleComponent,
    SearchBoxComponent,
    ImageUploaderComponent,
    PaginadorComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    NavbarComponent,
    DarkThemeToggleComponent,
    SearchBoxComponent,
    ImageUploaderComponent,
    PaginadorComponent,
  ],
})
export class SharedModule {}
