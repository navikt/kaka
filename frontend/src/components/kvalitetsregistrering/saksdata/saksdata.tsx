import React from 'react';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { UtfallResultat } from './utfall-resultat';
import { Ytelse } from './ytelse';

export const Saksdata = () => (
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
