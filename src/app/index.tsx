import { withHocs } from './hocs';

import { Pages } from '../pages';

function App(): JSX.Element | null {
  return <Pages />;
}

export const AppWithProviders = withHocs(App);
