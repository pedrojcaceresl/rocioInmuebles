import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Propiedad from '../../interfaces/propiedades.interface';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { filter, map } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Filtro from '../../interfaces/filtros.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './nueva-propiedad-page.component.html',
  styleUrls: ['./nueva-propiedad-page.component.scss'],
})
export class NuevaPropiedadPageComponent implements OnInit {
  tipos: string[] = ['lote', 'duplex', 'casa', 'terreno'];
  path: string = 'propiedades';
  imgUrls: string[] = [];
  imgUrl: string = '';
  departamentos: any[] = [];
  ciudades: string[] = [];


  locationForm = new FormGroup({
    latitude: new FormControl(),
    longitude: new FormControl(),
  });

  firstFormGroup = this._formBuilder.group({
    baths: [0],
    beds: [0],
    transactionType: ['Venta', Validators.required],
    dimension: [null],
    description: [''],
    imgUrl: ['', Validators.required],
    imgUrls: [[]],
    locationCoords: ['', Validators.required],
    isActive: [true, Validators.required],
    isOffer: [false],
    isSold: [false],
    priceMonth: [0],
    priceSale: [0],
    type: ['', Validators.required],
    title: ['', Validators.required],
    viewTitle: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
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

  estados: Filtro[] = [];
  dormitorios:any;

  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    // private dialog: MatDialog
    public dialogRef: MatDialogRef<NuevaPropiedadPageComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.data && this.firstFormGroup.reset(this.data.propiedad);
    console.log('datossss', this.data);
    this.http.get<any>('assets/geo-paraguay.json').subscribe(data => {
      this.departamentos = data.departamentos;
    });
  }

  onSelectDepartamento(nombreDepartamento: any): void {
    nombreDepartamento = nombreDepartamento.value
    const departamento = this.departamentos.find(dep => dep.nombre === nombreDepartamento);
    this.ciudades = departamento ? departamento.ciudades : [];
  }


  onMapInitialized(map: google.maps.Map) {
    this.mapInitialized = map;

    this.center = {
      lat: (this.data && this.data.propiedad.locationCoords.lat) || this.lat,
      lng: (this.data && this.data.propiedad.locationCoords.lng) || this.lng,
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
        lat: this.data?.propiedad.locationCoords.lat
          ? this.data?.propiedad.locationCoords.lat
          : lat,
        lng: this.data?.propiedad.locationCoords.lng
          ? this.data?.propiedad.locationCoords.lng
          : lng,
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
    const {
      baths,
      beds,
      transactionType,
      dimension,
      description,
      imgUrl,
      isActive,
      locationCoords,
      isOffer,
      isSold,
      priceMonth,
      priceSale,
      type,
      title,
      viewTitle,
      city,
      state,
    } = this.firstFormGroup.value;
    // const { latitude, longitude } = this.secondFormGroup.value;

    const propiedad: Propiedad = {
      id: this.data && this.data.propiedad.id,
      baths,
      beds,
      transactionType,
      dimension,
      description,
      isSold: !!isSold,
      imgUrl: this.imgUrl,
      imgUrls: this.imgUrls,
      isActive:!!isActive,
      locationCoords: {
        lat: this.lat,
        lng: this.lng,
      },
      isOffer:!!isOffer,
      priceMonth,
      priceSale,
      type,
      title,
      viewTitle,
      city,
      state,
    };

    if (this.data && this.data.editMode) {
      console.log('se editara');
      this.firebaseService.updateData(propiedad, this.path);
    } else {
      console.log('LA PROPIEDAAAAADD',propiedad);
      this.firebaseService.addData(propiedad, this.path);
    }

    console.log({ propiedad });
    alert(`Guardado con exito`);
    this.dialogRef.close();
  }

  images: any;

  onImageUpload(event: any) {
    // console.log("La fiesta",event);

    if (event.event === 'success') {
      console.log('Lo que se viene', event.info.url);
      this.imgUrl = event.info.url;
      this.imgUrls.push(event.info.url);
      this.images = [...this.images, event.info.url]
      // console.log("🚀 ~ NuevaPropiedadPageComponent ~ onImageUpload ~ this.images:", this.images)
      // this.imgUrls = this.images
    }
      // console.log("🚀 ~ NuevaPropiedadPageComponent ~ onImageUpload ~ this.imgUrls:", this.imgUrls)
  }


  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
