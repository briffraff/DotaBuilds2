import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string = '';
    isSubmitting: boolean = false;

    constructor(
        private titleService: Title,
        private authService: FirebaseAuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.email]],
            password: ['', [Validators.minLength(3)]],
        });
    };

    ngOnInit(): void {
        this.titleService.setTitle(titles.Login);
    }

    async handleLogin() {
        this.isSubmitting = true;
        if (this.loginForm.invalid) {
            this.error = 'Please fill in valid credentials.';
            this.isSubmitting = false;
            return;
        }

        const { email, password } = this.loginForm.value;

        try {
            const user = await this.authService.login(email, password);
            this.authService.setUser(user);
            this.authService.setFirestoreUserInfo(user.uid);
            console.log('Logged in user:', this.authService.currentUser);
            this.loginForm.reset();
            this.error = '';
            localStorage.removeItem('loginEmail');
            this.router.navigate(['/']);
        } catch (error: any) {
            this.error = error.message;
        } finally {
            this.isSubmitting = false;
        }
    }
}
