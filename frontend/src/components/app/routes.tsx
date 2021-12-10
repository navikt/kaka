import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { KvalitetsregistreringPage } from '../../pages/kvalitetsregistrering';
import { KvalitetsregistreringerPage } from '../../pages/kvalitetsregistreringer';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="kvalitetsregistreringer" />} />
    <Route path="kvalitetsregistreringer" element={<KvalitetsregistreringerPage />}></Route>
    <Route path="kvalitetsregistreringer/:saksdataId" element={<KvalitetsregistreringPage />} />
  </Routes>
);
