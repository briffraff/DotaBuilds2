import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { FirebaseAuthService } from './firebaseAuth.service';

interface Build {
  creatorId: string;
  creator: string,
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
  private buildsCollectionRef = collection(this.firebaseService.db, 'builds');

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
      creator: this.firebaseService.currentUser.displayName,
      heroName: buildData['heroName'],
      heroImageUrl: buildData['heroImage'],
      items: items.filter(item => item.itemName && item.itemImage)
    };

    const buildCollection = this.buildsCollectionRef;
    await addDoc(buildCollection, build);
  }

  async getAllBuilds() {
    try {
      const data = await getDocs(this.buildsCollectionRef);
      const builds = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      return builds;
    } catch (error) {
      console.log("Error fetching builds: ", error);
      throw error;
    }
  }


  async getBuildById(buildId: string) {
    try {
      const docRef = doc(this.firebaseService.db, "builds", buildId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log("Error fetching card: ", error);
      throw error;
    }
  }

  async getAllBuildsByUserId(userId: string): Promise<Build[]> {
    try {
      const q = query(this.buildsCollectionRef, where("creatorId", "==", userId));
      const dataSnapshot = await getDocs(q);

      const buildsByUser = dataSnapshot.docs.map((build) => {
        const data = build.data();
        return {
          id: build.id,
          creatorId: data['creatorId'],
          creator: data['creator'],
          heroName: data['heroName'],
          heroImageUrl: data['heroImageUrl'],
          items: data['items'],
        } as Build;
      });
      // console.log(buildsByUser);
      return buildsByUser;

    } catch (error) {
      console.error('Error fetching builds for this user:', error);
      return [];
    }
  }

  async updateBuild(buildId: string, buildData: any) {
    try {
      const buildCollection = this.buildsCollectionRef;
      const docRef = doc(buildCollection, buildId);
      await updateDoc(docRef, buildData);
      console.log('Build updated successfully!');
    } catch (error) {
      console.error('Error updating build:', error);
    }
  }

  async deleteBuild(buildId: string) {
    try {
      const docRef = doc(this.buildsCollectionRef, buildId);
      if (docRef) {
        await deleteDoc(docRef);
      }
      console.log("Delete Build successfully")
    } catch (error) {
      console.log("Error delete build: ", error);
    }
  }
}
