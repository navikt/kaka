import { Table } from '@navikt/ds-react';
import React from 'react';
import { isoDateTimeToPrettyDate } from '../../domain/date';
import { formatId } from '../../functions/format-id';
import { ISaksdataCompleteSearchHit, ISaksdataIncompleteSearchHit } from '../../types/saksdata';
import { OpenKvalitetsvurdering } from '../common-table-components/open';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';
import { Ytelse } from '../common-table-components/ytelse';
import { CopyButton } from '../copy-button/copy-button';

// ISaksdataComplete | ISaksdataIncomplete
interface Props {
  testId: string;
}

export const Row = ({
  id,
  sakstypeId,
  ytelseId,
  sakenGjelder,
  modified,
  utfallId,
  testId,
}: Props & (ISaksdataIncompleteSearchHit | ISaksdataCompleteSearchHit)): JSX.Element => (
  <Table.Row data-testid={`${testId}-row`} data-saksdata-id={id}>
    <Table.DataCell>
      <Type type={sakstypeId} />
    </Table.DataCell>
    <Table.DataCell>
      <Ytelse ytelseId={ytelseId} />
    </Table.DataCell>
    <Table.DataCell>
      <CopyButton text={sakenGjelder}>{formatId(sakenGjelder)}</CopyButton>
    </Table.DataCell>
    <Table.DataCell>{isoDateTimeToPrettyDate(modified)}</Table.DataCell>
    <Table.DataCell>
      <Utfall utfall={utfallId} />
    </Table.DataCell>
    <Table.DataCell>
      <OpenKvalitetsvurdering id={id} />
    </Table.DataCell>
  </Table.Row>
);
