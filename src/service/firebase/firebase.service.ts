import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fs: Firestore) { }

  create() {

  }


  readFieldFromFirstDocument(collectionName: string, fieldName: string) {
    const globalConstants = collection(this.fs, collectionName);
    return collectionData(globalConstants, { idField: 'id' }).pipe(
      map((documents: any[]) => documents[0]?.[fieldName] || null)
    );
  }

  read(collectionName: string) {
    let globalConstants = collection(this.fs, collectionName);
    return collectionData(globalConstants, { idField: 'id' });
  }

  update() {

  }

  delete() {

  }
}
