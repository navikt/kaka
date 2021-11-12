import { Datepicker, DatepickerChange } from 'nav-datovelger';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useSetMottattVedtaksinstansMutation } from '../../../redux-api/saksdata';
import { StyledItem, StyledLabelText } from './styled-components';

export const MottattVedtksinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const canEdit = useCanEdit();
  const [setMottattVedtaksinstans] = useSetMottattVedtaksinstansMutation();

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const onChange: DatepickerChange = (mottattVedtaksinstans) => {
    if (mottattVedtaksinstans !== null && mottattVedtaksinstans.length > 0) {
      setMottattVedtaksinstans({ id, mottattVedtaksinstans });
    }
  };

  return (
    <StyledItem>
      <label>
        <StyledLabelText>Mottatt vedtaksinstans:</StyledLabelText>
        <Datepicker
          disabled={!canEdit}
          onChange={onChange}
          limitations={{
            maxDate: new Date().toISOString(),
          }}
          value={saksdata.mottattVedtaksinstans ?? undefined}
          locale="nb"
          showYearSelector
        />
      </label>
    </StyledItem>
  );
};
