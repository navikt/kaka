import { BodyShort, Label, Select } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSimpleYtelserForKlageenhet } from '@app/hooks/use-kodeverk-value';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetYtelseMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { EmptyOption } from './empty-option';

export const Ytelse = () => {
  const { data: user } = useUser();
  const saksId = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const [setYtelse] = useSetYtelseMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('ytelseId');
  const ytelser = useSimpleYtelserForKlageenhet(saksdata?.tilknyttetEnhet ?? skipToken);

  if (typeof saksdata === 'undefined' || typeof user === 'undefined') {
    return null;
  }

  if (!canEdit) {
    const ytelse = ytelser.find(({ id }) => id === saksdata.ytelseId);

    return (
      <div data-testid="selected-ytelse">
        <Label>Ytelse</Label>
        <BodyShort data-testid={`selected-ytelse-${ytelse?.id ?? 'NO_YTELSE'}`}>
          {ytelse?.navn ?? 'Ingen ytelse'}
        </BodyShort>
      </div>
    );
  }

  const options = ytelser?.map(({ id, navn }) => (
    <option value={id} key={id}>
      {navn}
    </option>
  ));

  const onChange = (selected: string) => {
    const ytelseId = selected.length === 0 ? null : selected;
    setYtelse({ id: saksId, ytelseId, saksbehandlerIdent: user.ident });
  };

  return (
    <Select
      id="ytelseId"
      error={validationError}
      label="Ytelse"
      onChange={({ target }) => onChange(target.value)}
      disabled={!canEdit}
      size="medium"
      value={saksdata.ytelseId ?? ''}
      data-testid="ytelse-select"
    >
      <EmptyOption show={saksdata.ytelseId === null} />
      {options}
    </Select>
  );
};
