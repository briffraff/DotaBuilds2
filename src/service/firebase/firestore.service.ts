import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { FirebaseAuthService } from './firebaseAuth.service';

interface Build {
  creatorId: string;
  heroName: string;
  heroImageUrl: string;
  items: Item[];
}

interface Item {
  itemName: string;
  itemImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firebaseService = inject(FirebaseAuthService);

  async createBuild(buildData: { [key: string]: string }): Promise<void> {
    const items: Item[] = [];

    Object.keys(buildData).forEach(key => {
      if (key.startsWith('itemName') && buildData[key]) {
        const index = key.replace('itemName', '');
        items.push({
          itemName: buildData[key],
          itemImage: buildData[`itemImage${index}`]
        });
      }
    });

    const build: Build = {
      creatorId: this.firebaseService.currentUser.uid, 
      heroName: buildData['heroName'],
      heroImageUrl: buildData['heroImage'],
      items: items.filter(item => item.itemName && item.itemImage) 
    };

    // Записване във Firestore
    const buildCollection = collection(this.firebaseService.db, 'builds');
    await addDoc(buildCollection, build);
  }

  readBuild(collectionName: string) {

  }

  updateBuild() {

  }

  deleteBuild() {

  }
}
