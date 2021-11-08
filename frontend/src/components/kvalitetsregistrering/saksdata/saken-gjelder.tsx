import { Input } from 'nav-frontend-skjema';
import React, { useCallback, useEffect, useState } from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetSakenGjelderMutation } from '../../../redux-api/saksdata';
import { StyledItem } from './styled-components';

const correctLength = (value: string) => value.length === 9 || value.length === 11;
const digitsOnly = (value: string) => /^\d+$/.test(value);

export const SakenGjelder = () => {
  const { data: user } = useGetUserDataQuery();
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [updateSakenGjelder] = useSetSakenGjelderMutation();
  const canEdit = useCanEdit();
  const [value, setValue] = useState<string | null>(saksdata?.sakenGjelder ?? null);
  const [error, setError] = useState<string | null>(null);
  const validationError = useValidationError('sakenGjelder');

  const save = useCallback(
    (inputValue: string | null) => {
      if (inputValue === null || typeof user === 'undefined') {
        return;
      }

      const hasCorrectLength = correctLength(inputValue);
      const containsDigitsOnly = digitsOnly(inputValue);

      if (!containsDigitsOnly) {
        setError('Personnr eller orgnr kan kun bestå av siffer');
        return;
      }

      if (!hasCorrectLength) {
        setError('Personnr må bestå av 11 tegn. Orgnr må bestå av 9 tegn.');
        return;
      }

      setError(null);
      updateSakenGjelder({ sakenGjelder: inputValue, id, saksbehandlerIdent: user.ident });
    },
    [setError, updateSakenGjelder, id, user]
  );

  useEffect(() => {
    const timer = setTimeout(() => save(value), 500);
    return () => clearTimeout(timer);
  }, [value, save]);

  if (typeof saksdata === 'undefined') {
    return null;
  }

  return (
    <StyledItem>
      <Input
        disabled={!canEdit}
        bredde="M"
        feil={error ?? validationError}
        label="Saken gjelder:"
        value={value ?? ''}
        onChange={({ target }) => setValue(target.value)}
        placeholder="Personnr eller orgnr"
        maxLength={11}
      />
    </StyledItem>
  );
};
