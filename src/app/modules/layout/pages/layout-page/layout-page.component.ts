import { Component, HostListener } from '@angular/core';
import { components } from '../components';
import { SidebarService } from 'src/app/core/services';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
})
export class LayoutPageComponent {
  components = components;
  isMobile!: boolean;
  constructor(public sidebarService: SidebarService) {
    sidebarService.loadCollapsedState();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.isMobile = window.innerWidth < 768; // Adjust the threshold as per your needs
    this.sidebarService.setCollapsed(this.isMobile);
  }

  onClickOutside() {
    if (!this.isMobile) return;
    this.sidebarService.setCollapsed(true);
  }

}
