import { useUser } from '../simple-api-state/use-user';
import { Role } from '../types/user';

export const useUserRoles = () => {
  const { data } = useUser();
  return data?.roller ?? [];
};

export const useHasRole = (role: Role): boolean => {
  const userRoles = useUserRoles();
  return userRoles.includes(role);
};

export const useHasAnyOfRoles = (roles?: Role[]) => {
  const userRoles = useUserRoles();

  if (typeof roles === 'undefined' || roles.length === 0) {
    return true;
  }

  if (userRoles.length === 0) {
    return false;
  }

  return roles.some((role) => userRoles.includes(role));
};
