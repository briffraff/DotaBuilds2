// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../config/firebase';
import { FirebaseService } from '../service/firebase/firebase.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
    ],
    providers: [
        FirebaseService,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore())
    ],
})
export class AppModule { }
