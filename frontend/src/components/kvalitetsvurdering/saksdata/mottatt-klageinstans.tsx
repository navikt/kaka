import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetMottattKlageinstansMutation } from '@app/redux-api/saksdata';
import { parse, subDays } from 'date-fns';
import { DatepickerWithValidation } from '../../date-picker/date-picker';
import { CENTURY_NUMBER } from '../../filters/date-presets/constants';

export const MottattKlageinstans = () => {
  const id = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const [setMottattKlageinstans] = useSetMottattKlageinstansMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('mottattKlageinstans');

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const fromDate =
    saksdata.mottattVedtaksinstans === null
      ? undefined
      : parse(saksdata.mottattVedtaksinstans, 'yyyy-MM-dd', new Date());

  return (
    <DatepickerWithValidation
      label="Mottatt klageinstans"
      disabled={!canEdit}
      onChange={(mottattKlageinstans) => setMottattKlageinstans({ id, mottattKlageinstans })}
      toDate={new Date()}
      fromDate={fromDate}
      value={saksdata.mottattKlageinstans}
      error={validationError}
      id="mottattKlageinstans"
      size="medium"
      centuryThreshold={CENTURY_NUMBER}
      warningThreshhold={subDays(new Date(), 360)}
    />
  );
};
