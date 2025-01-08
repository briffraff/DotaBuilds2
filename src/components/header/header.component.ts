import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    menuOpen: boolean = false;
    isAuthenticated: boolean = false;

    constructor(private authService: FirebaseAuthService) { }

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((isAuth) => {
            this.isAuthenticated = isAuth;
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout = () => {
        this.authService.logout();
    }
}
