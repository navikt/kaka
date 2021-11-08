import React from 'react';
import { isoDateTimeToPrettyDate } from '../../domain/date';
import { formatSakenGjelder } from '../../functions/format-id';
import { ISaksdataBase } from '../../types/saksdata';
import { OpenKvalitetsregistrering } from '../common-table-components/open';
import { Tema } from '../common-table-components/tema';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';

export const Row = ({ id, sakstype, tema, sakenGjelder, modified, utfall }: ISaksdataBase): JSX.Element => (
  <tr data-testid="paabegynte-registreringer-row" data-klagebehandlingid={id}>
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
