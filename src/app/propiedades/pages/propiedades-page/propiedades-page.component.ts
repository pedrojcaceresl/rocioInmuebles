import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  templateUrl: './propiedades-page.component.html',
  styleUrls: ['./propiedades-page.component.scss']
})
export class PropiedadesPageComponent {
  public propiedades : any[] = [];

  http = inject(HttpClient);

  ngOnInit() {
    this.http.get('/assets/propiedades.json').subscribe((res: any) => {
      console.log(res);
      this.propiedades = res;
    });
  }
}
