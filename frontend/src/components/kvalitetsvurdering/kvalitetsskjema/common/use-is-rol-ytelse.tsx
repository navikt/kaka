import { useSaksdata } from '@app/hooks/use-saksdata';
import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { Ytelse } from '@app/types/kodeverk';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

const RELEVANT_ROL_YTELSER: string[] = [
  Ytelse.SykdomIFamilienOmsorgspenger,
  Ytelse.SykdomIFamilienOpplæringspenger,
  Ytelse.SykdomIFamilienPleiepengerSyktBarn,
  Ytelse.SykdomIFamilienPleiepengerILivetsSluttfase,
  Ytelse.Sykepenger,
  Ytelse.ForeldrepengerForeldrepenger,
  Ytelse.ForeldrepengerSvangerskapspenger,
  Ytelse.Arbeidsavklaringspenger,
  Ytelse.GrunnOgHjelpestønadHjelpestønad,
  Ytelse.GrunnOgHjelpestønadGrunnstønad,
  Ytelse.HjelpemidlerTekniske,
  Ytelse.HjelpemidlerBilOgMotorkjøretøy,
  Ytelse.HjelpemidlerOrtopediske,
  Ytelse.Uføretrygd,
  Ytelse.YrkesskadeYrkesskade,
  Ytelse.YrkesskadeMenerstatning,
  Ytelse.YrkesskadeYrkessykdom,
  Ytelse.TvungenForvaltning,
];

export const useIsRolYtelse = (ytelseId: string | null | undefined): boolean => {
  const { data: saksdata } = useSaksdata();
  const { data: ytelser } = useYtelser(saksdata?.kvalitetsvurderingReference.version ?? skipToken);

  return useMemo<boolean>(() => {
    if (typeof ytelser === 'undefined' || typeof ytelseId !== 'string') {
      return false;
    }

    return ytelser.some(({ id }) => id === ytelseId && RELEVANT_ROL_YTELSER.includes(ytelseId));
  }, [ytelser, ytelseId]);
};
