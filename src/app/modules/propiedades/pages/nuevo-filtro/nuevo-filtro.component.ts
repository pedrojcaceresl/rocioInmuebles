import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import Filtro from '../../interfaces/filtros.interface';

@Component({
  selector: 'app-nuevo-filtro',
  templateUrl: './nuevo-filtro.component.html',
  styleUrls: ['./nuevo-filtro.component.scss']
})
export class NuevoFiltroComponent {
  path: string = 'filtros'

  form = this._formBuilder.group({
    nombre: ['', Validators.required],
    categoria: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public dialogRef: MatDialogRef<NuevoFiltroComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.data && this.form.reset(this.data.filtro);
  }

  onSubmit() {
    const { nombre, categoria } = this.form.value;
    const filtro: Filtro = { id: this.data && this.data.filtro.id, nombre, categoria }

    if(this.data && this.data.editMode){
      this.firebaseService.updateData(filtro, this.path);
    }else{
      this.firebaseService.addData(filtro, this.path);
    }

    // alert(`Guardado con exito`);
    this.dialogRef.close();
  };

}
