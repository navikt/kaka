import React from 'react';
import { isoDateTimeToPrettyDate } from '../../domain/date';
import { ISaksdataBase } from '../../types/saksdata';
import { Hjemmel } from '../common-table-components/hjemmel';
import { OpenKvalitetsregistrering } from '../common-table-components/open';
import { Tema } from '../common-table-components/tema';
import { Type } from '../common-table-components/type';
import { Utfall } from '../common-table-components/utfall';

export const Row = ({ id, sakstype, tema, hjemler, sakenGjelder, created, utfall }: ISaksdataBase): JSX.Element => (
  <tr data-testid="paabegynte-registreringer-row" data-klagebehandlingid={id}>
    <td>
      <Type type={sakstype ?? 'Ikke satt'} />
    </td>
    <td>
      <Tema tema={tema} />
    </td>
    <td>
      {hjemler.map((hjemmel) => (
        <Hjemmel key={hjemmel} hjemmel={hjemmel} />
      ))}
    </td>
    <td>{sakenGjelder}</td>
    <td>{isoDateTimeToPrettyDate(created)}</td>
    <td>
      <Utfall utfall={utfall} />
    </td>
    <td>
      <OpenKvalitetsregistrering id={id} />
    </td>
  </tr>
);
