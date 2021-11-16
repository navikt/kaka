import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValg } from '../../../types/kvalitetsvurdering';
import { Reason, Reasons } from './reasons';
import { FormSection, RadioButtonsRow, SubHeader } from './styled-components';

export const Klageforberedelsen = () => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('klageforberedelsenRadioValg');

  if (isLoading || typeof kvalitetsvurdering === 'undefined') {
    return <NavFrontendSpinner />;
  }

  const { id, klageforberedelsenRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = [
    {
      id: 'sakensDokumenter',
      label: 'Sakens dokumenter',
      checked: kvalitetsvurdering.sakensDokumenter,
    },
    {
      id: 'oversittetKlagefristIkkeKommentert',
      label: 'Oversittet klagefrist er ikke kommentert',
      checked: kvalitetsvurdering.oversittetKlagefristIkkeKommentert,
    },
    {
      id: 'klagerensRelevanteAnfoerslerIkkeKommentert',
      label: 'Klagerens relevante anførseler er ikke tilstrekkelig kommentert/imøtegått',
      checked: kvalitetsvurdering.klagerensRelevanteAnfoerslerIkkeKommentert,
    },
    {
      id: 'begrunnelseForHvorforAvslagOpprettholdes',
      label: 'Begrunnelse for hvorfor avslag opprettholdes / klager ikke oppfyller villkår',
      checked: kvalitetsvurdering.begrunnelseForHvorforAvslagOpprettholdes,
    },
    {
      id: 'konklusjonen',
      label: 'Konklusjonen',
      checked: kvalitetsvurdering.konklusjonen,
    },
    {
      id: 'oversendelsesbrevetsInnholdIkkeISamsvarMedTema',
      label: 'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
      checked: kvalitetsvurdering.oversendelsesbrevetsInnholdIkkeISamsvarMedTema,
    },
  ];

  return (
    <FormSection>
      <SubHeader>Klageforberedelsen</SubHeader>
      <RadioGruppe
        feil={klageforberedelsenRadioValg === null ? validationError : undefined}
        data-testid="klageforberedelsen-radio-group"
      >
        <RadioButtonsRow>
          <Radio
            name={'KlageforberedelsenBra'}
            label={'Bra/godt nok'}
            onChange={() => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: RadioValg.BRA })}
            checked={klageforberedelsenRadioValg === RadioValg.BRA}
            disabled={!canEdit}
            data-testid="klageforberedelsen-radio-good"
          />
          <Radio
            name={'KlageforberedelsenMangelfullt'}
            label={'Mangelfullt'}
            onChange={() => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: RadioValg.MANGELFULLT })}
            checked={klageforberedelsenRadioValg === RadioValg.MANGELFULLT}
            disabled={!canEdit}
            data-testid="klageforberedelsen-radio-bad"
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
