import { lazy, ReactNode, Suspense } from 'react';

import { loadComponent } from './utils';

import { ErrorBoundary } from '../error-boundary';

type RemoteComponentProps = {
  remote: string;
  url: string;
  component: string;
  fallback?: string | ReactNode;
};

export function RemoteComponent({ remote, url, component, fallback = <div>Loading...</div> }: RemoteComponentProps): JSX.Element | null {
  const LoadedComponent = lazy(loadComponent(remote, url, `./${component}`));

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <LoadedComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
