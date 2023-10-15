import { importRemote } from '@module-federation/utilities';
import { lazy, type ReactNode, Suspense } from 'react';

import { ErrorBoundary } from '~/shared/ui';

interface RemoteComponentProps {
  url: string;
  scope: string;
  component: string;
  fallback?: string | ReactNode;
}

export const RemoteComponent = ({ url, scope, component, fallback }: RemoteComponentProps): JSX.Element => {
  const Component = lazy(async () =>
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
