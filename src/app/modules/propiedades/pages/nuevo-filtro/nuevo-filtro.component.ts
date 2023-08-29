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
  });

  constructor(
    private _formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    // private dialog: MatDialog
    public dialogRef: MatDialogRef<NuevoFiltroComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.data && this.form.reset(this.data.filtro);
    // console.log('datossss',this.data);

  }

  onSubmit() {

    const { nombre } = this.form.value;

    const filtro: Filtro = {
      id: this.data && this.data.filtro.id,
      nombre,
      };

    if(this.data && this.data.editMode){
      // console.log("se editara");
      this.firebaseService.updateData(filtro, this.path);
    }else{
      this.firebaseService.addData(filtro, this.path);
    }

    console.log({ filtro });
    alert(`Guardado con exito`);
    this.dialogRef.close();
  };

}
