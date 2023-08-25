import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NuevaPropiedadPageComponent } from 'src/app/modules/propiedades/pages/nueva-propiedad-page/nueva-propiedad-page.component';

@Component({
  selector: 'app-propiedades-card',
  templateUrl: './propiedades-card.component.html',
  styleUrls: ['./propiedades-card.component.scss'],
})
export class PropiedadesCardComponent {


  @Input() imgUrl!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() tags!: string;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
  ){
  }

  search(term: string): void {
    // this.countriesService.searchCapital(term).subscribe((countries) => {
    //   this.countries = countries
    // });
  }

  editarPropiedad(){
    this.onEdit.emit()
  }

  eliminarPropiedad(){
    console.log('se quiere eliminar');
    this.onDelete.emit();
  }

}
