import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Propiedades from 'src/app/modules/propiedades/interfaces/propiedades.interface';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  constructor(
    private firestore: Firestore
  ) { }


  addPropiedades(propiedad: Propiedades){
    const propiedadesRef = collection(this.firestore, 'propiedades')
    return addDoc(propiedadesRef, propiedad)
  }

  getPropiedades(): Observable<Propiedades[]>{
    const propiedadesRef = collection(this.firestore, 'propiedades');
    return collectionData(propiedadesRef, {idField:'id'}) as Observable<Propiedades[]>;
  }

  getPropiedadById(propiedadId: string): Observable<Propiedades | undefined> {
    const propiedadDocRef = doc(this.firestore, 'propiedades', propiedadId);
    return new Observable<Propiedades | undefined>((observer) => {
      getDoc(propiedadDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const propiedadData = docSnapshot.data() as Propiedades;
          observer.next({ id: propiedadId, ...propiedadData });
        } else {
          observer.next(undefined);
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  deletePropiedades(propiedades: Propiedades){
    const propiedadesDocRef = doc(this.firestore, `propiedades/${propiedades.id}`);
    return deleteDoc(propiedadesDocRef)
  }
}
