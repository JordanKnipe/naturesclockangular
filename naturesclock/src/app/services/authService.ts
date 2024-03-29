// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { buildCognitoLoginUrl, parseCognitoResponse } from './cognitoUtils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    const idToken = localStorage.getItem('id_token');
    return !!idToken;
  }

  login(): void {
    window.location.href = buildCognitoLoginUrl();
  }

  handleLoginCallback(): void {
    const tokens = parseCognitoResponse(window.location.hash);
    if (tokens.id_token) {
      localStorage.setItem('id_token', tokens.id_token);
      window.location.hash = ''; // Clear the hash
      // Navigate to '/timeline' - use Angular Router for navigation
    }
  }
}
