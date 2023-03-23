import { useUser } from '@app/simple-api-state/use-user';
import { Role } from '@app/types/user';

const useUserRoles = () => {
  const { data } = useUser();

  return data?.roller ?? [];
};

export const useHasRole = (role: Role): boolean => {
  const userRoles = useUserRoles();

  return userRoles.includes(role);
};
