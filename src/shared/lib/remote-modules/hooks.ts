import { useContext } from 'react';

import { RemoteModulesContext } from './context';

export const useRemoteModules = () => {
  const context = useContext(RemoteModulesContext);
  if (!context) {
    throw new Error('useRemoteModules was used outside of its Provider');
  }
  return context;
};
