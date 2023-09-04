import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  templateUrl: './propiedades-page.component.html',
  styleUrls: ['./propiedades-page.component.scss'],
})
export class PropiedadesPageComponent {
  public propiedades: any[] = [];
  path: string = 'propiedades'
  isLoading = false;

  http = inject(HttpClient);

  firebaseService = inject(FirebaseService);

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 6; // Cantidad de elementos por página
  filteredCards: any[] = []; // Aquí deberías cargar los datos filtrados
  totalPages: any;

  ngOnInit() {
    this.firebaseService.getData(this.path).subscribe((res) => {
      this.isLoading = true;
      this.propiedades = res;
      this.filteredCards = this.propiedades;
      this.totalPages = Math.ceil(
        this.filteredCards.length / this.itemsPerPage
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
