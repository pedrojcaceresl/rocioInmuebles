import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly STORAGE_KEY = 'sidebarCollapsed';

  $collapsed = new BehaviorSubject<boolean>(false);

  setCollapsed(collapsed: boolean) {
    this.$collapsed.next(collapsed);
    localStorage.setItem(this.STORAGE_KEY, String(collapsed)); // Store the collapsed state in localStorage
  }

  toggleCollapsed() {
    const collapsed = this.$collapsed.getValue();
    this.setCollapsed(!collapsed);
  }

  loadCollapsedState() {
    const collapsedState = localStorage.getItem(this.STORAGE_KEY);
    const isMobile = window.innerWidth < 768;
    const initialState =
      collapsedState !== null ? collapsedState === 'true' : isMobile;
    this.setCollapsed(initialState);
  }
}
