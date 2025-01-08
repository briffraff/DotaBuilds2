import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from './firebase/firebaseAuth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((isAuth: boolean) => {
        if (isAuth) {
          this.router.navigate(['/profile']);
          return false;
        }
        return true;
      })
    );
  }
}
