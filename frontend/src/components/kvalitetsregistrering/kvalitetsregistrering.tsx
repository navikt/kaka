import React from 'react';
import { Footer } from './footer';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsregistrering = () => (
  <>
    <Saksdata />
    <Kvalitetsskjema />
    <Footer />
  </>
);
