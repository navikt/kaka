import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetSaksdataQuery } from '../../../redux-api/saksdata';
import { Annet } from './annet';
import { BrukAvRaadgivendeLege } from './bruk-av-raadgivende-lege';
import { Klageforberedelsen } from './klageforberedelsen';
import { Utredningen } from './utredningen';
import { Vedtaket } from './vedtaket';

export const Kvalitetsskjema = () => {
  const saksdataId = useSaksdataId();
  const { data: saksdata, isLoading, isError } = useGetSaksdataQuery(saksdataId);
  const [kvalitetsvurdering] = useKvalitetsvurdering();

  if (isLoading) {
    return <NavFrontendSpinner />;
  }

  if (typeof saksdata === 'undefined' || typeof kvalitetsvurdering === 'undefined' || isError) {
    return null;
  }

  return (
    <StyledKvalitetsskjema data-testid="kvalitetsskjema">
      <Klageforberedelsen />
      <Utredningen />
      <BrukAvRaadgivendeLegeDisplay ytelseId={saksdata.ytelseId} />
      <Vedtaket />
      <Annet />
    </StyledKvalitetsskjema>
  );
};

interface BrukAvRaadgivendeLegeDisplayProps {
  ytelseId: string | null;
}

const BrukAvRaadgivendeLegeDisplay = ({ ytelseId }: BrukAvRaadgivendeLegeDisplayProps) => {
  const hasRelevantYtelse = useIsRelevantYtelse(ytelseId);

  if (hasRelevantYtelse) {
    return <BrukAvRaadgivendeLege />;
  }

  return null;
};

const StyledKvalitetsskjema = styled.div`
  margin: 30px 0;
`;

enum Ytelser {
  Omsorgspenger = '1',
  Opplæringspenger = '2',
  Pleiepenger_sykt_barn = '3',
  Pleiepenger_i_livets_sluttfase = '4',
  Sykepenger = '5',
  Grunnstønad = '',
  Hjelpestønad = '',
  Hjelpemidler = '',
  Arbeidsavklaringspenger = '',
  Yrkesskade = '',
  Tvungen_forvaltning = '',
  Foreldrepenger = '',
  Svangerskapspenger = '',
  Uføretrygd = '',
}

const RELEVANTE_YTELSE_IDS: string[] = [
  Ytelser.Omsorgspenger,
  Ytelser.Opplæringspenger,
  Ytelser.Pleiepenger_sykt_barn,
  Ytelser.Pleiepenger_i_livets_sluttfase,
  Ytelser.Sykepenger,
];

const useIsRelevantYtelse = (ytelseId: string | null): boolean => {
  const ytelseData = useKodeverkValue('ytelser');

  return useMemo<boolean>(() => {
    if (typeof ytelseData === 'undefined' || ytelseId === null) {
      return false;
    }

    return ytelseData.some(({ id }) => id === ytelseId && RELEVANTE_YTELSE_IDS.includes(ytelseId));
  }, [ytelseData, ytelseId]);
};
