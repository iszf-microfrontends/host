declare global {
  /**
   * Custom utility types
   */
  export type Nullable<T> = T | null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const __DEV__: boolean;
}

export {};

type CSSModule = Record<string, string>;

declare module '*.css' {
  const styles: CSSModule;
  export default styles;
}

declare module '*.png';
