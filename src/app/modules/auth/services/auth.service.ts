import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  authState,
} from '@angular/fire/auth';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';
import {
  updateProfile,
  User,
  updatePhoneNumber,
  Unsubscribe,
} from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  user: any;

  user$!: Unsubscribe;

  constructor(private auth: Auth, private firestore: Firestore) {}

  getUserRole(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          const docRef = doc(this.firestore, `usuarios/${user.uid}`);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                const userData = doc.data();
                const role = userData['rol'];
                resolve(role);
              } else {
                reject(new Error('User document not found.'));
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(new Error('User not authenticated.'));
        }
      });
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  resetPassword({ email }: any) {
    return sendPasswordResetEmail(this.auth, email);
  }

  getCurrentUser(): User {
    return this.auth.currentUser as any;
  }

  updateUser(userProfile: any) {
    return updateProfile(this.getCurrentUser(), userProfile);
  }
  onLoginEvent() {
    return authState(this.auth);
  }

  createDoc(data: any, path: string, id: string) {
    const value = setDoc(doc(this.firestore, path, id), {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      rol: data.rol,
      uid: id,
    });
    return value;
  }

  updatePhoneNumber(phoneNumber: any) {
    return updatePhoneNumber(this.getCurrentUser(), phoneNumber);
  }
}
