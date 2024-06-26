import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { NuevaPropiedadPageComponent } from '../nueva-propiedad-page/nueva-propiedad-page.component';
import { BehaviorSubject } from 'rxjs';
import Propiedad from '../../interfaces/propiedades.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FirebaseService } from '../../../../shared/services/firebase.service';

@Component({
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisPropiedadesComponent implements OnInit {
  propiedades: any = [];
  filtros: any;

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 4; // Cantidad de elementos por página
  filteredCards: any[] = []; // Aquí deberías cargar los datos filtrados
  totalPages: any;

  filters = [
    { name: 'Lotes', checked: false },
    { name: 'Casas', checked: false },
    { name: 'Condominio', checked: false },
    { name: 'Barrio Cerrado', checked: false },
    // Agrega más filtros según tus necesidades
  ];
  selectedFilters: string[] = [];
  selectedFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  etiquetas: string[] = ['casas', 'lote', 'lujo', 'piscina'];
  path: string = 'propiedades';

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.zone.run(() => {
      this.firebaseService.getData(this.path).subscribe((res) => {
        console.log({ res });
        this.propiedades = res;
        this.filteredCards = [...this.propiedades];
        this.totalPages = Math.ceil(
          this.filteredCards.length / this.itemsPerPage
        );
        this.cd.markForCheck();
      });
    });
  }

  nuevaPropiedad() {
    const dialogRef = this.dialog.open(NuevaPropiedadPageComponent, {});
  }

  editarPropiedad(propiedad: Propiedad) {
    this.dialog.open(NuevaPropiedadPageComponent, {
      data: { propiedad, editMode: true },
    });
  }

  eliminarPropiedad(propiedad: Propiedad) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: propiedad.title,
    });

    dialogRef.afterClosed().subscribe((res) => {
      res &&
        this.firebaseService.deleteData(propiedad, this.path).then((res) => {
          this.cd.markForCheck();
        });
    });
  }

  applyFilters(filter: string) {
    if (this.selectedFilters.includes(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters.push(filter);
    }

    // Luego de actualizar los filtros, aplicamos los filtros
    this.filteredCards = this.propiedades.filter((property: any) => {
      return this.selectedFilters.every((filter) =>
        property.etiquetas.includes(filter)
      );
    });
  }

  onPageChange(newPage: number){
    this.currentPage = newPage;
  }

  previusPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }
}
