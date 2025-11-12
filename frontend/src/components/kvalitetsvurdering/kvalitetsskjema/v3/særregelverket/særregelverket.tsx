import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/helpers';
import {
  HEADER,
  SÆRREGELVERKET_LABELS,
  SærregelverketBoolean,
  SærregelverketErrorFields,
  SærregelverketHjemlerFromYtelseList,
  SærregelverketSaksdataHjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Alert, Checkbox, Radio } from '@navikt/ds-react';
import { ContainerWithHelpText } from '../../common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../../common/styled-components';
import { Checkboxes } from '../common/checkboxes';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV3 } from '../common/use-kvalitetsvurdering-v3';
import { useValidationError } from '../common/use-validation-error';

const vedtaketAutomatiskVedtakhelpText =
  'Du skal gjøre de samme kvalitetsvurderingene for automatiske vedtak som for andre vedtak. Du kan krysse av for automatisk vedtak dersom det er tydelig merket i vedtaket.';

export const Særregelverket = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV3();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Særregelverket);

  if (isLoading) {
    return null;
  }

  const { saerregelverkAutomatiskVedtak, saerregelverk } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ saerregelverk: value });

  return (
    <section>
      <StyledHeading size="small">{HEADER}</StyledHeading>

      {saerregelverkAutomatiskVedtak === true ? <Alert variant="info">{vedtaketAutomatiskVedtakhelpText}</Alert> : null}
      <ContainerWithHelpText helpText={vedtaketAutomatiskVedtakhelpText}>
        <Checkbox
          value={SærregelverketBoolean.saerregelverkAutomatiskVedtak}
          checked={saerregelverkAutomatiskVedtak}
          onChange={({ target }) => update({ saerregelverkAutomatiskVedtak: target.checked })}
          disabled={!canEdit}
        >
          {SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkAutomatiskVedtak]}
        </Checkbox>
      </ContainerWithHelpText>

      <StyledRadioGroup
        legend={HEADER}
        hideLegend
        value={saerregelverk}
        error={validationError}
        onChange={onChange}
        id={MainReason.Særregelverket}
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Riktig / Ikke kvalitetsavvik
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt/kvalitetsavvik
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {saerregelverk === Radiovalg.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          update={update}
          childList={CHECKBOXES}
          groupErrorField={SærregelverketErrorFields.saerregelverkGroup}
          label="Hva er mangelfullt/kvalitetsavviket?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  getCheckbox({
    field: SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil,
    childList: [
      getCheckbox({
        field: SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning,
        allRegistreringshjemler:
          SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList,
      }),
      getCheckbox({
        field: SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn,
        saksdatahjemler:
          SærregelverketSaksdataHjemlerList.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList,
      }),
    ],
  }),
  getCheckbox({
    field: SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum,
    saksdatahjemler: SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList,
  }),
];
