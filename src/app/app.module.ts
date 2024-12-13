// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'

import { environment as devenv } from '../environments/environment.development';

import { FirestoreService } from '../service/firebase/firestore.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule
    ],
    providers: [
        FirestoreService,
        provideFirebaseApp(() => initializeApp(devenv.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
    ],
})
export class AppModule { }
