import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { initializeApp } from '@angular/fire/app';
import { Usuarios } from 'src/app/core/interfaces/usuarios.interface';
import { environment } from '../../../../environments/environment.prod';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  path = 'usuarios';
  constructor(private firestore: Firestore, private authService: AuthService) {}

  addUsuarios(usuarios: Usuarios) {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return addDoc(usuariosRef, usuarios);
  }

  getUsuarios(): Observable<Usuarios[]> {
    const usuariosRef = collection(this.firestore, this.path);
    return collectionData(usuariosRef, { idField: 'id' }) as Observable<
      Usuarios[]
    >;
  }

  deleteUsuarios(usuarios: any) {
    const usuariosDocRef = doc(this.firestore, `usuarios/${usuarios.id}`);
    return deleteDoc(usuariosDocRef);
  }

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);

  async getUserById(usuarios: any) {
    const usuariosDocRef = doc(this.db, `usuarios/${usuarios}`);
    const docSnap = await getDoc(usuariosDocRef);
    if(docSnap.exists()){
      return docSnap.data()
    }
    return;
  }

  actualizarUsuario(usuarios: any) {
    const usuariosDocRef = doc(this.firestore, `usuarios/${usuarios.uid}`);

    updateDoc(usuariosDocRef, usuarios)
      .then(() => console.info('Se ha actualizado el usuario'))
      .catch((error) => console.error('Error al actualizar el usuario', error));
  }
}
