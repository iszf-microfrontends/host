import { MantineProvider, type MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { type ComponentType } from 'react';

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

export const withMantine = (WrappedComponent: ComponentType): (() => JSX.Element) => {
  const MantineWrapper = (): JSX.Element => (
    <MantineProvider theme={theme} withNormalizeCSS>
      <Notifications />
      <WrappedComponent />
    </MantineProvider>
  );
  return MantineWrapper;
};
