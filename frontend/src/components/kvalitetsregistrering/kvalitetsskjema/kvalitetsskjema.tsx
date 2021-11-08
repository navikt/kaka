import React from 'react';
import styled from 'styled-components';
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
  if (tema === null) {
    return null;
  }

  const relevantTemas = ['GRU', 'SYK', 'HJE', 'AAP', 'UFO', 'YRK', 'FOR', 'OMS'];

  if (relevantTemas.includes(tema)) {
    return <BrukAvRaadgivendeLege />;
  }

  return null;
};

const StyledKvalitetsskjema = styled.div`
  margin: 30px 0;
`;
