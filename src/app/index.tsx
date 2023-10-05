import { Pages } from '../pages';

import { withProviders } from './providers';

const App = (): JSX.Element => <Pages />;

export const AppWithProviders = withProviders(App);
