import { Divider, Title } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { BaseLayout } from '~/layouts/base-layout';
import { ROUTES } from '~/shared/config';
import { RemoteComponent, type RemoteModule, remoteModuleStore } from '~/shared/lib';

const HomePage = lazy(async () => import('./home').then((module) => ({ default: module.HomePage })));

export const Pages = observer(() => {
  useEffect(() => {
    remoteModuleStore.loadData();
  }, []);

  const renderRoute = (module: RemoteModule): JSX.Element => (
    <Route
      key={module.name}
      path={module.path}
      element={
        <div>
          <Title>{module.name}</Title>
          <Divider my="md" />
          <RemoteComponent url={module.url} scope={module.name} component={module.component} fallback={<div>Загрузка...</div>} />
        </div>
      }
    />
  );

  const renderRoutes = (): JSX.Element => <>{remoteModuleStore.data?.case({ fulfilled: (modules) => <>{modules.map(renderRoute)}</> })}</>;

  return (
    <Routes>
      <Route path={ROUTES.home} element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        {renderRoutes()}
      </Route>
    </Routes>
  );
});
