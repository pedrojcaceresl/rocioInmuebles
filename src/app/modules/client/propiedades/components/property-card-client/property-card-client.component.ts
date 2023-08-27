import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-property-card-client',
  templateUrl: './property-card-client.component.html',
  styleUrls: ['./property-card-client.component.scss'],
})
export class PropertyCardClientComponent {
  @Input() imgUrl!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() tags!: string;

  constructor(private dialog: MatDialog) {}

}
