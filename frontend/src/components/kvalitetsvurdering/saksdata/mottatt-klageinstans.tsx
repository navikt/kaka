import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetMottattKlageinstansMutation } from '../../../redux-api/saksdata';
import { DateTimePickerProps, DatepickerWithError } from '../../date-picker-with-error/date-picker-with-error';
import { StyledItem } from './styled-components';

export const MottattKlageinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setMottattKlageinstans] = useSetMottattKlageinstansMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('mottattKlageinstans');

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const onChange: DateTimePickerProps['onChange'] = (mottattKlageinstans) => {
    setMottattKlageinstans({ id, mottattKlageinstans });
  };

  return (
    <StyledItem>
      <DatepickerWithError
        label="Mottatt klageinstans:"
        disabled={!canEdit}
        onChange={onChange}
        limitations={{
          maxDate: new Date().toISOString(),
        }}
        value={saksdata.mottattKlageinstans ?? undefined}
        locale="nb"
        showYearSelector
        error={validationError}
        data-testid="mottatt-klageinstans"
      />
    </StyledItem>
  );
};
