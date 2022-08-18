import { Table } from '@navikt/ds-react';
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
      <Table.Body data-testid={`${testId}-table-loading`}>
        <Table.Row>
          <Table.DataCell colSpan={columnCount}>
            <RowLoader>Laster kvalitetsvurderinger...</RowLoader>
          </Table.DataCell>
        </Table.Row>
      </Table.Body>
    );
  }

  if (vurderinger.length === 0) {
    return (
      <Table.Body data-testid={`${testId}-table-loaded`}>
        <Table.Row>
          <Table.DataCell colSpan={columnCount}>Ingen kvalitetsvurderinger</Table.DataCell>
        </Table.Row>
      </Table.Body>
    );
  }

  return (
    <Table.Body data-testid={`${testId}-table-loaded`}>
      {vurderinger.map((k) => (
        <Row {...k} key={k.id} testId={testId} />
      ))}
    </Table.Body>
  );
};
