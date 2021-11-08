import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { KvalitetsregistreringPage } from '../../pages/kvalitetsregistrering';
import { KvalitetsregistreringerPage } from '../../pages/kvalitetsvurderinger';

export const Routes = () => (
  <Switch>
    <Route exact path="/kvalitetsregistreringer">
      <KvalitetsregistreringerPage />
    </Route>
    <Route exact path="/kvalitetsregistreringer/:saksdataId">
      <KvalitetsregistreringPage />
    </Route>
    <Redirect to="/kvalitetsregistreringer" />
  </Switch>
);
