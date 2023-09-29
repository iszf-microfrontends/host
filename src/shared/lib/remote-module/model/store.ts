import { makeAutoObservable, when } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

import { api } from '~/shared/api';

import { RemoteModule } from './types';

import { showErrorNotification } from '../../notification';
import { transformToEntity } from '../lib';

class RemoteModuleStore {
  data: IPromiseBasedObservable<RemoteModule[]> | null = null;

  constructor() {
    makeAutoObservable(this);

    when(
      () => this.data?.state === 'rejected',
      () => {
        showErrorNotification({ title: 'Ошибка!', message: 'Ошибка при загрузке микрофронтендов' });
      },
    );
  }

  loadData = () => {
    this.data = fromPromise(api.mcsService.getAll().then((mfs) => mfs.map(transformToEntity)));
  };
}

export const remoteModuleStore = new RemoteModuleStore();
