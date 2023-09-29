import { ComponentType } from 'react';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme: MantineThemeOverride = {
  globalStyles: () => ({
    '.centered-absolute': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      margin: 'auto',
    },
  }),
};

export const withMantine = (WrappedComponent: ComponentType) => {
  const MantineWrapper = () => (
    <MantineProvider theme={theme} withNormalizeCSS>
      <Notifications />
      <WrappedComponent />
    </MantineProvider>
  );
  return MantineWrapper;
};
