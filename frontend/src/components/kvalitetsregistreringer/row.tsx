import React from 'react';
import { isoDateTimeToPrettyDate } from '../../domain/date';
import { formatSakenGjelder } from '../../functions/format-id';
import { ISaksdataBase } from '../../types/saksdata';
import { OpenKvalitetsregistrering } from '../common-table-components/open';
import { Tema } from '../common-table-components/tema';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';

interface Props extends ISaksdataBase {
  testId?: string;
}

export const Row = ({ id, sakstype, tema, sakenGjelder, modified, utfall, testId }: Props): JSX.Element => (
  <tr data-testid={`${testId}-row`} data-saksdata-id={id}>
    <td>
      <Type type={sakstype} />
    </td>
    <td>
      <Tema tema={tema} />
    </td>
    <td>{formatSakenGjelder(sakenGjelder)}</td>
    <td>{isoDateTimeToPrettyDate(modified)}</td>
    <td>
      <Utfall utfall={utfall} />
    </td>
    <td>
      <OpenKvalitetsregistrering id={id} />
    </td>
  </tr>
);
