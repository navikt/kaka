import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetMottattVedtaksinstansMutation } from '@app/redux-api/saksdata';
import { SakstypeEnum } from '@app/types/sakstype';
import { HelpText } from '@navikt/ds-react';
import { parse, subDays } from 'date-fns';
import { styled } from 'styled-components';
import { DatepickerWithValidation } from '../../date-picker/date-picker';
import { CENTURY_NUMBER } from '../../filters/date-presets/constants';

export const MottattVedtaksinstans = () => {
  const id = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const canEdit = useCanEdit();
  const [setMottattVedtaksinstans] = useSetMottattVedtaksinstansMutation();
  const validationError = useValidationError('mottattVedtaksinstans');

  if (typeof saksdata === 'undefined' || saksdata.sakstypeId === SakstypeEnum.ANKE) {
    return null;
  }

  const toDate =
    saksdata.mottattKlageinstans === null ? undefined : parse(saksdata.mottattKlageinstans, 'yyyy-MM-dd', new Date());

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
      onChange={(mottattVedtaksinstans) => setMottattVedtaksinstans({ id, mottattVedtaksinstans })}
      value={saksdata.mottattVedtaksinstans}
      toDate={toDate}
      error={validationError}
      id="mottattVedtaksinstans"
      size="medium"
      centuryThreshold={CENTURY_NUMBER}
      warningThreshhold={subDays(new Date(), 360)}
    />
  );
};

const StyledLabel = styled.span`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;
