import { Input } from 'nav-frontend-skjema';
import React, { useEffect, useState } from 'react';
import { validateId } from '../../../domain/validate-id';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetSakenGjelderMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { StyledItem } from './styled-components';

export const SakenGjelder = () => {
  const { data: user } = useUser();
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [updateSakenGjelder] = useSetSakenGjelderMutation();
  const canEdit = useCanEdit();
  const [value, setValue] = useState<string>(saksdata?.sakenGjelder ?? '');
  const [error, setError] = useState<string | null>(null);
  const validationError = useValidationError('sakenGjelder');

  useEffect(() => {
    if (typeof user === 'undefined' || typeof saksdata === 'undefined' || saksdata.sakenGjelder === value) {
      return;
    }

    const timer = setTimeout(
      () => updateSakenGjelder({ sakenGjelder: value.replaceAll(' ', ''), id, saksbehandlerIdent: user.ident }),
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
        value={value}
        onChange={({ target }) => {
          setValue(target.value);

          if (validateId(target.value) === null) {
            setError(null);
          }
        }}
        onBlur={({ target }) => setError(validateId(target.value))}
        placeholder="Fnr. eller orgnr."
        minLength={9}
        pattern="[\d\s]{9,}"
        data-testid="saken-gjelder"
      />
    </StyledItem>
  );
};
