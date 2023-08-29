import { Injectable } from '@angular/core';
import { addDoc, setDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  path: string = '';

  constructor( private firestore: Firestore ) {}

  addData(data:any, path: string){
    const dataRef = collection(this.firestore, path)
    return addDoc(dataRef, data)
  }

  getData(path: string): Observable<any>{
    const dataRef = collection(this.firestore, path);
    return collectionData(dataRef, {idField:'id'}) as Observable<any>;
  }

  getDataById(dataId: string, path: string): Observable<any | undefined> {
    const dataDocRef = doc(this.firestore, path, dataId);
    return new Observable<any | undefined>((observer) => {
      getDoc(dataDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as any;
          observer.next({ id: dataId, ...data });
        } else {
          observer.next(undefined);
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  updateData(data: any, path: string): Promise<void> {
    const dataDocRef = doc(this.firestore, path, data.id);
    const dataWithoutId = { ...data };
    delete dataWithoutId.id; // Eliminar el campo "id" del objeto a actualizar
    return setDoc(dataDocRef, dataWithoutId, { merge: true });
  }

  deleteData(data: any, path: string){
    const dataDocRef = doc(this.firestore, `${path}/${data.id}`);
    return deleteDoc(dataDocRef)
  }
}
