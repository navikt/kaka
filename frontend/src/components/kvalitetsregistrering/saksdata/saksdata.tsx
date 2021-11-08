import React from 'react';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { Tema } from './tema';
import { UtfallResultat } from './utfall-resultat';

export const Saksdata = () => (
  <>
    <SakenGjelder />
    <Sakstype />
    <Tema />
    <MottattVedtksinstans />
    <FraVedtaksenhet />
    <MottattKlageinstans />
    <UtfallResultat />
    <Lovhjemmel />
  </>
);
