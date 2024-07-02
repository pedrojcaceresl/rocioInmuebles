import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import Propiedad from '../../interfaces/propiedades.interface';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { NuevaPropiedadPageComponent } from '../nueva-propiedad-page/nueva-propiedad-page.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mis-propiedades',
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisPropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filteredCards: Propiedad[] = [];
  totalPages: any;

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.zone.run(() => {
      this.firebaseService.getData('propiedades').subscribe((res: Propiedad[]) => {
        this.propiedades = res;
        this.filteredCards = [...this.propiedades];
        this.totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
        this.cd.markForCheck();
      });
    });
  }

  nuevaPropiedad() {
    this.dialog.open(NuevaPropiedadPageComponent, {});
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
      if (res) {
        this.firebaseService.deleteData(propiedad, 'propiedades').then(() => {
          this.propiedades = this.propiedades.filter(p => p.id !== propiedad.id);
          this.filteredCards = [...this.propiedades];
          this.totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
          this.cd.markForCheck();
        });
      }
    });
  }

  onPageChange(newPage: number) {
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
