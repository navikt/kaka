import { useCanEdit } from '@app/hooks/use-can-edit';
import { useEnheterForYtelse, useKlageenheterForYtelse, useYtelseParams } from '@app/hooks/use-kodeverk-value';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetVedtaksinstansenhetMutation } from '@app/redux-api/saksdata';
import type { IKodeverkSimpleValue } from '@app/types/kodeverk';
import type { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { SakstypeEnum } from '@app/types/sakstype';
import { Label, UNSAFE_Combobox } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { ErrorMessage } from '../../error-message/error-message';

export const FraVedtaksenhet = () => {
  const { data } = useSaksdata();

  if (data === undefined) {
    return null;
  }

  return <FraVedtaksenhetLoaded saksdata={data} />;
};

const FraVedtaksenhetLoaded = ({ saksdata }: { saksdata: ISaksdataComplete | ISaksdataIncomplete }) => {
  const saksdataId = useSaksdataId();
  const [setVedtaksenhet] = useSetVedtaksinstansenhetMutation();
  const canEdit = useCanEdit();
  const ytelseParams = useYtelseParams();
  const enheter = useEnheterForYtelse(ytelseParams); // Sakstype klage uses enheter
  const klageenheter = useKlageenheterForYtelse(ytelseParams); // Sakstype anke uses klageenheter
  const validationError = useValidationError('vedtaksinstansEnhet');
  const [localValue, setLocalValue] = useState<string | null>(saksdata.vedtaksinstansEnhet);

  useEffect(() => {
    if (localValue !== null && localValue !== saksdata.vedtaksinstansEnhet) {
      setVedtaksenhet({ id: saksdataId, vedtaksinstansEnhet: localValue });
    }
  }, [localValue, saksdata.vedtaksinstansEnhet, saksdataId, setVedtaksenhet]);

  const enhetOptions = useMemo(() => {
    if (saksdata.sakstypeId === SakstypeEnum.ANKE) {
      return klageenheter;
    }

    if (saksdata.sakstypeId === SakstypeEnum.KLAGE) {
      return enheter;
    }

    return [];
  }, [saksdata.sakstypeId, klageenheter, enheter]);

  const options = useMemo(
    () => enhetOptions.map(({ id, navn }) => ({ label: `${id} - ${navn}`, value: id })),
    [enhetOptions],
  );

  const selectedEnhetName = useEnhetName(enhetOptions, saksdata.vedtaksinstansEnhet);

  if (typeof saksdata === 'undefined') {
    return null;
  }

  if (!canEdit) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <SelectedEnhet data-testid="selected-vedtaksenhet" data-value={saksdata.vedtaksinstansEnhet}>
          {selectedEnhetName ?? 'Ingen enhet'}
        </SelectedEnhet>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  if (saksdata.ytelseId === null) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <SelectedEnhet data-testid="selected-vedtaksenhet">Velg ytelse</SelectedEnhet>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  const noEnheter = options.length === 0;

  if (noEnheter) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <SelectedEnhet data-testid="selected-vedtaksenhet">Ingen enheter</SelectedEnhet>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  const selected = localValue === null ? [] : options.filter((option) => option.value === localValue);

  return (
    <UNSAFE_Combobox
      label="Fra vedtaksenhet"
      options={options}
      shouldAutocomplete
      selectedOptions={selected}
      onToggleSelected={setLocalValue}
      data-testid="fra-vedtaksenhet-dropdown"
      error={validationError}
      onKeyDownCapture={(event) => {
        if (event.key === 'Backspace' && selected.length > 0) {
          setLocalValue(null);
        }
      }}
    />
  );
};

const useEnhetName = (options: IKodeverkSimpleValue[], enhetsNummer: string | null | undefined) =>
  useMemo(() => {
    if (typeof enhetsNummer !== 'string') {
      return 'Ingen enhet';
    }

    const enhet = options.find((option) => option.id === enhetsNummer);

    if (typeof enhet === 'undefined') {
      return 'Ingen enhet';
    }

    return `${enhet.id} - ${enhet.navn}`;
  }, [options, enhetsNummer]);

const SelectedEnhet = styled.section`
  position: relative;
  z-index: 5;
`;

const StyledLabel = styled(Label)`
  display: block;
`;
