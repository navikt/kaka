import React, { useEffect } from 'react';
import { FULLFOER_FIXED_CACHE_KEY, useFullfoerMutation } from '../../redux-api/saksdata';
import { Footer } from './footer';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsregistrering = () => {
  const [, { reset }] = useFullfoerMutation({ fixedCacheKey: FULLFOER_FIXED_CACHE_KEY });

  useEffect(() => reset, [reset]);

  return (
    <>
      <Saksdata />
      <Kvalitetsskjema />
      <Footer />
    </>
  );
};
