import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { NuevaPropiedadPageComponent } from '../nueva-propiedad-page/nueva-propiedad-page.component';
import { BehaviorSubject } from 'rxjs';
import Propiedad from '../../interfaces/propiedades.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FirebaseService } from '../../../../shared/services/firebase.service';


@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisPropiedadesComponent implements OnInit {
  propiedades: any = [];
  filteredCards: any; // Inicialmente, muestra todas las tarjetas
  filtros: any;

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
  path: string = 'propiedades'

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private zone: NgZone,

  ){
  }

  ngOnInit(): void {
    this.zone.run(()=>{
      this.firebaseService.getData(this.path).subscribe(res=>{
        console.log({res});
        this.propiedades = res;
        this.filteredCards = [...this.propiedades];
        this.cd.markForCheck();
      });
    })
  }

  nuevaPropiedad(){
    const dialogRef =  this.dialog.open(NuevaPropiedadPageComponent, {
    })
  }


  editarPropiedad(propiedad: Propiedad){
    this.dialog.open(NuevaPropiedadPageComponent, {
      data: {propiedad, editMode: true}
    })
  }

  eliminarPropiedad(propiedad: Propiedad){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data : propiedad.titulo
    })

    dialogRef.afterClosed().subscribe(res => {
      res && this.firebaseService.deleteData(propiedad, this.path)
      .then( (res) =>{
        this.cd.markForCheck();
      })
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
