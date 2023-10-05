import { makeAutoObservable, when } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import { api } from '~/shared/api';

import { showErrorNotification } from '../../notification';
import { transformToEntity } from '../lib';

import { type RemoteModule } from './types';

class RemoteModuleStore {
  data: IPromiseBasedObservable<RemoteModule[]> | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    when(
      () => this.data?.state === 'rejected',
      () => {
        showErrorNotification({ title: 'Ошибка!', message: 'Ошибка при загрузке микрофронтендов' });
      },
    );
  }

  loadData(): void {
    this.data = fromPromise(api.mcsService.getAll().then((mfs) => mfs.map(transformToEntity)));
  }
}

export const remoteModuleStore = new RemoteModuleStore();
