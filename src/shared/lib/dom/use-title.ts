import { useEffect } from 'react';

import { APP_NAME } from '~/shared/config/env';

export const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = `${APP_NAME} | ${title}`;
  }, [title]);
};
