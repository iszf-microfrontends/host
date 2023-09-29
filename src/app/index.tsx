import { withProviders } from './providers';

import { Pages } from '../pages';

const App = () => <Pages />;

export const AppWithProviders = withProviders(App);
