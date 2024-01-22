import { createRoot } from 'react-dom/client';

import { AppWithProviders } from './app';
import { appStarted } from './shared/config/init';

import '@mantine/core/styles.css';

appStarted();

createRoot(document.getElementById('root')!).render(<AppWithProviders />);
