import { useMemo } from 'react';
import { useUser } from '@app/simple-api-state/use-user';
import { Role } from '@app/types/user';

type Access = {
  [key in Role]: boolean;
};

const INITIAL_ACCESS: Access = {
  [Role.KAKA_KVALITETSVURDERING]: false,
  [Role.KAKA_TOTALSTATISTIKK]: false,
  [Role.KAKA_LEDERSTATISTIKK]: false,
  [Role.KAKA_KVALITETSTILBAKEMELDINGER]: false,
  [Role.KAKA_ADMIN]: false,
  [Role.EGEN_ANSATT]: false,
  [Role.FORTROLIG]: false,
  [Role.STRENGT_FORTROLIG]: false,
  [Role.ROLE_KLAGE_LEDER]: false,
};

export const useUserAccess = (): Access => {
  const user = useUser();

  return useMemo(() => {
    const roles: Access = user.roller.reduce<Access>((acc, role) => {
      acc[role] = true;

      return acc;
    }, INITIAL_ACCESS);

    return roles;
  }, [user]);
};
