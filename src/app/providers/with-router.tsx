import { Loader } from '@mantine/core';
import { type ComponentType, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (WrappedComponent: ComponentType): (() => JSX.Element) => {
  const RouterWrapper = (): JSX.Element => (
    <BrowserRouter>
      <Suspense fallback={<Loader className="centered-absolute" />}>
        <WrappedComponent />
      </Suspense>
    </BrowserRouter>
  );
  return RouterWrapper;
};
