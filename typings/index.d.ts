declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        MCS_URL: string;
      }
    }
  }
}

declare const __DEV__: boolean;
