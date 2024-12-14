import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {

    private auth = inject(Auth);

    constructor(private router: Router) { }

    async register(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/home']);
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredentials.user;
        } catch (error: any) {
            let errorMessage = "";
            console.log(errorMessage);
            switch (error.message) {
                case "Firebase: Error (auth/invalid-email).":
                    errorMessage = "Invalid email address";
                    break;
                case "Firebase: Error (auth/missing-password).":
                    errorMessage = "Missing password";
                    break;
                case "Firebase: Error (auth/invalid-credential).":
                    errorMessage = "Invalid credentials";
                    break;
                case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                    errorMessage = "Too many failed login attempts. Account is temporarily disabled!";
                    break;
                default:
                    errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
            console.log("User signed out successfully");
        } catch (error: any) {
            console.log("Error signing out:", error.message);
            throw new Error("Error signing out");
        }

        await signOut(this.auth);
        this.router.navigate(['/login']);
    }

    async getCurrentUser() {
        return user(this.auth);
    }
}
