import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  loggedInChanged = new EventEmitter<boolean>();

  logIn(): void {
    setTimeout(() => {
      this.loggedIn = true;
      this.loggedInChanged.emit(this.loggedIn);
    }, 3_000);
  }

  logOut(): void {
    this.loggedIn = false;
    this.loggedInChanged.emit(this.loggedIn);
  }
}
