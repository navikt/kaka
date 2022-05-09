import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValg } from '../../../types/radio';
import { SakstypeEnum } from '../../../types/sakstype';
import { Reason, Reasons } from './reasons';
import { klageforberedelsenReasons } from './reasons-labels';
import { FormSection, RadioButtonsRow, StyledHeaderHelpTextWrapper, SubHeader } from './styled-components';

export const Klageforberedelsen = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [saksdata] = useSaksdata();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('klageforberedelsenRadioValg');
  const header = useFieldName('klageforberedelsenRadioValg');

  if (
    typeof kvalitetsvurdering === 'undefined' ||
    typeof saksdata === 'undefined' ||
    saksdata.sakstypeId === SakstypeEnum.ANKE
  ) {
    return null;
  }

  const { id, klageforberedelsenRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = klageforberedelsenReasons.map((reason) => ({
    ...reason,
    checked: kvalitetsvurdering[reason.id],
  }));

  return (
    <FormSection>
      <StyledHeaderHelpTextWrapper>
        <SubHeader>{header}</SubHeader>
        <Hjelpetekst>
          Vedtaksinstansen skal gjøre en ny prøving av eget vedtak, vise klagers argumenter og begrunne hvorfor vedtaket
          blir fastholdt.
        </Hjelpetekst>
      </StyledHeaderHelpTextWrapper>
      <RadioGruppe feil={klageforberedelsenRadioValg === null ? validationError : undefined}>
        <RadioButtonsRow>
          <Radio
            name="KlageforberedelsenBra"
            label="Bra/godt nok"
            onChange={() => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: RadioValg.BRA })}
            checked={klageforberedelsenRadioValg === RadioValg.BRA}
            disabled={!canEdit}
          />
          <Radio
            name="KlageforberedelsenMangelfullt"
            label="Mangelfullt"
            onChange={() => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: RadioValg.MANGELFULLT })}
            checked={klageforberedelsenRadioValg === RadioValg.MANGELFULLT}
            disabled={!canEdit}
          />
        </RadioButtonsRow>
      </RadioGruppe>
      <Reasons
        show={klageforberedelsenRadioValg === RadioValg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
        error={validationError}
      />
    </FormSection>
  );
};
