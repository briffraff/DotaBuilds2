import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    currentUser: any = null;
    firestoreUserInfo: any = null;
    private isAuth = signal(false);

    private auth = inject(Auth);
    private db = inject(Firestore);

    constructor(private router: Router, private firestoreService: FirestoreService) { }

    async register(username: string, email: string, password: string, playerPosition: string): Promise<User> {
        try {
            const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);

            try {
                await updateProfile(userCredentials.user, { displayName: username });
            } catch (updateError) {
                console.error("Failed to update user profile:", updateError);
                throw new Error("Profile update failed.");
            }

            const userCollectionRef = collection(this.db, "users");

            const updatedUserInfo = {
                admin: false,
                playerPosition: playerPosition,
                email: email,
                profilePictureUrl: "",
                uid: userCredentials.user.uid,
                username: username,
                createdBuilds: [],
            };

            await addDoc(userCollectionRef, updatedUserInfo);

            return userCredentials.user;

        } catch (error: any) {
            let errorMessage = "";
            switch (error.message) {
                case "Firebase: Error (auth/missing-email).":
                    errorMessage = "Email cannot be empty";
                    break;
                case "Firebase: Error (auth/missing-password).":
                    errorMessage = "Missing password";
                    break;
                case "Firebase: Error (auth/email-already-in-use).":
                    errorMessage = "Email already in use";
                    break;
                case "Firebase: Error (auth/invalid-email).":
                    errorMessage = "Invalid email address";
                    break;
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    errorMessage = "Weak password";
                    break;
                default:
                    errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);

            this.setAuthState(true);

            return userCredentials.user;


        } catch (error: any) {
            this.setAuthState(false);

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
        this.router.navigate(['/login']);
        this.setAuthState(false);
    }

    setUser(user: any) {
        this.currentUser = user;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setAuthState(status: boolean) {
        if (this.currentUser !== null) {
            this.isAuth.set(status);
        }
    }

    isAuthenticated() {
        return this.isAuth();
    }

    async setFirestoreUserInfo(userId: any) {
        this.firestoreUserInfo = await this.firestoreService.getFirestoreUserById(userId);
    }

    getFirestoreUserInfo() {
        return this.firestoreUserInfo;
    }
}
