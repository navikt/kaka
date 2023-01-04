import React from 'react';
import { useKvalitetsvurderingParam } from '../../hooks/use-kvalitetsvurdering-param';
import { StatisticsPropsV1 } from '../../types';
import { Kvalitetsvurdering } from './kvalitetsvurdering';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';

export const KvalitetsvurderingerV1 = ({ stats }: StatisticsPropsV1) => {
  const [field] = useKvalitetsvurderingParam();

  const { title, relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  return <Kvalitetsvurdering field={field} title={title} relevantReasons={relevantReasons} stats={stats} />;
};
