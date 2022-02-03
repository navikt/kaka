import { useGetUserDataQuery } from '../redux-api/metadata';
import { Role } from '../types/user';
import { useDefaultQueryLeder, useDefaultQueryOpen, useDefaultQueryTilbakemeldinger } from './use-default-query-params';
import { useKlageEnheter } from './use-klageenheter';

export const useIndexPath = () => {
  const { data: user, isLoading } = useGetUserDataQuery();

  const klageenheter = useKlageEnheter();

  const lederQuery = useDefaultQueryLeder();
  const openQuery = useDefaultQueryOpen();
  const tilbakemeldingerQuery = useDefaultQueryTilbakemeldinger();

  if (isLoading || typeof user === 'undefined') {
    return '/';
  }

  if (user.roller.includes(Role.ROLE_VEDTAKSINSTANS_LEDER)) {
    return `tilbakemeldinger?${tilbakemeldingerQuery}`;
  }

  if (user.roller.includes(Role.ROLE_KLAGE_SAKSBEHANDLER)) {
    return 'kvalitetsregistreringer';
  }

  if (user.roller.includes(Role.ROLE_KLAGE_LEDER) && klageenheter.some(({ navn }) => navn === user.ansattEnhet.navn)) {
    return `statistikk/leder?${lederQuery}`;
  }

  return `statistikk/open?${openQuery}`;
};
