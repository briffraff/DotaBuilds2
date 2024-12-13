import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
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

  async getUserData(userId: string): Promise<any> {
    const userRef = doc(this.firestore, 'users', userId);
    const docSnapshot = await getDoc(userRef);
    return docSnapshot.data();
  }
}
