import { DatepickerChange } from 'nav-datovelger';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetMottattVedtaksinstansMutation } from '../../../redux-api/saksdata';
import { SakstypeEnum } from '../../../types/sakstype';
import { DatepickerWithError } from '../../date-picker-with-error/date-picker-with-error';
import { StyledItem } from './styled-components';

export const MottattVedtksinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const canEdit = useCanEdit();
  const [setMottattVedtaksinstans] = useSetMottattVedtaksinstansMutation();
  const validationError = useValidationError('mottattVedtaksinstans');

  if (typeof saksdata === 'undefined' || saksdata.sakstypeId === SakstypeEnum.ANKE) {
    return null;
  }

  const onChange: DatepickerChange = (mottattVedtaksinstans) => {
    if (mottattVedtaksinstans !== null && mottattVedtaksinstans.length > 0) {
      setMottattVedtaksinstans({ id, mottattVedtaksinstans });
    }
  };

  return (
    <StyledItem>
      <DatepickerWithError
        label="Mottatt vedtaksinstans:"
        disabled={!canEdit}
        onChange={onChange}
        limitations={{
          maxDate: new Date().toISOString(),
        }}
        value={saksdata.mottattVedtaksinstans ?? undefined}
        locale="nb"
        showYearSelector
        error={validationError}
        data-testid="mottatt-vedtaksinstans"
      />
    </StyledItem>
  );
};
