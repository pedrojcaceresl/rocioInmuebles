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

  ngOnInit() {
    this.firebaseService.getData(this.path).subscribe((res) => {
      this.isLoading = true;
      this.propiedades = res;
    });
  }
}
