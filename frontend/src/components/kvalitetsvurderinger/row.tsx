import { CopyButton, Table } from '@navikt/ds-react';
import React from 'react';
import { isoDateTimeToPrettyDate } from '@app/domain/date';
import { formatId } from '@app/functions/format-id';
import { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { OpenKvalitetsvurdering } from '../common-table-components/open';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';
import { Ytelse } from '../common-table-components/ytelse';

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
  kvalitetsvurderingReference,
}: Props & (ISaksdataIncomplete | ISaksdataComplete)): JSX.Element => (
  <Table.Row data-testid={`${testId}-row`} data-saksdata-id={id}>
    <Table.DataCell>
      <Type type={sakstypeId} />
    </Table.DataCell>
    <Table.DataCell>
      <Ytelse ytelseId={ytelseId} ytelserVersion={kvalitetsvurderingReference.version} />
    </Table.DataCell>
    <Table.DataCell>
      {sakenGjelder === null ? null : (
        <CopyButton size="small" variant="neutral" copyText={sakenGjelder} text={formatId(sakenGjelder)} />
      )}
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
