import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const secure = `Secure`;
    const sameSite = `SameSite=Strict`;
    document.cookie = `${name}=${value}; ${expires}; path=/; ${secure}; ${sameSite}`;
  }


  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }


  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
  }
}
