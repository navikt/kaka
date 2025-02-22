import { useUser } from '@app/simple-api-state/use-user';
import type { Role } from '@app/types/user';

export const useHasRole = (role: Role): boolean => {
  const data = useUser();

  return data.roller.includes(role);
};
