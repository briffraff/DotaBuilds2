import { Injectable, Signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { signal } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    private currentUser = signal<User | null>(null);
    private firestoreUser = signal<any | null>(null);
    private isAuth = signal(false);
    private loading = signal(true);
    private authState = new BehaviorSubject<boolean>(false);

    
    auth = inject(Auth);
    db = inject(Firestore);

    constructor(private router: Router) {
        this.initializeAuthState()
    }

    initializeAuthState() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            this.authState.next(user ? true : false);
            this.setAuthState(user ? true : false);
            this.setUser(user);
            if (user) {
                await this.setFirestoreUser(user.uid);
            } else {
                await this.setFirestoreUser(null);
            }
            this.loading.set(false);
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
            this.setAuthState(true);
            this.setUser(userCredentials.user);
            await this.setFirestoreUser(userCredentials.user.uid);
            return userCredentials.user;

        } catch (error: any) {
            this.setAuthState(false);
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
            this.setUser(userCredentials.user);
            await this.setFirestoreUser(userCredentials.user.uid);
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
            this.setAuthState(false);
            this.setFirestoreUser(null);
            this.setUser(null);
            console.log("User signed out successfully");
            this.router.navigate(['/login']);
        } catch (error: any) {
            console.log("Error signing out:", error.message);
            throw new Error("Error signing out");
        }
    }

    getFirestoreUserById = async (userId: string) => {
        try {
            const q = query(collection(this.db, "users"), where("uid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // let errorMessage = "No such user document!";
                // throw new Error(errorMessage);
                return '';
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

    isAuthReady(): Observable<boolean> {
        return this.authState.asObservable().pipe(
            filter(state => state !== null) 
        );
    }

    isLoading(): boolean {
        return this.authState.value == false;
    }

    setUser(user: any) {
        this.currentUser.set(user);
    }

    getCurrentUser(): any {
        return this.currentUser();
    }

    setAuthState(status: boolean) {
        this.isAuth.set(status);
    }

    isAuthenticated(): boolean {
        return this.authState.value === true;
    }


    async setFirestoreUser(userId: any) {
        const userinfo = await this.getFirestoreUserById(userId);
        this.firestoreUser.set(userinfo);
    }

    getFirestoreUser() {
        return this.firestoreUser();
    }
}
