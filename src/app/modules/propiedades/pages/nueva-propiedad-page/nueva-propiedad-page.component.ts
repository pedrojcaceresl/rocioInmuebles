import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { filter, map } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

import Propiedad from '../../interfaces/propiedades.interface';
import Filtro from '../../interfaces/filtros.interface';
import { Editor } from 'ngx-editor';

@Component({
  templateUrl: './nueva-propiedad-page.component.html',
  styleUrls: ['./nueva-propiedad-page.component.scss'],
})
export class NuevaPropiedadPageComponent implements OnInit {
  tipos: string[] = [
    'casa quinta',
    'casa',
    'duplex',
    'granja',
    'terreno',
    'departamento en pozo',
    'lote en condominio',
  ];
  path: string = 'propiedades';
  imgUrls: string[] = [];
  imgUrl: string = '';
  departamentos: any[] = [];
  ciudades: string[] = [];
  urlBrochure:string = '';
  isLoading = false;
  uploadSuccess = false;

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
    linkBrochure: [''],
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
  dormitorios: any;

  editor!: Editor;
  html = '';
  isDescriptionVisible: boolean = false;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private _formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    // private dialog: MatDialog
    public dialogRef: MatDialogRef<NuevaPropiedadPageComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    // console.log('LA DATA',this.data)
    if (this.data) {
      const propiedad = this.data.propiedad;
      this.firstFormGroup.patchValue({
        baths: propiedad.baths,
        beds: propiedad.beds,
        transactionType: propiedad.transactionType,
        dimension: propiedad.dimension,
        description: propiedad.description,
        imgUrl: propiedad.imgUrl,
        imgUrls: propiedad.imgUrls,
        locationCoords: '',
        isActive: propiedad.isActive,
        isOffer: propiedad.isOffer,
        isSold: propiedad.isSold,
        priceMonth: propiedad.priceMonth,
        priceSale: propiedad.priceSale,
        type: propiedad.type,
        title: propiedad.title,
        viewTitle: propiedad.viewTitle,
        city: propiedad.city,
        state: propiedad.state,
        linkBrochure: propiedad.linkBrochure ?? '',
      });

      this.secondFormGroup.patchValue({
        latitude: propiedad.locationCoords.lat,
        longitude: propiedad.locationCoords.lng,
      });

      this.imgUrl = propiedad.imgUrl;
      this.imgUrls = propiedad.imgUrls;
      this.lat = propiedad.locationCoords.lat;
      this.lng = propiedad.locationCoords.lng;
    }

    this.http.get<any>('assets/geo-paraguay.json').subscribe((data) => {
      this.departamentos = data.departamentos;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSelectDepartamento(nombreDepartamento: any): void {
    nombreDepartamento = nombreDepartamento.value;
    const departamento = this.departamentos.find(
      (dep) => dep.nombre === nombreDepartamento
    );
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

  const descriptionHtml = this.firstFormGroup.get('description')?.value;
  // Ahora, la descripción es HTML y se puede almacenar
  // console.log(descriptionHtml);

  const {
    baths,
    beds,
    transactionType,
    dimension,
    description,
    isActive,
    isOffer,
    isSold,
    priceMonth,
    priceSale,
    type,
    title,
    viewTitle,
    city,
    state,
    linkBrochure
  } = this.firstFormGroup.value;
  const { latitude, longitude } = this.secondFormGroup.value;

  const propiedad: Propiedad = {
    id: this.data && this.data.propiedad.id,
    baths,
    beds,
    transactionType,
    dimension,
    description: descriptionHtml,
    isSold: !!isSold,
    imgUrl: this.imgUrl,
    imgUrls: this.imgUrls,
    isActive: !!isActive,
    locationCoords: {
      lat: latitude,
      lng: longitude,
    },
    isOffer: !!isOffer,
    priceMonth,
    priceSale,
    type,
    title,
    viewTitle,
    city,
    state,
    linkBrochure: this.urlBrochure ?? '',
  };

  if (this.data && this.data.editMode) {
    this.firebaseService.updateData(propiedad, this.path);
  } else {
    this.firebaseService.addData(propiedad, this.path);
  }

  alert(`Guardado con exito`);
  this.dialogRef.close();
}

  images: any;

  onImageUpload(event: any) {
    if (event.event === 'success') {
      const imageUrl = event.info.url;
      this.imgUrl = imageUrl;
      this.imgUrls.push(imageUrl);
      this.images = [...(this.images || []), imageUrl];
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }

  updateFileUrl(url: string) {
    this.firstFormGroup.patchValue({ linkBrochure: url});
  }

  uploadFile($event: any) {
    const file = $event.target.files[0];
    const docRef = ref(this.storage, `brochures/${file.name}`);

    uploadBytes(docRef, file)
      .then(async (response) => {
        const url = await getDownloadURL(docRef);
        this.updateFileUrl(url)
        this.urlBrochure = url;
        console.log('CARGADO?',url);
      })
      .catch((error) => console.error());
  }

  toggleDescription(): void {
    this.isDescriptionVisible = !this.isDescriptionVisible;
  }
  
}
