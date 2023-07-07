import { lazy, ReactNode, Suspense } from 'react';

import { importRemote } from '@module-federation/utilities';

import { ErrorBoundary } from '../error-boundary';

type RemoteComponentProps = {
  url: string;
  scope: string;
  component: string;
  fallback?: string | ReactNode;
};

export function RemoteComponent({ url, scope, component, fallback }: RemoteComponentProps): JSX.Element | null {
  const Component = lazy(() =>
    importRemote({
      url,
      scope,
      module: component,
    }),
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
