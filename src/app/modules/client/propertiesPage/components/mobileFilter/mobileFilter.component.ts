import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileFilterService } from './mobileFilter.service';

@Component({
  selector: 'app-mobile-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen">
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        (click)="closeSidebar()"
      ></div>
      <div
        class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-auto p-4"
      >
        <button (click)="closeSidebar()" class="text-right mb-4 text-amarillo-rocio font-bold">Cerrar</button>
        <!-- Contenido del sidebar -->
        <ng-content></ng-content>
        <!-- Puedes añadir más contenido aquí -->
      </div>
    </div>
  `,
  styleUrls: ['./mobileFilter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileFilterComponent {
  isOpen = false;
  cd = inject(ChangeDetectorRef);
  animationClass = '';
  
  private subscription: Subscription;
  
  constructor(private sidebarService: MobileFilterService) {
    this.subscription = this.sidebarService.isOpen$.subscribe((isOpen: any) => {
      this.isOpen = isOpen;
      this.cd.markForCheck();
      console.log(isOpen);
    });
  }

  closeSidebar() {
    this.sidebarService.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
