import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { FirebaseAuthService } from './firebase/firebaseAuth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) { }

canActivate(): Observable<boolean | UrlTree> {
    // console.log('GuestGuard: Checking if user is authenticated');
    if (this.authService.isAuthenticated()) {
      // console.log('User is authenticated, redirecting to profile');
      return of(this.router.createUrlTree(['/profile']));
    }
    // // console.log('User is not authenticated, allowing access to login');
    return of(true);
}
}
