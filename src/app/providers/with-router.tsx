import { ComponentType, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@mantine/core';

export const withRouter = (WrappedComponent: ComponentType) => {
  const RouterWrapper = () => (
    <BrowserRouter>
      <Suspense fallback={<Loader className="centered-absolute" />}>
        <WrappedComponent />
      </Suspense>
    </BrowserRouter>
  );
  return RouterWrapper;
};
