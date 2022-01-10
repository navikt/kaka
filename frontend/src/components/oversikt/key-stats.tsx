import React from 'react';
import { Gjennomsnittstid } from './key-stats/average-time';
import { Finished } from './key-stats/finished';
import { Omgjort } from './key-stats/omgjort';
import { Processed } from './key-stats/processed';
import { StatsSections } from './key-stats/styled-components';

export const KeyStats = () => (
  <StatsSections>
    <Omgjort />
    <Finished />
    <Gjennomsnittstid />
    <Processed weeks={12} />
    <Processed weeks={15} />
  </StatsSections>
);
