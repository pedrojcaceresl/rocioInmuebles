import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Propiedad from '../../interfaces/propiedades.interface';

@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss']
})
export class MisPropiedadesComponent {

  propiedades: any

  constructor(
    private http: HttpClient
  ){
    this.http.get('/assets/propiedades.json').subscribe(res=>{
      this.propiedades = res;
    })
  }





}
