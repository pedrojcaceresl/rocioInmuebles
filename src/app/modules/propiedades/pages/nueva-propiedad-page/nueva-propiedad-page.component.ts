import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Propiedad from '../../interfaces/propiedades.interface';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  templateUrl: './nueva-propiedad-page.component.html',
  styleUrls: ['./nueva-propiedad-page.component.scss'],
})
export class NuevaPropiedadPageComponent implements OnInit {
  tipos: String[] = ['lote', 'duplex', 'casa', 'terreno'];
  path: string = 'propiedades'

  locationForm = new FormGroup({
    latitude: new FormControl(),
    longitude: new FormControl(),
  });

  firstFormGroup = this._formBuilder.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    imgUrl: ['', Validators.required],
    tipo: ['', Validators.required],
    etiquetas: [''],
    estado: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    latitude: [0],
    longitude: [0],
  });

  isLinear = false;

  mapInitialized?: google.maps.Map;
  selectedPosition!: google.maps.LatLng | null | undefined;
  marker!: google.maps.Marker;
  lat: any = -25.496983038652843;
  lng: any = -54.6637051698589;

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
    private firebaseService: FirebaseService,
    // private dialog: MatDialog
    public dialogRef: MatDialogRef<NuevaPropiedadPageComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {
    this.data && this.firstFormGroup.reset(this.data.propiedad);
    console.log('datossss',this.data);

  }

  onMapInitialized(map: google.maps.Map) {
    this.mapInitialized = map;

    this.center = {
      lat: this.data && this.data.propiedad.ubicacion.lat || this.lat,
      lng: this.data && this.data.propiedad.ubicacion.lng || this.lng,
    };

    this.initMarker();
  }

  get map() {
    return this.mapInitialized;
  }

  initMarker() {
    let lat = -25.496983038652843;
    let lng = -54.6637051698589;

    this.marker = new google.maps.Marker({
      position: {
        lat: this.data?.propiedad.ubicacion.lat ? this.data?.propiedad.ubicacion.lat : lat,
        lng: this.data?.propiedad.ubicacion.lng ? this.data?.propiedad.ubicacion.lng : lng
      },
      map: this.map,
      draggable: true,
    });


    this.marker.setAnimation(google.maps.Animation.DROP);
    this.marker.addListener('dragend', () => {
      this.selectedPosition = this.marker.getPosition();
      const position = this.marker.getPosition();
        this.lat = position?.lat();
        this.lng = position?.lng();
      this.updateFormValues();
    });
  }

  updateFormValues() {
    this.secondFormGroup.patchValue({
      latitude: this.lat,
      longitude: this.lng,
    });

    console.log(this.secondFormGroup.value);
  }

  onSubmit() {


    const { titulo, descripcion, imgUrl, tipo, etiquetas, estado } = this.firstFormGroup.value;
    // const { latitude, longitude } = this.secondFormGroup.value;

    const propiedad: Propiedad = {
      id: this.data && this.data.propiedad.id,
      titulo,
      descripcion,
      imgUrl,
      tipo,
      etiquetas,
      estado,
      ubicacion: {
        lat: this.lat,
        lng: this.lng,
      },
    };

    if(this.data && this.data.editMode){
      console.log("se editara");
      this.firebaseService.updateData(propiedad, this.path);
    }else{
      this.firebaseService.addData(propiedad, this.path);
    }

    console.log({ propiedad });
    alert(`Guardado con exito`);
    this.dialogRef.close();

  }
}
