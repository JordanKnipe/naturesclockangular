// src/app/services/config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly environmentVariables = (window as any).env;

  get cognitoDomain(): string {
    return this.environmentVariables['COGNITO_DOMAIN'];
  }

  get clientId(): string {
    return this.environmentVariables['CLIENT_ID'];
  }

  get redirectUri(): string {
    return this.environmentVariables['REDIRECT_URI'];
  }
}
