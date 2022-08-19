import { HelpText } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetMottattVedtaksinstansMutation } from '../../../redux-api/saksdata';
import { SakstypeEnum } from '../../../types/sakstype';
import { DatepickerWithValidation } from '../../date-picker/date-picker';

export const MottattVedtaksinstans = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const canEdit = useCanEdit();
  const [setMottattVedtaksinstans] = useSetMottattVedtaksinstansMutation();
  const validationError = useValidationError('mottattVedtaksinstans');

  if (typeof saksdata === 'undefined' || saksdata.sakstypeId === SakstypeEnum.ANKE) {
    return null;
  }

  return (
    <DatepickerWithValidation
      label={
        <StyledLabel>
          Mottatt vedtaksinstans
          <HelpText title="Hvor viktig er dette?" placement="right">
            Kaka gir ingen offisiell statistikk på saksbehandlingstiden. Det skal derfor ikke tas en større vurdering av
            hva korrekt dato er. Benytt gjerne journalføringsdatoen.
          </HelpText>
        </StyledLabel>
      }
      disabled={!canEdit}
      onChange={(mottattVedtaksinstans) => {
        setMottattVedtaksinstans({ id, mottattVedtaksinstans });
      }}
      limitations={{
        maxDate: new Date().toISOString(),
      }}
      value={saksdata.mottattVedtaksinstans ?? undefined}
      locale="nb"
      showYearSelector
      error={validationError}
      data-testid="mottattVedtaksinstans"
      inputName="mottattVedtaksinstans"
      id="mottattVedtaksinstans"
      size="medium"
    />
  );
};

const StyledLabel = styled.span`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;
