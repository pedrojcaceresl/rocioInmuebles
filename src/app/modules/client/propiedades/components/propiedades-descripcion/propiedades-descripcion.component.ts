import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-propiedades-descripcion',
  templateUrl: './propiedades-descripcion.component.html',
  styleUrls: ['./propiedades-descripcion.component.scss']
})
export class PropiedadesDescripcionComponent {
  @Input() propiedad: any;
}
