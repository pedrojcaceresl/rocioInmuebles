import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import Categoria from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.scss']
})
export class NuevaCategoriaComponent{
  path: string ='categorias'

  form = this._formBuilder.group({
    nombre: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public dialogRef: MatDialogRef<NuevaCategoriaComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


  ngOnInit(): void {
    this.data && this.form.reset(this.data.categoria);
    const { path } = this.data
  }

  onSubmit() {
    const { nombre } = this.form.value;
    const { path } = this.data
    let categoria!: Categoria;

    if (this.data && this.data.editMode){
      categoria = { id: this.data && this.data.categoria.id, nombre }
      this.firebaseService.updateData(categoria, this.data.path);
    }else {
      categoria = { nombre }
      this.firebaseService.addData(categoria, path);
    }

    // alert(`Guardado con exito`);
    this.dialogRef.close();
  };

}
