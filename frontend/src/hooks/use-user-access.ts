import { useMemo } from 'react';
import { useGetUserDataQuery } from '../redux-api/metadata';
import { Role } from '../types/user';

type Access = {
  [key in Role]: boolean;
};

interface ReturnValue {
  isLoading: boolean;
  roles: Access;
}

const INITIAL_ACCESS: Access = {
  [Role.ROLE_KAKA_KVALITETSVURDERING]: false,
  [Role.ROLE_KAKA_TOTALSTATISTIKK]: false,
  [Role.ROLE_KAKA_LEDERSTATISTIKK]: false,
  [Role.ROLE_KAKA_KVALITETSTILBAKEMELDINGER]: false,
  [Role.ROLE_ADMIN]: false,
  [Role.ROLE_KLAGE_STRENGT_FORTROLIG]: false,
};

export const useUserHasRole = (): ReturnValue => {
  const { data: user, isLoading } = useGetUserDataQuery();

  return useMemo(() => {
    if (isLoading || typeof user === 'undefined') {
      return { isLoading: true, roles: INITIAL_ACCESS };
    }

    const roles: Access = user.roller.reduce<Access>((acc, role) => {
      acc[role] = true;
      return acc;
    }, INITIAL_ACCESS);

    return { isLoading: false, roles };
  }, [isLoading, user]);
};
