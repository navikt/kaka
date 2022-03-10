import { IKodeverkSimpleValue, VIKAFOSSEN_ENHET } from '../types/kodeverk';
import { Role } from '../types/user';
import { useHasRole } from './use-has-role';

export const useVikafossenFilter = <T extends IKodeverkSimpleValue>(enheter?: T[]): T[] | undefined => {
  const hasVikafossenAccess = useHasRole(Role.ROLE_KLAGE_STRENGT_FORTROLIG);

  if (typeof enheter === 'undefined') {
    return undefined;
  }

  if (hasVikafossenAccess) {
    // Only Vikafossen.
    return enheter.filter(({ id }) => id === VIKAFOSSEN_ENHET);
  }

  // Every enhet except Vikafossen.
  return enheter.filter(({ id }) => id !== VIKAFOSSEN_ENHET);
};
