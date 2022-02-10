import { useMemo } from 'react';
import { useGetUserDataQuery } from '../redux-api/metadata';
import { IKodeverkValue } from '../types/kodeverk';
import { IUser, Role } from '../types/user';
import { useEnheter } from './use-enheter';
import { useKlageEnheter } from './use-klageenheter';

export interface UserAccess {
  isSaksbehandler: boolean;
  isKlageinstansleder: boolean;
  isStyringsenhetleder: boolean;
  isVedtaksinstansleder: boolean;
}

interface ReturnValue {
  isLoading: boolean;
  access: UserAccess | undefined;
}

export const useUserAccess = (): ReturnValue => {
  const { data: user, isLoading } = useGetUserDataQuery();

  const klageenheter = useKlageEnheter();
  const enheter = useEnheter();

  return useMemo(() => {
    if (
      isLoading ||
      typeof user === 'undefined' ||
      typeof klageenheter === 'undefined' ||
      typeof enheter === 'undefined'
    ) {
      return { isLoading: true, access: undefined };
    }

    return { isLoading: false, access: getUserAccess(user, klageenheter, enheter) };
  }, [isLoading, user, klageenheter, enheter]);
};

export const getUserAccess = (user: IUser, klageenheter: IKodeverkValue[], enheter: IKodeverkValue[]): UserAccess => {
  const isKlageinstansleder = hasAccess(klageenheter, enheter, [Role.ROLE_KLAGE_LEDER], user);

  return {
    isKlageinstansleder,
    isStyringsenhetleder: !isKlageinstansleder && user?.roller.includes(Role.ROLE_KLAGE_LEDER),
    isSaksbehandler: hasAccess(klageenheter, enheter, [Role.ROLE_KAKA_SAKSBEHANDLER], user),
    isVedtaksinstansleder: hasAccess(klageenheter, enheter, [Role.ROLE_VEDTAKSINSTANS_LEDER], user),
  };
};

const KLAGEENHET_ROLES: Role[] = [Role.ROLE_KLAGE_LEDER, Role.ROLE_KAKA_SAKSBEHANDLER];
const FOERSTEINSTANS_ROLES: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];

const hasAccess = (klageenheter: IKodeverkValue[], enheter: IKodeverkValue[], requiredRoles: Role[], user: IUser) => {
  if (requiredRoles.length === 0) {
    return true;
  }

  const hasRequiredRole = requiredRoles.some((role) => user?.roller.includes(role));

  if (!hasRequiredRole) {
    return false;
  }

  const hasRequiredKlageenhetAcess = hasRequiredEnhetAccess(klageenheter, KLAGEENHET_ROLES, requiredRoles, user);
  const hasRequiredFoersteinstansAccess = hasRequiredEnhetAccess(enheter, FOERSTEINSTANS_ROLES, requiredRoles, user);

  return hasRequiredKlageenhetAcess && hasRequiredFoersteinstansAccess;
};

const hasRequiredEnhetAccess = (
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
