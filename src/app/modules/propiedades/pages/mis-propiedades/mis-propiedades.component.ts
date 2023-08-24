import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropiedadesService } from '../../../../shared/services/propiedades.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss'],
})
export class MisPropiedadesComponent {
  propiedades: any = [];
  filteredCards: any; // Inicialmente, muestra todas las tarjetas

  filters = [
    { name: 'Lotes', checked: false },
    { name: 'Casas', checked: false },
    { name: 'Condominio', checked: false },
    { name: 'Barrio Cerrado', checked: false },
    // Agrega más filtros según tus necesidades
  ];
  selectedFilters: string[] = [];
  selectedFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  etiquetas: string[] = ['casas', 'lote', 'lujo', 'piscina'];

  constructor(
    private http: HttpClient,
    private propiedadesService: PropiedadesService
  ) {
    this.http.get('/assets/propiedades.json').subscribe((res) => {
      this.propiedades = res;
      this.filteredCards = [...this.propiedades];
    });

    // this.propiedadesService.getPropiedades().subscribe((res) => {
    //   console.log({ res });
    //   this.propiedades = res;
    // });
  }

  applyFilters(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);
    }

    // Luego de actualizar los filtros, aplicamos los filtros
    this.filteredCards = this.propiedades.filter((property: any) => {
      return this.selectedFilters.every((filter) =>
        property.etiquetas.includes(filter)
      );
    });
  }
}
