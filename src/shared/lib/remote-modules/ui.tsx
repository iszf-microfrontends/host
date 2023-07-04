import { ComponentType, lazy, ReactNode, Suspense, useMemo } from 'react';

import { importRemote } from '@module-federation/utilities';

import { ErrorBoundary } from '../error-boundary';

type RemoteComponentProps = {
  url: string;
  scope: string;
  component: string;
  fallback?: string | ReactNode;
};

export function RemoteComponent({ url, scope, component, fallback }: RemoteComponentProps): JSX.Element | null {
  const Component = useMemo(
    () =>
      lazy(() =>
        importRemote<{ default: { [component: string]: ComponentType } }>({
          url,
          scope,
          module: component,
        }).then((remote) => ({ default: remote.default[component] })),
      ),
    [component, scope, url],
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
