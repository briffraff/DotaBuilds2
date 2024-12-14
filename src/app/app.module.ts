// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'

import { environment as devenv } from '../environments/environment.development';

import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        LoginComponent,
        RegisterComponent,
        ReactiveFormsModule,
    ],
    providers: [
        provideFirebaseApp(() => initializeApp(devenv.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
    ],
})
export class AppModule { }
