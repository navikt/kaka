import { TextField } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { validateId } from '@app/domain/validate-id';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetSakenGjelderMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';

export const SakenGjelder = () => {
  const user = useUser();
  const id = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const [updateSakenGjelder] = useSetSakenGjelderMutation();
  const canEdit = useCanEdit();
  const initialValue = saksdata?.sakenGjelder ?? '';
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const validationError = useValidationError('sakenGjelder');

  useEffect(() => {
    if (typeof saksdata === 'undefined' || saksdata.sakenGjelder === value || value === initialValue) {
      return;
    }

    const timer = setTimeout(
      () => updateSakenGjelder({ sakenGjelder: value.replaceAll(' ', ''), id, saksbehandlerIdent: user.ident }),
      500,
    );

    return () => clearTimeout(timer);
  }, [value, updateSakenGjelder, id, user, saksdata, initialValue]);

  if (typeof saksdata === 'undefined') {
    return null;
  }

  return (
    <TextField
      id="sakenGjelder"
      disabled={!canEdit}
      size="medium"
      error={error ?? validationError}
      label="Saken gjelder"
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
  );
};
