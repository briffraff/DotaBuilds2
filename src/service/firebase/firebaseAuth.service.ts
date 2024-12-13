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

    async login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/home']);
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.router.navigate(['/login']);
    }

    async getCurrentUser() {
        return user(this.auth);
    }
}
