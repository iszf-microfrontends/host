import { ComponentType } from 'react';

import { RemoteModulesProvider } from '~/shared/lib';

export function withRemoteModules(WrappedComponent: ComponentType) {
  return function wrapper(): JSX.Element | null {
    return (
      <RemoteModulesProvider>
        <WrappedComponent />
      </RemoteModulesProvider>
    );
  };
}
