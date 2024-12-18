import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User , onAuthStateChanged} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    currentUser: any = null;
    firestoreUserInfo: any = null;
    private isAuth = signal(false);

    auth = inject(Auth);
    db = inject(Firestore);

    constructor(private router: Router) {
        this.initializeAuthState()
     }

    initializeAuthState() {
        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                this.setAuthState(true);
                this.setUser(user);
                await this.setFirestoreUserInfo(user.uid);
                console.log("User is logged in:", user);
            } else {
                this.setAuthState(false);
                this.setUser(null);
                console.log("No user is logged in.");
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
            await this.setAuthState(true);
            await this.setUser(userCredentials.user);
            await this.setFirestoreUserInfo(userCredentials.user.uid);
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

            await this.setAuthState(true);
            await this.setUser(userCredentials.user);
            await this.setFirestoreUserInfo(userCredentials.user.uid);
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
            this.firestoreUserInfo = '';
            this.currentUser = null;
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
                let errorMessage = "No such user document!";
                throw new Error(errorMessage);
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

    setUser(user: any) {
        this.currentUser = user;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setAuthState(status: boolean) {
        this.isAuth.set(status);
    }

    isAuthenticated() {
        return this.isAuth();
    }

    async setFirestoreUserInfo(userId: any) {
        this.firestoreUserInfo = await this.getFirestoreUserById(userId);
    }

    getFirestoreUserInfo() {
        return this.firestoreUserInfo;
    }
}
