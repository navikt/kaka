import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel/lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { UtfallResultat } from './utfall-resultat';
import { Ytelse } from './ytelse';

export const Saksdata = () => {
  const [saksdata] = useSaksdata();

  if (typeof saksdata === 'undefined') {
    return <NavFrontendSpinner />;
  }

  return (
    <>
      <SakenGjelder />
      <Sakstype />
      <Ytelse />
      <MottattVedtksinstans />
      <FraVedtaksenhet />
      <MottattKlageinstans />
      <UtfallResultat />
      <Lovhjemmel />
    </>
  );
};
