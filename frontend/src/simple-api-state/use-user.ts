import { IUser } from '@app/types/user';
import { SimpleApiState, useSimpleApiState } from './simple-api-state';

const metadataApi = new SimpleApiState<IUser>(`/api/kaka-api/metadata/userdata`);

export const useUser = () => useSimpleApiState(metadataApi);
