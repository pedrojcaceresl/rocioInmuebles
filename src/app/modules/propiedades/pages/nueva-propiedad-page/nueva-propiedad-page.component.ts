import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-propiedad-page',
  templateUrl: './nueva-propiedad-page.component.html',
  styleUrls: ['./nueva-propiedad-page.component.scss'],
})
export class NuevaPropiedadPageComponent implements OnInit {
  propertyForm: FormGroup;
  center: google.maps.LatLngLiteral = { lat: -25.496983038652843, lng: -54.6637051698589 };
  zoom = 12;
  departamentos: any[] = [];
  ciudades: string[] = [];
  imgUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private http: HttpClient
  ) {
    this.propertyForm = this.fb.group({
      transactionType: ['', Validators.required],
      rooms: [null, [Validators.required, Validators.min(1)]],
      bathrooms: [null, [Validators.required, Validators.min(1)]],
      size: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      images: [[]],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.http.get<any>('assets/geo-paraguay.json').subscribe((data) => {
      this.departamentos = data.departamentos;
    });
  }

  onMapInitialized(map: google.maps.Map) {
    // Initialize the map marker and other map-related logic
  }

  onImageUpload(event: any) {
    if (event.event === 'success') {
      this.imgUrls.push(event.info.url);
      this.propertyForm.patchValue({ images: this.imgUrls });
    }
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const propertyData = this.propertyForm.value;
      this.firebaseService.addData(propertyData, 'propiedades');
      alert('Guardado con éxito');
    }
  }
}
