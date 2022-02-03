import React from 'react';
import 'nav-frontend-tabell-style';
import { ISaksdataCompleteSearchHit, ISaksdataIncompleteSearchHit } from '../../types/saksdata';
import { RowLoader } from '../loader/row-loader';
import { Row } from './row';

interface RegistreringRaderProps {
  registreringer?: (ISaksdataIncompleteSearchHit | ISaksdataCompleteSearchHit)[];
  columnCount: number;
  testId: string;
}

export const RegistreringRows = ({ registreringer, columnCount, testId }: RegistreringRaderProps): JSX.Element => {
  if (typeof registreringer === 'undefined') {
    return (
      <tbody data-testid={`${testId}-table-loading`}>
        <tr>
          <td colSpan={columnCount}>
            <RowLoader>Laster kvalitetsregistreringer...</RowLoader>
          </td>
        </tr>
      </tbody>
    );
  }

  if (registreringer.length === 0) {
    return (
      <tbody data-testid={`${testId}-table-loaded`}>
        <tr>
          <td colSpan={columnCount}>Ingen registreringer i liste</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody data-testid={`${testId}-table-loaded`}>
      {registreringer.map((k) => (
        <Row {...k} key={k.id} testId={testId} />
      ))}
    </tbody>
  );
};
