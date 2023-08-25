import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropiedadesService } from '../../../../shared/services/propiedades.service';
import { MatDialog } from '@angular/material/dialog';

import { NuevaPropiedadPageComponent } from '../nueva-propiedad-page/nueva-propiedad-page.component';
import { BehaviorSubject } from 'rxjs';
import Propiedad from '../../interfaces/propiedades.interface';


@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisPropiedadesComponent implements OnInit {
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
    private propiedadesService: PropiedadesService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private zone: NgZone,

  ){

  }
  ngOnInit(): void {
    this.zone.run(()=>{
      this.propiedadesService.getPropiedades().subscribe(res=>{
        console.log({res});
        this.propiedades = res;
        this.filteredCards = [...this.propiedades];
        this.cd.markForCheck();
      });
    })
  }




  editarPropiedad(propiedad: Propiedad){
    // console.log('data', {propiedad});
    this.dialog.open(NuevaPropiedadPageComponent, {
      data: {propiedad, editMode: true}
    })
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
