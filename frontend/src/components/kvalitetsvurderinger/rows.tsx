import type { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { Table } from '@navikt/ds-react';
import { RowLoader } from '../loader/row-loader';
import { Row } from './row';

interface Props {
  vurderinger?: (ISaksdataIncomplete | ISaksdataComplete)[];
  columnCount: number;
}

export const VurderingRows = ({ vurderinger, columnCount }: Props) => {
  if (typeof vurderinger === 'undefined') {
    return (
      <Table.Body>
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
      <Table.Body>
        <Table.Row>
          <Table.DataCell colSpan={columnCount}>Ingen kvalitetsvurderinger</Table.DataCell>
        </Table.Row>
      </Table.Body>
    );
  }

  return (
    <Table.Body>
      {vurderinger.map((k) => (
        <Row {...k} key={k.id} />
      ))}
    </Table.Body>
  );
};
