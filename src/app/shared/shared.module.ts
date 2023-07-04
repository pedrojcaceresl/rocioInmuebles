import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { SidebarComponent, SidebarItemComponent, SidebarItemGroupComponent } from './components/sidebar';
import { SanitizeHtmlPipe } from './pipes';
import { RouterModule } from '@angular/router';
import { DarkThemeToggleComponent } from './components/dark-theme-toggle';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    SanitizeHtmlPipe,
    DarkThemeToggleComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    NavbarComponent,
    DarkThemeToggleComponent,
  ],
})
export class SharedModule {}
