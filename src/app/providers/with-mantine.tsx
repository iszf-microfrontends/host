import { ComponentType } from 'react';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function withMantine(WrappedComponent: ComponentType) {
  return function wrapper(): JSX.Element | null {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <WrappedComponent />
      </MantineProvider>
    );
  };
}
