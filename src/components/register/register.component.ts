import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../service/validators/password-match.validator';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup;
    error: string = '';
    isSubmitting: boolean = false;

    loginHeroImage = "/images/50380185ad778bf69a8d4bc62fd72e72.jpg";

    constructor(
        private titleService: Title,
        private authService: FirebaseAuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.registerForm = this.fb.group(
            {
                username: ['', [Validators.required, Validators.minLength(3)]],
                playerPosition: [''],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(3)]],
                repass: ['', [Validators.required]],
            },
            { validators: passwordMatchValidator('password', 'repass') }
        );
    }

    ngOnInit(): void {
        this.titleService.setTitle(titles.Register);
    }

    async handleRegister() {
        this.isSubmitting = true;

        if (this.registerForm.invalid) {
            this.error = 'Please fill in valid credentials.';
            this.isSubmitting = false;
            return;
        }

        const { username, email, password, playerPosition } = this.registerForm.value;

        try {
            const user = await this.authService.register(username, email, password, playerPosition)
            this.authService.setUser(user);
            this.authService.setFirestoreUserInfo(user.uid);
            // console.log('Registered user:', this.authService.currentUser);

            this.registerForm.reset();
            this.error = '';
            this.router.navigate(['/']);

        } catch (error: any) {
            this.error = error.message;
        } finally {
            this.isSubmitting = false;
        }

    }
}


