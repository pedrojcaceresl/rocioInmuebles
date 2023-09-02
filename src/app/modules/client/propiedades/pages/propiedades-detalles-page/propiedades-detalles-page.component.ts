import { Component, Input, SimpleChanges } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-propiedades-detalles-page',
  templateUrl: './propiedades-detalles-page.component.html',
  styleUrls: ['./propiedades-detalles-page.component.scss']
})
export class PropiedadesDetallesPageComponent {

  @Input() id: any;

  activatedRoute = inject(ActivatedRoute)

  carousel: any;

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
    })
  }


  getProperty() {
    // Call the service to get the property by id

  }

}
