import { lazy, ReactNode, Suspense } from 'react';

import { importRemote } from '@module-federation/utilities';

import { ErrorBoundary } from '~/shared/ui';

type RemoteComponentProps = {
  url: string;
  scope: string;
  component: string;
  fallback?: string | ReactNode;
};

export const RemoteComponent = ({ url, scope, component, fallback }: RemoteComponentProps) => {
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
};
