import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';

import { env } from '~/shared/config';

import { notification } from '..';

type RemoteModuleDto = {
  name: string;
  url: string;
  scope: string;
  component: string;
  isActive: boolean;
};

export type RemoteModule = RemoteModuleDto & {
  path: string;
};

type RemoteModulesContextType = {
  remoteModules: RemoteModule[];
  loadRemoteModules: () => Promise<void>;
  isPending: boolean;
};

export const RemoteModulesContext = createContext<RemoteModulesContextType | null>(null);

type RemoteModulesProviderProps = {
  children: ReactNode;
};

enum Status {
  INITIAL = 0,
  PENDING,
  DONE,
}

export function RemoteModulesProvider({ children }: RemoteModulesProviderProps): JSX.Element | null {
  const [remoteModules, setRemoteModules] = useState<RemoteModule[]>([]);
  const [status, setStatus] = useState<Status>(Status.INITIAL);

  const loadRemoteModules = useCallback(async () => {
    setStatus(Status.PENDING);

    try {
      const response = await fetch(`${env.MICROFRONTEND_CONTROL_SERVER_URL}/api/v1/microfrontends/all`);
      const data = (await response.json()) as RemoteModuleDto[];
      const loadedRemoteModules = data.map((module) => ({ ...module, path: module.name.toLowerCase() }));
      setRemoteModules(loadedRemoteModules);
    } catch (error) {
      notification.showError({ title: 'Ошибка!', message: 'Ошибка при загрузке микрофронтендов' });
      console.error(`Failed to connect Microfrontend control server: ${error}`);
    }

    setStatus(Status.DONE);
  }, []);

  const isPending = status === Status.PENDING;

  const value = useMemo(() => ({ remoteModules, loadRemoteModules, isPending }), [loadRemoteModules, remoteModules, isPending]);

  return <RemoteModulesContext.Provider value={value}>{children}</RemoteModulesContext.Provider>;
}
