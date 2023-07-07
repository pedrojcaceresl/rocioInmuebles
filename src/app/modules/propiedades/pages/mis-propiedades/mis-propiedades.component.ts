import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Propiedad from '../../interfaces/propiedades.interface';
import { PropiedadesService } from '../../../../shared/services/propiedades.service';

@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss']
})
export class MisPropiedadesComponent {

  propiedades: any

  constructor(
    private http: HttpClient,
    private propiedadesService: PropiedadesService,

  ){
    // this.http.get('/assets/propiedades.json').subscribe(res=>{
    //   this.propiedades = res;
    // })

    this.propiedadesService.getPropiedades().subscribe(res=>{
      console.log({res});
      this.propiedades = res;

    })
  }





}
