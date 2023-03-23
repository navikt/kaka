import React from 'react';
import { useKvalitetsvurderingIsFinished } from '@app/hooks/use-kvalitetsvurdering-is-finished';
import { FinishedFooter } from './finished-footer';
import { UnfinishedFooter } from './unfinished-footer';

export const Footer = () => (useKvalitetsvurderingIsFinished() ? <FinishedFooter /> : <UnfinishedFooter />);
