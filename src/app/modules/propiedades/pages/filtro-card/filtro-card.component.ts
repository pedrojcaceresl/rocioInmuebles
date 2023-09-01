import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import Categoria from '../../interfaces/categorias.interface';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filtro-card',
  templateUrl: './filtro-card.component.html',
  styleUrls: ['./filtro-card.component.scss'],
})
export class FiltroCardComponent {

  @Input() titulo!: any;
  @Input() path!: any;

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  categorias: Categoria[] = [];
  pathCategorias: string = 'categorias'


  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.firebaseService.getData(this.path).subscribe(res =>{
      this.categorias = res;
      console.log("valor de this.categorias", this.categorias)
    });
  }

  //Acciones del card de Categorias
  nuevaCategoria(path: any) {
    const dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      data: { path },
    });
  }

  editarCategoria(categoria: Categoria, path: any) {
    this.dialog.open(NuevaCategoriaComponent, {
      data: { categoria, path, editMode: true },
    });
  }

  eliminarCategoria(categoria: Categoria, path: any) {
    this.firebaseService.deleteData(categoria, path).then();
  }
}
