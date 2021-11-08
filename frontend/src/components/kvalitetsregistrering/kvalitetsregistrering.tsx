import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useKvalitetsvurdering } from '../../hooks/use-kvalitetsvurdering';
import { useSaksdata } from '../../hooks/use-saksdata';
import { Footer } from './footer';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsregistrering = () => {
  const [saksdata, saksdataIsLoading] = useSaksdata();
  const [kvalitetsvurdering] = useKvalitetsvurdering();

  if (saksdataIsLoading || typeof saksdata === 'undefined' || typeof kvalitetsvurdering === 'undefined') {
    return <NavFrontendSpinner />;
  }

  return (
    <>
      <Saksdata />
      <Kvalitetsskjema />
      <Footer />
    </>
  );
};
