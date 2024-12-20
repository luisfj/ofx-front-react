declare namespace NodeJS {
    export interface ProcessEnv {
      KEYCLOAK_CLIENT_ID: string;
      KEYCLOAK_CLIENT_SECRET: string;
      KEYCLOAK_ISSUER: string;
      AUTH_SECRET: string;
      KEYCLOAK_BASE_URL: string;
    }
  }