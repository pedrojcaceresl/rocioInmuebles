import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PropiedadesService } from 'src/app/shared/services/propiedades.service';

@Component({
  templateUrl: './propiedades-page.component.html',
  styleUrls: ['./propiedades-page.component.scss'],
})
export class PropiedadesPageComponent {
  public propiedades: any[] = [];

  isLoading = false;

  http = inject(HttpClient);

  propiedadesService = inject(PropiedadesService);

  ngOnInit() {
    this.propiedadesService.getPropiedades().subscribe((res) => {
      this.isLoading = true;
      this.propiedades = res;
    });
  }
}
