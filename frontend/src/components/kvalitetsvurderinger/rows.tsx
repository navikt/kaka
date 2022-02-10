import React from 'react';
import 'nav-frontend-tabell-style';
import { ISaksdataCompleteSearchHit, ISaksdataIncompleteSearchHit } from '../../types/saksdata';
import { RowLoader } from '../loader/row-loader';
import { Row } from './row';

interface Props {
  vurderinger?: (ISaksdataIncompleteSearchHit | ISaksdataCompleteSearchHit)[];
  columnCount: number;
  testId: string;
}

export const VurderingRows = ({ vurderinger, columnCount, testId }: Props): JSX.Element => {
  if (typeof vurderinger === 'undefined') {
    return (
      <tbody data-testid={`${testId}-table-loading`}>
        <tr>
          <td colSpan={columnCount}>
            <RowLoader>Laster kvalitetsvurderinger...</RowLoader>
          </td>
        </tr>
      </tbody>
    );
  }

  if (vurderinger.length === 0) {
    return (
      <tbody data-testid={`${testId}-table-loaded`}>
        <tr>
          <td colSpan={columnCount}>Ingen kvalitetsvurderinger</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody data-testid={`${testId}-table-loaded`}>
      {vurderinger.map((k) => (
        <Row {...k} key={k.id} testId={testId} />
      ))}
    </tbody>
  );
};
