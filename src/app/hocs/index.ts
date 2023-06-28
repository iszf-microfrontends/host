import compose from 'compose-function';

import { withMantine } from './with-mantine';
import { withRemoteModules } from './with-remote-modules';
import { withRouter } from './with-router';

export const withHocs = compose(withMantine, withRouter, withRemoteModules);
