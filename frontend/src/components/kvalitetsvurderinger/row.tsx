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
  <tr data-testid={`${testId}-row`} data-saksdata-id={id}>
    <td>
      <Type type={sakstypeId} />
    </td>
    <td>
      <Ytelse ytelseId={ytelseId} />
    </td>
    <td>
      <CopyButton text={sakenGjelder}>{formatId(sakenGjelder)}</CopyButton>
    </td>
    <td>{isoDateTimeToPrettyDate(modified)}</td>
    <td>
      <Utfall utfall={utfallId} />
    </td>
    <td>
      <OpenKvalitetsvurdering id={id} />
    </td>
  </tr>
);
