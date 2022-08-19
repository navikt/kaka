import { Heading, Loader } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetSaksdataQuery } from '../../../redux-api/saksdata';
import { UtfallEnum } from '../../../types/utfall';
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
    return <Loader size="3xlarge" />;
  }

  if (
    typeof saksdata === 'undefined' ||
    typeof kvalitetsvurdering === 'undefined' ||
    saksdata.utfallId === UtfallEnum.TRUKKET ||
    isError
  ) {
    return null;
  }

  return (
    <StyledKvalitetsskjema data-testid="kvalitetsskjema">
      <Heading level="1" size="medium">
        Kvalitetsvurdering
      </Heading>
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

const StyledKvalitetsskjema = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

enum Ytelser {
  Omsorgspenger = '1',
  Opplæringspenger = '2',
  Pleiepenger_sykt_barn = '3',
  Pleiepenger_i_livets_sluttfase = '4',
  Sykepenger = '5',
  Foreldrepenger = '6',
  Svangerskapspenger = '8',
  Arbeidsavklaringspenger = '9',
  Hjelpestønad = '20',
  Grunnstønad = '21',
  Hjelpemidler = '22',
  Uføretrygd = '35',
  Yrkesskade = '36',
  Menerstatning = '37',
  Yrkessykdom = '38',
  Tvungen_forvaltning = '39',
}

const RELEVANTE_YTELSE_IDS: string[] = [
  Ytelser.Omsorgspenger,
  Ytelser.Opplæringspenger,
  Ytelser.Pleiepenger_sykt_barn,
  Ytelser.Pleiepenger_i_livets_sluttfase,
  Ytelser.Sykepenger,
  Ytelser.Foreldrepenger,
  Ytelser.Svangerskapspenger,
  Ytelser.Arbeidsavklaringspenger,
  Ytelser.Hjelpestønad,
  Ytelser.Grunnstønad,
  Ytelser.Hjelpemidler,
  Ytelser.Uføretrygd,
  Ytelser.Yrkesskade,
  Ytelser.Menerstatning,
  Ytelser.Yrkessykdom,
  Ytelser.Tvungen_forvaltning,
];

const useIsRelevantYtelse = (ytelseId: string | null): boolean => {
  const ytelser = useKodeverkValueDefault('ytelser');

  return useMemo<boolean>(() => {
    if (typeof ytelser === 'undefined' || ytelseId === null) {
      return false;
    }

    return ytelser.some(({ id }) => id === ytelseId && RELEVANTE_YTELSE_IDS.includes(ytelseId));
  }, [ytelser, ytelseId]);
};
