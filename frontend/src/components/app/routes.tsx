import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { KvalitetsregistreringPage } from '../../pages/kvalitetsregistrering';
import { KvalitetsregistreringerPage } from '../../pages/kvalitetsregistreringer';
import { OversiktPage } from '../../pages/oversikt';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="kvalitetsregistreringer" />} />
    <Route path="oversikt" element={<OversiktPage />} />
    <Route path="kvalitetsregistreringer" element={<KvalitetsregistreringerPage />} />
    <Route path="kvalitetsregistreringer/:saksdataId" element={<KvalitetsregistreringPage />} />
  </Routes>
);
