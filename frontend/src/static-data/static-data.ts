import { loadStaticData } from '@app/static-data/loader';
import type { IUser } from '@app/types/user';

export const user = loadStaticData<IUser>('/api/kaka-api/metadata/userdata', 'brukerdata');
