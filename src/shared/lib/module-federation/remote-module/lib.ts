import { type MicrofrontendDto } from '~/shared/api';

import { type RemoteModule } from './model';

export const transformToEntity = (dto: MicrofrontendDto): RemoteModule => ({ ...dto, path: dto.name.toLowerCase() });
