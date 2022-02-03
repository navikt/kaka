import { useGetUserDataQuery } from '../redux-api/metadata';
import { IKodeverkValue } from '../types/kodeverk';
import { IUser, Role } from '../types/user';
import { useEnheter } from './use-enheter';
import { useKlageEnheter } from './use-klageenheter';

export const KA_ROLES: Role[] = [Role.ROLE_KLAGE_SAKSBEHANDLER, Role.ROLE_KLAGE_LEDER, Role.ROLE_KLAGE_FAGANSVARLIG];
export const FOERSTEINSTANS_ROLES: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];

export const useHasAccess = (requiredRoles: Role[] = []): boolean => {
  const klageenheter = useKlageEnheter();
  const enheter = useEnheter();
  const { data: user, isLoading } = useGetUserDataQuery();

  if (isLoading || typeof user === 'undefined') {
    return false;
  }

  return hasAccess(klageenheter, enheter, requiredRoles, user);
};

export const hasAccess = (
  klageenheter: IKodeverkValue[],
  enheter: IKodeverkValue[],
  requiredRoles: Role[],
  user: IUser
) => {
  if (requiredRoles.length === 0) {
    return true;
  }

  const hasRequiredRole = requiredRoles.some((role) => user?.roller.includes(role));

  if (!hasRequiredRole) {
    return false;
  }

  const hasRequiredKAAcess = hasRequiredEnhetAccess(klageenheter, KA_ROLES, requiredRoles, user);
  const hasRequiredFoersteinstansAccess = hasRequiredEnhetAccess(enheter, FOERSTEINSTANS_ROLES, requiredRoles, user);

  return hasRequiredKAAcess && hasRequiredFoersteinstansAccess;
};

export const hasRequiredEnhetAccess = (
  enheter: IKodeverkValue[],
  enhetRoles: Role[],
  requiredRoles: Role[],
  user: IUser
): boolean => {
  const requiredEnhetRoles = enhetRoles.filter((role) => requiredRoles.includes(role));

  if (requiredEnhetRoles.length === 0) {
    return true;
  }

  const hasEnhetRole = requiredEnhetRoles.some((role) => user?.roller.includes(role));

  if (!hasEnhetRole) {
    return false;
  }

  return enheter.some(({ id }) => id === user.ansattEnhet.id);
};
