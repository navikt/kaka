import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValg } from '../../../types/kvalitetsvurdering';
import { SakstypeEnum } from '../../../types/sakstype';
import { Reason, Reasons } from './reasons';
import { FormSection, RadioButtonsRow, SubHeader } from './styled-components';

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
      <SubHeader>{header}</SubHeader>
      <RadioGruppe feil={klageforberedelsenRadioValg === null ? validationError : undefined}>
        <RadioButtonsRow>
          <Radio
            name={'KlageforberedelsenBra'}
            label={'Bra/godt nok'}
            onChange={() => updateKvalitetsvurdering({ id, klageforberedelsenRadioValg: RadioValg.BRA })}
            checked={klageforberedelsenRadioValg === RadioValg.BRA}
            disabled={!canEdit}
          />
          <Radio
            name={'KlageforberedelsenMangelfullt'}
            label={'Mangelfullt'}
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
