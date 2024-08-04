// environment.prod.ts
import { ConfigService } from './config.service';

const configService = new ConfigService();

export const environment = {
  production: true,
  cognitoDomain: configService.cognitoDomain,
  clientId: configService.clientId,
  redirectUri: configService.redirectUri,
};