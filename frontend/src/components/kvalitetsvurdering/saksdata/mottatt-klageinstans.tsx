import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetMottattKlageinstansMutation } from '../../../redux-api/saksdata';
import { DatepickerWithValidation } from '../../date-picker/date-picker';

export const MottattKlageinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setMottattKlageinstans] = useSetMottattKlageinstansMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('mottattKlageinstans');

  if (typeof saksdata === 'undefined') {
    return null;
  }

  return (
    <DatepickerWithValidation
      label="Mottatt klageinstans"
      disabled={!canEdit}
      onChange={(mottattKlageinstans) => {
        setMottattKlageinstans({ id, mottattKlageinstans });
      }}
      limitations={{
        maxDate: new Date().toISOString(),
      }}
      value={saksdata.mottattKlageinstans ?? undefined}
      locale="nb"
      showYearSelector
      error={validationError}
      data-testid="mottattKlageinstans"
      inputName="mottattKlageinstans"
      id="mottattKlageinstans"
      size="medium"
    />
  );
};
