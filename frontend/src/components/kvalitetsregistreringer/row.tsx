import React from 'react';
import { isoDateTimeToPrettyDate } from '../../domain/date';
import { formatSakenGjelder } from '../../functions/format-id';
import { ISaksdataBase } from '../../types/saksdata';
import { OpenKvalitetsregistrering } from '../common-table-components/open';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';
import { Ytelse } from '../common-table-components/ytelse';

interface Props extends ISaksdataBase {
  testId: string;
}

export const Row = ({ id, sakstypeId, ytelseId, sakenGjelder, modified, utfallId, testId }: Props): JSX.Element => (
  <tr data-testid={`${testId}-row`} data-saksdata-id={id}>
    <td>
      <Type type={sakstypeId} />
    </td>
    <td>
      <Ytelse ytelseId={ytelseId} />
    </td>
    <td>{formatSakenGjelder(sakenGjelder)}</td>
    <td>{isoDateTimeToPrettyDate(modified)}</td>
    <td>
      <Utfall utfall={utfallId} />
    </td>
    <td>
      <OpenKvalitetsregistrering id={id} />
    </td>
  </tr>
);
