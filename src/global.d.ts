/* eslint-disable @typescript-eslint/naming-convention */
declare module 'process' {
  global {
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
      interface ProcessEnv {
        PORT?: number;
        APP_NAME?: string;
        MCS_URL?: string;
      }
    }
  }
}

declare const __DEV__: boolean;

declare module '*.css' {
  export default Record<string, string>;
}
