
import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;

    constructor(
        private auth: Auth
    ){}

    register({email, password}:any){
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login({email, password}:any){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout(){
        return signOut(this.auth);
    }

    forgotPassword({email}: any){
        return sendPasswordResetEmail(this.auth, email)
    }

    isLogged(): boolean {
        return this.isAuthenticated || !!sessionStorage.getItem("authToken");
    }
}