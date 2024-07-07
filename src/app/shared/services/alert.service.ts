import { Injectable, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MensajeModalComponent } from '../components/mensaje-modal/mensaje-modal.component';
import { SuccessComponent } from '../components/success/success.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  /** ### Open Alert
   * Abre la alerta del mensaje de confirmacion del evento realizado.
   * @param mensaje
   */
  openAlert(mensaje: string, tiempoDuracion: number = 2000) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: mensaje,
      // panelClass: ['bg-pink-800', 'bg-opacity-90']
    });
    setTimeout(() => {
      dialogRef.close();
    }, tiempoDuracion);
  }

  /** ### Open Alert
   * Abre la alerta del mensaje de error del evento realizado.
   * @param mensaje
   */
  openAlertError(mensaje: string, tiempoDuracion: number = 2000) {
    const dialogRef = this.dialog.open(AlertErrorComponent, {
      data: mensaje,
    });
    setTimeout(() => {
      dialogRef.close();
    }, tiempoDuracion);
  }

  /** ### Confirmation Alert
   * Muestra el mensaje con la opcion de aceptar o rechazar la acción.
   * @param mensaje
   * @returns
   */
  confirmationAlert(mensaje: string): MatDialogRef<any> {
    const dialogRef = this.dialog.open(MensajeModalComponent, {
      data: mensaje,
    });
    return dialogRef;
  }
}

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert alert-error shadow-lg">
      <div>
        <span class="text-center">{{ data }}</span>
      </div>
    </div>
  `,
})
export class AlertErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
