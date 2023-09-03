import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-propiedades-ubicacion',
  templateUrl: './propiedades-ubicacion.component.html',
  styleUrls: ['./propiedades-ubicacion.component.scss']
})
export class PropiedadesUbicacionComponent {
  @Input() propiedad: any;
}
