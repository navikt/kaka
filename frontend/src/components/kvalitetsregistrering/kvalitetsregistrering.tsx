import React from 'react';
import { PageWrapper } from '../../pages/page-wrapper';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsregistrering = () => (
  <PageWrapper>
    <Saksdata />
    <Kvalitetsskjema />
  </PageWrapper>
);
