import { MicrofrontendDto } from '~/shared/api';

import { RemoteModule } from './model';

export const transformToEntity = (dto: MicrofrontendDto): RemoteModule => ({ ...dto, path: dto.name.toLowerCase() });
