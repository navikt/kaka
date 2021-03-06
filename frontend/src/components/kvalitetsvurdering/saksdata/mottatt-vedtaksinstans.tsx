import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetMottattVedtaksinstansMutation } from '../../../redux-api/saksdata';
import { SakstypeEnum } from '../../../types/sakstype';
import { DateTimePickerProps, DatepickerWithError } from '../../date-picker-with-error/date-picker-with-error';
import { StyledItem } from './styled-components';

export const MottattVedtaksinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const canEdit = useCanEdit();
  const [setMottattVedtaksinstans] = useSetMottattVedtaksinstansMutation();
  const validationError = useValidationError('mottattVedtaksinstans');

  if (typeof saksdata === 'undefined' || saksdata.sakstypeId === SakstypeEnum.ANKE) {
    return null;
  }

  const onChange: DateTimePickerProps['onChange'] = (mottattVedtaksinstans) => {
    setMottattVedtaksinstans({ id, mottattVedtaksinstans });
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
        helpText="Kaka gir ingen offisiell statistikk på saksbehandlingstiden. Det skal derfor ikke tas en større vurdering av hva korrekt dato er. Benytt gjerne journalføringsdatoen."
      />
    </StyledItem>
  );
};
