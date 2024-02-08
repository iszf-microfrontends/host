import { lazy, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { BaseLayout } from '~/layouts/base';

const IndexPage = lazy(async () => import('./index/index').then((module) => ({ default: module.IndexPage })));

export const Pages: FC = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<IndexPage />}></Route>
    </Route>
  </Routes>
);
