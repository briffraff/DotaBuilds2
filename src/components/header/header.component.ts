import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    menuOpen: boolean = false;

    constructor(
        private firebaseAuthService: FirebaseAuthService,
        private firestoreService: FirestoreService) { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout() {
        this.firebaseAuthService.logout().then(() => {
            console.log("User logged out");
        }).catch(error => {
            console.log("Logout failed", error);
        })
    }

}
