import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';

import { time } from '..';

type RemoteModuleDto = {
  name: string;
  url: string;
  component: string;
};

type RemoteModule = RemoteModuleDto & {
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

    await time.delay(2000);

    const response = await fetch('http://localhost:3000/started-microfrontends');
    const fetchedRemoteModules = (await response.json()) as RemoteModuleDto[];

    setRemoteModules(fetchedRemoteModules.map((module) => ({ ...module, path: module.name.toLowerCase() })));
    setStatus(Status.DONE);
  }, []);

  const isPending = status === Status.PENDING;

  const value = useMemo(() => ({ remoteModules, loadRemoteModules, isPending }), [loadRemoteModules, remoteModules, isPending]);

  return <RemoteModulesContext.Provider value={value}>{children}</RemoteModulesContext.Provider>;
}
