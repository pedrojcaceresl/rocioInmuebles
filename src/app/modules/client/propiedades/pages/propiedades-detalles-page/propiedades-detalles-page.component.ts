import { Component, Input, SimpleChanges } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-propiedades-detalles-page',
  templateUrl: './propiedades-detalles-page.component.html',
  styleUrls: ['./propiedades-detalles-page.component.scss']
})
export class PropiedadesDetallesPageComponent {

  @Input() id: any;

  activatedRoute = inject(ActivatedRoute);
  firebaseService = inject(FirebaseService);

  propiedad: any;

  carousel: any;

  image : any;
  constructor() {
        this.activatedRoute.params.subscribe(({ id }) => {
          this.id = id;
          this.getProperty();
        });
  }

  ngOnInit(): void {}


  getProperty() {
    // Call the service to get the property by id
    this.firebaseService.getDataById(this.id, 'propiedades').subscribe(res => {
      this.propiedad = res;
      console.log(this.propiedad);


    })
  }

}
