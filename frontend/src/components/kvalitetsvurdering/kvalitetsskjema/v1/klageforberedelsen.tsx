import { HelpText, Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useFieldName } from '../../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../../hooks/use-kvalitetsvurdering';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import { useValidationError } from '../../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../../redux-api/kvalitetsvurdering/v1';
import { Radiovalg } from '../../../../types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '../../../../types/sakstype';
import { Reasons } from './reasons';
import { klageforberedelsenReasons } from './reasons-labels';
import { RadioButtonsRow, StyledHeading } from './styled-components';
import { Reason } from './types';

export const Klageforberedelsen = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const { data: saksdata } = useSaksdata();
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

  const onChange = (value: Radiovalg) => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: value });
  const error = klageforberedelsenRadioValg === null ? validationError : undefined;

  return (
    <section>
      <StyledHeading size="small">
        {header}
        <HelpText placement="right">
          Vedtaksinstansen skal gjøre en ny prøving av eget vedtak, vise klagers argumenter og begrunne hvorfor vedtaket
          blir fastholdt.
        </HelpText>
      </StyledHeading>

      <RadioGroup
        legend={header}
        hideLegend
        value={klageforberedelsenRadioValg}
        error={error}
        onChange={onChange}
        id="klageforberedelsenRadioValg"
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Bra/godt nok
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </RadioGroup>

      <Reasons
        show={klageforberedelsenRadioValg === Radiovalg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
        error={validationError}
      />
    </section>
  );
};
