// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  /** Auth Guard */
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      return false;
    }
    return true;
  }
}
