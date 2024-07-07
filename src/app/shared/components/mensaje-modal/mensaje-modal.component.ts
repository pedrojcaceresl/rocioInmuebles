import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensaje-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div
  class="relative z-50 w-full h-full max-w-md bg-transparent bg-white rounded-lg shadow white-bg dark:bg-gray-700 srelative md:h-auto"
>
  <button
    type="button"
    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-aero-oscuro dark:hover:text-white"
    data-modal-hide="popup-modal"
    (click)="onNoClick()"
  >
    <svg
      aria-hidden="true"
      class="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Cerrar</span>
  </button>
  <div class="p-6 text-center">
    <svg
      aria-hidden="true"
      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      {{ data }}
    </h3>
    <button
      data-modal-hide="popup-modal"
      type="button"
      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
      (click)="onConfirmation()"
    >
      Si, estoy seguro.
    </button>
    <button
      data-modal-hide="popup-modal"
      type="button"
      class="text-gray-500 bg-white hover:bg-aero-celeste focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
      (click)="onNoClick()"
    >
      No, cancelar
    </button>
  </div>
</div>`,
  styleUrls: ['./mensaje-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajeModalComponent {
  public currentLanguage = '';

  windowWidth: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MensajeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.updateWindowWidth();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmation() {
    this.dialogRef.close(true);
  }

  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  }
}

