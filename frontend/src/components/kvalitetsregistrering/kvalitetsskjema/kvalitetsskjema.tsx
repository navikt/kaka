import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { Annet } from './annet';
import { BrukAvRaadgivendeLege } from './bruk-av-raadgivende-lege';
import { Klageforberedelsen } from './klageforberedelsen';
import { Utredningen } from './utredningen';
import { Vedtaket } from './vedtaket';

export const Kvalitetsskjema = () => {
  const [saksdata] = useSaksdata();

  if (typeof saksdata === 'undefined') {
    return null;
  }

  return (
    <StyledKvalitetsskjema>
      <Klageforberedelsen />
      <Utredningen />
      <BrukAvRaadgivendeLegeDisplay tema={saksdata.tema} />
      <Vedtaket />
      <Annet />
    </StyledKvalitetsskjema>
  );
};

interface BrukAvRaadgivendeLegeDisplayProps {
  tema: string | null;
}

const BrukAvRaadgivendeLegeDisplay = ({ tema }: BrukAvRaadgivendeLegeDisplayProps) => {
  const hasRelevantTema = useIsRelevantTema(tema);

  if (hasRelevantTema) {
    return <BrukAvRaadgivendeLege />;
  }

  return null;
};

const useIsRelevantTema = (temaId: string | null): boolean => {
  const temaData = useKodeverkValue('temaer');

  return useMemo<boolean>(() => {
    if (typeof temaData === 'undefined' || temaId === null) {
      return false;
    }

    return ['GRU', 'SYK', 'HJE', 'AAP', 'UFO', 'YRK', 'FOR', 'OMS']
      .map((n) => temaData.find(({ navn }) => navn === n)?.id)
      .includes(temaId);
  }, [temaData, temaId]);
};

const StyledKvalitetsskjema = styled.div`
  margin: 30px 0;
`;
