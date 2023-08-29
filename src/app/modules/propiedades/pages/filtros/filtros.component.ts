import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { NuevoFiltroComponent } from '../nuevo-filtro/nuevo-filtro.component';
import Filtro from '../../interfaces/filtros.interface';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit{
   path: string = 'filtros'
   filtros: Filtro[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,

  ){

  }
  ngOnInit(): void {
    this.firebaseService.getData(this.path).subscribe(res =>{
      // console.log(res);
      this.filtros = res
    })

  }

  nuevoFiltro(){
    const dialogRef =  this.dialog.open(NuevoFiltroComponent, {
    })
  }

  editarFiltro(filtro: Filtro){
    this.dialog.open(NuevoFiltroComponent, {
      data: {filtro, editMode: true}
    })
  }

  eliminarFiltro(filtro: Filtro){
    console.log("pANZA", filtro.id);
    this.firebaseService.deleteData(filtro, this.path).then()
  }

}
