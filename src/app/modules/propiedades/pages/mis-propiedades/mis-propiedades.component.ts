import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Propiedad from '../../interfaces/propiedades.interface';
import { PropiedadesService } from '../../../../shared/services/propiedades.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevaPropiedadPageComponent } from '../nueva-propiedad-page/nueva-propiedad-page.component';

@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss']
})
export class MisPropiedadesComponent {

  propiedades: any

  constructor(
    private http: HttpClient,
    private propiedadesService: PropiedadesService,
    private dialog: MatDialog,

  ){
    // this.http.get('/assets/propiedades.json').subscribe(res=>{
    //   this.propiedades = res;
    // })

    this.propiedadesService.getPropiedades().subscribe(res=>{
      console.log({res});
      this.propiedades = res;

    })
  }

  editarPropiedad(propiedad: Propiedad){
    console.log('data', {propiedad});
    this.dialog.open(NuevaPropiedadPageComponent, {
      data: propiedad
    })
  }





}
