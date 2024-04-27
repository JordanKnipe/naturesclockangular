// CognitoUtils.ts
import { environment } from '../../../environment'

/** create cognito login url */
export const buildCognitoLoginUrl = () => {
    const loginUrl = `${environment.cognitoDomain}/login?response_type=token&client_id=${environment.clientId}&redirect_uri=${encodeURIComponent(environment.redirectUri)}`;
    return loginUrl;
  };

  /** hash token */
export const parseCognitoResponse = (hash:string) => {
  console.log("Hash received in parseCognitoResponse:", hash);
  const tokens = new URLSearchParams(hash.substring(1));
  const id_token = tokens.get('id_token');
  console.log("Parsed ID token:", id_token);
  return { id_token };
};


