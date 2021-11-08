import React from 'react';
import 'nav-frontend-tabell-style';
import { ISaksdataBase } from '../../types/saksdata';

interface SaksCounterProps {
  list?: ISaksdataBase[];
}

export const SakCounter = ({ list }: SaksCounterProps) => {
  if (typeof list === 'undefined' || list.length === 0) {
    return <p>0 saker</p>;
  }

  if (list.length === 1) {
    return <p>{list.length} sak</p>;
  }

  return <p>{list.length} saker</p>;
};
