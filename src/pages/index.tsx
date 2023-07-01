import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Title } from '@mantine/core';

import { RemoteComponent, RemoteModule, useRemoteModules } from '~/shared/lib';
import { Layout } from '~/widgets/layout';

export function Pages(): JSX.Element | null {
  const { remoteModules, loadRemoteModules } = useRemoteModules();

  useEffect(() => {
    loadRemoteModules();
  }, [loadRemoteModules]);

  const renderRemoteModule = (module: RemoteModule): JSX.Element | null =>
    module.isBackendActive ? (
      <Route
        key={module.name}
        path={module.path}
        element={<RemoteComponent remote={module.name} url={module.url} component={module.component} />}
      />
    ) : null;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Title>Home</Title>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {remoteModules.map(renderRemoteModule)}
      </Route>
    </Routes>
  );
}
