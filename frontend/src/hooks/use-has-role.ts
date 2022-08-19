import { useUser } from '../simple-api-state/use-user';
import { Role } from '../types/user';

const useUserRoles = () => {
  const { data } = useUser();

  return data?.roller ?? [];
};

export const useHasRole = (role: Role): boolean => {
  const userRoles = useUserRoles();

  return userRoles.includes(role);
};
