import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MineKvalitetsvurderingerPage } from '../../pages/mine-kvalitetsvurderinger';

export const Routes = () => (
  <Switch>
    <Route exact path="/minekvalitetsvurderinger">
      <MineKvalitetsvurderingerPage />
    </Route>
    <Redirect to="/minekvalitetsvurderinger" />
  </Switch>
);
