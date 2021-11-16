import React from 'react';
import 'nav-frontend-tabell-style';
import { ISaksdataBase } from '../../types/saksdata';
import { Loader } from '../loader/loader';
import { Row } from './row';

interface RegistreringRaderProps {
  registreringer?: ISaksdataBase[];
  columnCount: number;
  testId: string;
}

export const RegistreringRows = ({ registreringer, columnCount, testId }: RegistreringRaderProps): JSX.Element => {
  if (typeof registreringer === 'undefined') {
    return (
      <tbody data-testid={`${testId}-table-loading`}>
        <tr>
          <td colSpan={columnCount}>
            <Loader>Laster kvalitetsregistreringer...</Loader>
          </td>
        </tr>
      </tbody>
    );
  }

  if (registreringer.length === 0) {
    return (
      <tbody data-testid={`${testId}-table-none`}>
        <tr>
          <td colSpan={columnCount}>Ingen registreringer i liste</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody data-testid={`${testId}-table-rows`}>
      {registreringer.map((k) => (
        <Row {...k} key={k.id} />
      ))}
    </tbody>
  );
};
