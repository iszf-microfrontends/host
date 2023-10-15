/* eslint-disable @typescript-eslint/naming-convention */
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: number;
        APP_NAME?: string;
        MCS_URL?: string;
      }
    }
  }
}

declare const __DEV__: boolean;
