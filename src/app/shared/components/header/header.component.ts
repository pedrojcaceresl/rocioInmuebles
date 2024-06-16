import { Component } from '@angular/core';
import { last } from 'rxjs';


type MenuItem = {
  route: string;
  title: string;
}

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    {
      route: '/propiedades',
      title: 'propiedades',
    },
    {
      route: '/mapa',
      title: 'mapa',
    },
    {
      route: '/about',
      title: 'sobre mi',
    },
  ];
}
