import { CommonModule } from '@angular/common';
import { Component ,computed} from '@angular/core';
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
    isAuthenticated = computed(() => this.authService.isAuthenticated())

    constructor(private authService: FirebaseAuthService) { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout = () => {
        this.authService.logout();
    }
}
