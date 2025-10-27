import { useIsRolYtelse } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/use-is-rol-ytelse';
import {
  BrukAvRaadgivendeOverlegeBoolean,
  BrukAvRaadgivendeOverlegeErrorFields,
  HEADER,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/helpers';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import { Radio } from '@navikt/ds-react';
import { ContainerWithHelpText } from '../../common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../../common/styled-components';
import { Checkboxes } from '../common/checkboxes';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

export const BrukAvRaadgivendeLege = () => {
  const { isLoading, kvalitetsvurdering, update, saksdata } = useKvalitetsvurderingV2();
  const show = useIsRolYtelse(saksdata?.ytelseId);

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.BrukAvRaadgivendeLege);

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
        id="brukAvRaadgivendeLege"
      >
        <RadioButtonsRow>
          <ContainerWithHelpText helpText="Du registrerer her dersom den konkrete saken ikke gjelder trygdemedisinske spørsmål.">
            <Radio value={RadiovalgExtended.IKKE_AKTUELT} disabled={!canEdit}>
              Ikke aktuelt for den konkrete saken
            </Radio>
          </ContainerWithHelpText>

          <ContainerWithHelpText helpText="Du registrerer her om den konkrete saken gjelder trygdemedisinske spørsmål og det er ok at rådgivende lege ikke er brukt, eller bruken av rådgivende lege er god nok.">
            <Radio value={RadiovalgExtended.BRA} disabled={!canEdit}>
              Bra/godt nok
            </Radio>
          </ContainerWithHelpText>

          <Radio value={RadiovalgExtended.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {brukAvRaadgivendeLege === RadiovalgExtended.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          childList={CHECKBOXES}
          update={update}
          groupErrorField={BrukAvRaadgivendeOverlegeErrorFields.brukAvRaadgivendeLegeGroup}
          label="Hva er mangelfullt?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  getCheckbox({ field: BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt }),
  getCheckbox({ field: BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege }),
  getCheckbox({ field: BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin }),
  getCheckbox({ field: BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert }),
];
