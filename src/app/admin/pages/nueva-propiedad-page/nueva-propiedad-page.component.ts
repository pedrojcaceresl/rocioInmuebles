import { Component } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import Propiedades from '../../interfaces/propiedades.interface';

@Component({
  templateUrl: './nueva-propiedad-page.component.html',
  styleUrls: ['./nueva-propiedad-page.component.scss'],
})
export class NuevaPropiedadPageComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  mapInitialized?: google.maps.Map;
  selectedPosition!: google.maps.LatLng;


  zoom = 12;
  center: google.maps.LatLngLiteral = {
    lat: -25.496983038652843,
    lng: -54.6637051698589,
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private firestore : Firestore
    ) {}

  onMapInitialized(map: google.maps.Map) {
    this.mapInitialized = map;
  }

  get map() {
    return this.mapInitialized;
  }

  addMarker(event: any) {
    this.selectedPosition = event.latLng

      new google.maps.Marker({
        position: event.latLng,
        map: this.map,
        title: 'Hello World!',
        draggable: true
      });
  }

    addPropiedades(propiedades: Propiedades | any){
      const propiedadesRef = collection(this.firestore, 'propiedades');
      return addDoc(propiedadesRef, propiedades)
    }

    getPropiedades(): Observable<Propiedades[]>{
      const propiedadesRef = collection(this.firestore, 'propiedades');
      return collectionData(propiedadesRef, {idField:'id'}) as Observable<Propiedades[]>;
    }

    deletePropiedades(propiedades: Propiedades){
      const propiedadesDocRef = doc(this.firestore, `propiedades/${propiedades.id}`);
      return deleteDoc(propiedadesDocRef)
    }
}
