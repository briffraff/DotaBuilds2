import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    // isAuthenticated = computed(() => this.authService.isAuthenticated())

    constructor(private authService: FirebaseAuthService) { }

    get isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout = () => {
        this.authService.logout();
    }
}
