import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

import { NuevoFiltroComponent } from '../nuevo-filtro/nuevo-filtro.component';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';

import Filtro from '../../interfaces/filtros.interface';
import Categoria from '../../interfaces/categorias.interface';
import Inmueble from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit{
  pathFiltros: string = 'filtros'
  pathCategorias: string = 'categorias'
  pathInmuebles: string = 'inmuebles'

   filtros: Filtro[] = [];
   categorias: Categoria[] = [];
   inmuebles: Inmueble[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,

  ){

  }

  ngOnInit(): void {
    this.firebaseService.getData(this.pathFiltros).subscribe(res =>{
      this.filtros = res;
      console.log("valor de this.filtros", this.filtros)
    });
    this.firebaseService.getData(this.pathCategorias).subscribe(res =>{
      this.categorias = res;
      console.log("valor de this.categorias", this.categorias)
    });
    this.firebaseService.getData(this.pathInmuebles).subscribe(res =>{
      this.inmuebles = res;
      console.log("valor de this.inmuebles", this.inmuebles)
    });

  }

  nuevoFiltro(){ const dialogRef =  this.dialog.open(NuevoFiltroComponent, {})}

  editarFiltro(filtro: Filtro){
    this.dialog.open(NuevoFiltroComponent, {
      data: {filtro, editMode: true}
    })
  }

  eliminarFiltro(filtro: Filtro){
    this.firebaseService.deleteData(filtro, this.pathFiltros).then()
  }

  //Acciones del card de Categorias
  nuevaCategoria(path: any){ const dialogRef =  this.dialog.open(NuevaCategoriaComponent, {
    data: {path}
  })}

  editarCategoria(categoria: Categoria, path: any){

    this.dialog.open(NuevaCategoriaComponent, {
      data: {categoria, path, editMode: true}
    })
  }

  eliminarCategoria(categoria: Categoria, path: any){
    this.firebaseService.deleteData(categoria, path).then()
  }


}
