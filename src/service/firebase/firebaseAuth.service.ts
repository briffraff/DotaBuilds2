import { Injectable, Signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { CookieService } from '../cookie.service';

interface FirestoreUser {
    admin: boolean;
    createdBuilds: any[];
    email: string;
    playerPosition: string;
    profilePictureUrl: string;
    uid: string;
    username: string;
}


@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    private currentUser$$ = new BehaviorSubject<User | null>(null);
    private firestoreUser$$ = new BehaviorSubject<FirestoreUser | null>(null);
    private authState$$ = new BehaviorSubject<boolean>(false);

    auth = inject(Auth);
    db = inject(Firestore);

    constructor(private router: Router, private cookieService: CookieService) {
        this.initializeAuthState()
    }

    initializeAuthState() {
        // const auth = getAuth();
        onAuthStateChanged(this.auth, async (user) => {
            const token = await this.getToken();
            if (token) {
                this.cookieService.setCookie('dota2authToken', token, 7);
                console.log('Token saved in cookie');
            }

            this.authState$$.next(!!user);
            this.currentUser$$.next(user);
            if (user) {
                await this.setFirestoreUser(user.uid);
            } else {
                this.setFirestoreUser(null);
            }

        });
    }

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
            this.currentUser$$.next(userCredentials.user);
            await this.setFirestoreUser(userCredentials.user.uid);

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
            this.currentUser$$.next(userCredentials.user);
            await this.setFirestoreUser(userCredentials.user.uid);

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
            this.currentUser$$.next(null);
            this.setFirestoreUser(null);

            this.cookieService.deleteCookie('dota2authToken');

            console.log("User signed out successfully");
            this.router.navigate(['/login']);
        } catch (error: any) {
            console.log("Error signing out:", error.message);
            throw new Error("Error signing out");
        }
    }


    checkAuth(): boolean {
        const token = this.cookieService.getCookie('dota2authToken');
        if (token) {
            console.log('User is authenticated:', token);
            return true;
        }
        console.log('No auth token found! Redirect to login...');
        return false;
    }

    getFirestoreUserById = async (userId: string) => {
        try {
            const q = query(collection(this.db, "users"), where("uid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // let errorMessage = "No such user document!";
                // throw new Error(errorMessage);
                return null;
            } else {
                const userDoc = querySnapshot.docs[0];
                return userDoc.data();
                // return { ...userDoc.data(), id: userDoc.id };
            }
        } catch (error) {
            console.log("Error fetching user: ", error);
            throw error;
        }

    };

    isAuthenticated(): Observable<boolean> {
        return this.authState$$.asObservable().pipe(
            filter(state => state !== null)
        );
    }

    getCurrentUser(): Observable<User | null> {
        return this.currentUser$$.asObservable();
    }

    private async setFirestoreUser(userId: string | null) {
        if (userId) {
            const firestoreUser = await this.getFirestoreUserById(userId);
            this.firestoreUser$$.next(firestoreUser as FirestoreUser);
        } else {
            this.firestoreUser$$.next(null);
        }
    }

    getFirestoreUser(): Observable<any | null> {
        return this.firestoreUser$$.asObservable();
    }

    async getToken() {
        const currentUser = this.auth.currentUser;
        if (currentUser) {
            return await currentUser.getIdToken();
        }
        return null;
    }

}
