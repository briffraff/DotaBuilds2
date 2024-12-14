import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore = inject(Firestore);

  createBuild() {

  }

  readBuild(collectionName: string) {
    // let globalConstants = collection(this.fs, collectionName);
    // return collectionData(globalConstants, { idField: 'id' });
  }

  updateBuild() {

  }

  deleteBuild() {

  }

  readFieldFromFirstDocument(collectionName: string, fieldName: string) {
    // const globalConstants = collection(this.fs, collectionName);

    // return collectionData(globalConstants, { idField: 'id' }).pipe(
    //   map((documents: any[]) => documents[0]?.[fieldName] || null)
    // );
  }

  addUserData(userId: string, userData: any): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);
    return setDoc(userRef, userData);
  }

  getFirestoreUserById = async (userId: string) => {
    try {
      const q = query(collection(this.firestore, "users"), where("uid", "==", userId));
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
}
