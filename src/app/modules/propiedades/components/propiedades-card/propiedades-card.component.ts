import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-propiedades-card',
  templateUrl: './propiedades-card.component.html',
  styleUrls: ['./propiedades-card.component.scss'],
})
export class PropiedadesCardComponent {
  @Input() imgUrl!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() tags!: string[];
}
