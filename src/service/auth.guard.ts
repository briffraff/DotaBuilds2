import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { FirebaseAuthService } from './firebase/firebaseAuth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    console.log('AuthGuard: Checking if user is authenticated');
    if (!this.authService.isAuthenticated()) {
      console.log('User is not authenticated, redirecting to login');
      return of(this.router.createUrlTree(['/login']));
    }
    console.log('User is authenticated, allowing access');
    return of(true);
  }

}


