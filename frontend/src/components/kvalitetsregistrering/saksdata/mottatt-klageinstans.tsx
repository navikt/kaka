import { Datepicker, DatepickerChange } from 'nav-datovelger';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useSetMottattKlageinstansMutation } from '../../../redux-api/saksdata';
import { StyledItem, StyledLabelText } from './styled-components';

export const MottattKlageinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setMottatKlageinstans] = useSetMottattKlageinstansMutation();
  const canEdit = useCanEdit();

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const onChange: DatepickerChange = (mottattKlageinstans) => {
    if (mottattKlageinstans !== null && mottattKlageinstans.length > 0) {
      setMottatKlageinstans({ id, mottattKlageinstans });
    }
  };

  return (
    <StyledItem>
      <label>
        <StyledLabelText>Mottatt klageinstans:</StyledLabelText>
        <Datepicker
          onChange={onChange}
          value={saksdata.mottattKlageinstans ?? undefined}
          locale="nb"
          showYearSelector
          disabled={!canEdit}
        />
      </label>
    </StyledItem>
  );
};
