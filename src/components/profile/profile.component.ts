import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
   user:any

    constructor(
        private titleService: Title,
        private authService: FirebaseAuthService,
        private firestoreService: FirestoreService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(titles.Profile);
        this.user = this.authService.firestoreUserInfo;
    }
}

