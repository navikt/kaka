import { ContainerWithHelpText } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/container-with-helptext';
import {
  RadioButtonsRow,
  StyledHeading,
  StyledRadioGroup,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/styled-components';
import { useIsRolYtelse } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/use-is-rol-ytelse';
import { Checkboxes } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/checkboxes';
import type { CheckboxParams } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/types';
import { useKvalitetsvurderingV3 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/use-kvalitetsvurdering-v3';
import { useValidationError } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/use-validation-error';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/helpers';
import {
  HEADER,
  TRYGDEMEDISIN_RADIO_HELP_TEXTS,
  TrygdemedisinBoolean,
  TrygdemedisinErrorFields,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import { Radio } from '@navikt/ds-react';

export const Trygdemedisin = () => {
  const { isLoading, kvalitetsvurdering, update, saksdata } = useKvalitetsvurderingV3();
  const show = useIsRolYtelse(saksdata?.ytelseId);

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Trygdemedisin);

  if (!show || isLoading) {
    return null;
  }

  const { brukAvRaadgivendeLege } = kvalitetsvurdering;

  const onChange = (value: RadiovalgExtended) => update({ brukAvRaadgivendeLege: value });

  return (
    <section>
      <StyledHeading size="small">{HEADER}</StyledHeading>
      <StyledRadioGroup
        legend={HEADER}
        hideLegend
        value={brukAvRaadgivendeLege}
        error={validationError}
        onChange={onChange}
        id="trygdemedisin"
      >
        <RadioButtonsRow>
          <ContainerWithHelpText helpText={TRYGDEMEDISIN_RADIO_HELP_TEXTS[RadiovalgExtended.IKKE_AKTUELT]}>
            <Radio value={RadiovalgExtended.IKKE_AKTUELT} disabled={!canEdit}>
              Ikke aktuelt for den konkrete saken
            </Radio>
          </ContainerWithHelpText>

          <ContainerWithHelpText helpText={TRYGDEMEDISIN_RADIO_HELP_TEXTS[RadiovalgExtended.BRA]}>
            <Radio value={RadiovalgExtended.BRA} disabled={!canEdit}>
              Riktig / ikke kvalitetsavvik
            </Radio>
          </ContainerWithHelpText>

          <Radio value={RadiovalgExtended.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt/kvalitetsavvik
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {brukAvRaadgivendeLege === RadiovalgExtended.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          childList={TRYGDEMEDISIN_CHECKBOXES}
          update={update}
          groupErrorField={TrygdemedisinErrorFields.brukAvRaadgivendeLegeGroup}
          label="Hva er mangelfullt/kvalitetsavviket?"
        />
      ) : null}
    </section>
  );
};

export const TRYGDEMEDISIN_CHECKBOXES: CheckboxParams[] = [
  getCheckbox({ field: TrygdemedisinBoolean.raadgivendeLegeIkkebrukt }),
  getCheckbox({ field: TrygdemedisinBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege }),
  getCheckbox({ field: TrygdemedisinBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin }),
  getCheckbox({ field: TrygdemedisinBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert }),
];
