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

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __DEV__: boolean;
