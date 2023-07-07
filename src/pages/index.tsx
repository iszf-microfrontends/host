import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Divider, Title } from '@mantine/core';

import { RemoteComponent, RemoteModule, useRemoteModules } from '~/shared/lib';
import { Layout } from '~/widgets/layout';

export function Pages(): JSX.Element | null {
  const { remoteModules, loadRemoteModules } = useRemoteModules();

  useEffect(() => {
    loadRemoteModules();
  }, [loadRemoteModules]);

  const renderRemoteRoutes = (module: RemoteModule): JSX.Element | null =>
    module.isActive ? (
      <Route
        key={module.name}
        path={module.path}
        element={
          <div>
            <Title>{module.name}</Title>
            <Divider my="md" />
            <RemoteComponent url={module.url} scope={module.scope} component={module.component} fallback={<div>Загрузка...</div>} />
          </div>
        }
      />
    ) : null;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Title>Главная</Title>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {remoteModules.map(renderRemoteRoutes)}
      </Route>
    </Routes>
  );
}
