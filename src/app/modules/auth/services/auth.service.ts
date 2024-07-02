
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;

    public login(email: string, password: string): boolean {
        console.log('logged in succesfully');
        if (email === 'admin' && password === "password") {
            this.isAuthenticated = true;
            sessionStorage.setItem("authToken", "mock-token");
            return true;
        }
        return false;
    }

    public logout(): void {
        this.isAuthenticated = false;
        sessionStorage.removeItem("authToken");
    }

    isLogged(): boolean {
        return this.isAuthenticated || !!sessionStorage.getItem("authToken");
    }
}