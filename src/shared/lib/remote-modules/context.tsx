import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';

import { time } from '..';

interface IRemoteModule {
  name: string;
  url: string;
  component: string;
  path: string;
}

type RemoteModulesContextType = {
  remoteModules: IRemoteModule[];
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
  const [remoteModules, setRemoteModules] = useState<IRemoteModule[]>([]);
  const [status, setStatus] = useState<Status>(Status.INITIAL);

  const loadRemoteModules = useCallback(async () => {
    setStatus(Status.PENDING);
    await time.delay(2000);
    setRemoteModules([
      {
        name: 'TEST',
        url: 'http://localhost:5053',
        component: 'Main',
        path: 'TEST'.toLowerCase(),
      },
    ]);
    setStatus(Status.DONE);
  }, []);

  const isPending = status === Status.PENDING;

  const value = useMemo(() => ({ remoteModules, loadRemoteModules, isPending }), [loadRemoteModules, remoteModules, isPending]);

  return <RemoteModulesContext.Provider value={value}>{children}</RemoteModulesContext.Provider>;
}
