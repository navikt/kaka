import type { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { Table } from '@navikt/ds-react';
import { RowLoader } from '../loader/row-loader';
import { Row } from './row';

interface Props {
  vurderinger?: (ISaksdataIncomplete | ISaksdataComplete)[];
  columnCount: number;
  testId: string;
}

export const VurderingRows = ({ vurderinger, columnCount, testId }: Props) => {
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
