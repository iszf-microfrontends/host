import { type Context, useContext } from 'react';

import { assert } from './typescript';

export const useStrictContext = <T>(context: Context<T>): T => {
  const value = useContext(context);
  assert(value, `Could not use ${context.displayName} outside of its provider`);
  return value;
};
