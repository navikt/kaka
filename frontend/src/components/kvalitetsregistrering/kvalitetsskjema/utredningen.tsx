import { Radio } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
// import { useFullfoerMutation } from '../../../redux-api/saksdata';
import { RadioValg } from '../../../types/kvalitetsvurdering';
import { Reason, Reasons } from './reasons';
import { FormSection, RadioButtonsRow, SubHeader } from './styled-components';

export const Utredningen = () => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  // const [, { isError, error, data }] = useFullfoerMutation();
  const canEdit = useCanEdit();

  // error?.data

  if (isLoading || typeof kvalitetsvurdering === 'undefined') {
    return <NavFrontendSpinner />;
  }

  const { id, utredningenRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = [
    {
      id: 'utredningenAvMedisinskeForhold',
      label: 'Utredningen av medisinske forhold',
      checked: kvalitetsvurdering.utredningenAvMedisinskeForhold,
      textareaId: 'utredningenAvMedisinskeForholdText',
    },
    {
      id: 'utredningenAvInntektsforhold',
      label: 'Utredningen av inntektsforhold',
      checked: kvalitetsvurdering.utredningenAvInntektsforhold,
      textareaId: 'utredningenAvInntektsforholdText',
    },
    {
      id: 'utredningenAvArbeid',
      label: 'Utredningen av arbeid',
      checked: kvalitetsvurdering.utredningenAvArbeid,
      textareaId: 'utredningenAvArbeidText',
    },
    {
      id: 'arbeidsrettetBrukeroppfoelging',
      label: 'Arbeidsrettet brukeroppfølging',
      checked: kvalitetsvurdering.arbeidsrettetBrukeroppfoelging,
      textareaId: 'arbeidsrettetBrukeroppfoelgingText',
    },
    {
      id: 'utredningenAvAndreAktuelleForholdISaken',
      label: 'Utredningen av andre aktuelle forhold i saken',
      checked: kvalitetsvurdering.utredningenAvAndreAktuelleForholdISaken,
      textareaId: 'utredningenAvAndreAktuelleForholdISakenText',
    },
    {
      id: 'utredningenAvEoesProblematikk',
      label: 'Utredningen av EØS / utenlandsproblematikk',
      checked: kvalitetsvurdering.utredningenAvEoesProblematikk,
      textareaId: 'utredningenAvEoesProblematikkText',
    },
    {
      id: 'veiledningFraNav',
      label: 'Veiledning fra NAV',
      checked: kvalitetsvurdering.veiledningFraNav,
      textareaId: 'veiledningFraNavText',
    },
  ];

  return (
    <FormSection>
      <SubHeader>Utredningen</SubHeader>
      <RadioButtonsRow>
        <Radio
          name={'UtredningenBra'}
          label={'Bra/godt nok'}
          onChange={() => updateKvalitetsvurdering({ id, utredningenRadioValg: RadioValg.BRA })}
          checked={utredningenRadioValg === RadioValg.BRA}
          disabled={!canEdit}
        />
        <Radio
          name={'UtredningenMangelfullt'}
          label={'Mangelfullt'}
          onChange={() => updateKvalitetsvurdering({ id, utredningenRadioValg: RadioValg.MANGELFULLT })}
          checked={utredningenRadioValg === RadioValg.MANGELFULLT}
          disabled={!canEdit}
        />
      </RadioButtonsRow>
      <Reasons
        show={utredningenRadioValg === RadioValg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </FormSection>
  );
};
