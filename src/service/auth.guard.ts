import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from './firebase/firebaseAuth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseAuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.authService.checkAuth(); 
    if (!isAuthenticated) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true; 
  }
}
