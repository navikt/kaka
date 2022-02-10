import { UserAccess } from '../../hooks/use-user-access';

export enum Page {
  AAPEN_STATISTIKK = 'AAPEN_STATISTIKK',
  TOTALSTATISTIKK = 'TOTALSTATISTIKK',
  LEDERSTATISTIKK = 'LEDERSTATISTIKK',
  KVALITETSVURDERINGER = 'KVALITETSVURDERINGER',
  TILBAKEMELDINGER = 'TILBAKEMELDINGER',
  MIN_STATISTIKK = 'MIN_STATISTIKK',
}

type PageAccessMap = Record<Page, (keyof UserAccess)[]>;

const ACCESS_ROLES: PageAccessMap = {
  AAPEN_STATISTIKK: [],
  TOTALSTATISTIKK: ['isSaksbehandler', 'isStyringsenhetleder', 'isKlageinstansleder'],
  LEDERSTATISTIKK: ['isKlageinstansleder'],
  KVALITETSVURDERINGER: ['isSaksbehandler'],
  TILBAKEMELDINGER: ['isVedtaksinstansleder'],
  MIN_STATISTIKK: ['isSaksbehandler'],
};

export const hasPageAccess = (page: Page, access: UserAccess): boolean => {
  const requiredRoles = ACCESS_ROLES[page];

  if (requiredRoles.length === 0) {
    return true;
  }

  return requiredRoles.some((role) => access[role]);
};
