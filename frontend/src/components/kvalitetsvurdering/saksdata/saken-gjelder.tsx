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
  const [value, setValue] = useState<string>(saksdata?.sakenGjelder ?? '');
  const [error, setError] = useState<string | null>(null);
  const validationError = useValidationError('sakenGjelder');

  const validate = useCallback(
    (inputValue: string) => {
      if (typeof user === 'undefined') {
        return;
      }

      const containsDigitsOnly = digitsOnly(inputValue);

      if (!containsDigitsOnly) {
        setError('Personnr eller orgnr kan kun bestå av siffer');
        return;
      }

      const hasCorrectLength = correctLength(inputValue);

      if (!hasCorrectLength) {
        setError('Personnr må bestå av 11 tegn. Orgnr må bestå av 9 tegn.');
        return;
      }

      setError(null);
    },
    [setError, user]
  );

  const checkNoError = useCallback(
    (inputValue: string) => {
      if (digitsOnly(inputValue) && correctLength(inputValue)) {
        setError(null);
      }
    },
    [setError]
  );

  useEffect(() => {
    if (typeof user === 'undefined' || typeof saksdata === 'undefined' || saksdata.sakenGjelder === value) {
      return;
    }

    const timer = setTimeout(
      () => updateSakenGjelder({ sakenGjelder: value, id, saksbehandlerIdent: user.ident }),
      500
    );
    return () => clearTimeout(timer);
  }, [value, updateSakenGjelder, id, user, saksdata]);

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
        onChange={({ target }) => {
          setValue(target.value);
          checkNoError(target.value);
        }}
        onBlur={() => validate(value)}
        placeholder="Personnr eller orgnr"
        maxLength={11}
        data-testid="saken-gjelder"
      />
    </StyledItem>
  );
};
