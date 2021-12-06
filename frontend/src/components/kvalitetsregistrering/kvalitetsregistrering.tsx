import React from 'react';
import { Footer } from './footer';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';
import { ValidationErrorProvider } from './validation-error-context';

export const Kvalitetsregistrering = () => (
  <ValidationErrorProvider>
    <Saksdata />
    <Kvalitetsskjema />
    <Footer />
  </ValidationErrorProvider>
);
