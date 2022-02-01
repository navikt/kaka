import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { KvalitetsregistreringPage } from '../../pages/kvalitetsregistrering';
import { KvalitetsregistreringerPage } from '../../pages/kvalitetsregistreringer';
import { OversiktLederPage } from '../../pages/oversikt/leder';
import { OversiktTotalPage } from '../../pages/oversikt/total';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="kvalitetsregistreringer" />} />
    <Route path="oversikt">
      <Route path="total" element={<OversiktTotalPage />} />
      <Route path="leder" element={<OversiktLederPage />} />
    </Route>
    <Route path="kvalitetsregistreringer" element={<KvalitetsregistreringerPage />} />
    <Route path="kvalitetsregistreringer/:saksdataId" element={<KvalitetsregistreringPage />} />
  </Routes>
);
