import { useEffect } from 'react';

export const useMount = (fn: () => void): void => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
