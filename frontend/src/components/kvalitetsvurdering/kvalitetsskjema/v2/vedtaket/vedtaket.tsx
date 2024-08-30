import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/helpers';
import {
  HEADER,
  VEDTAKET_LABELS,
  VedtaketAllregistreringshjemlerList,
  VedtaketBoolean,
  VedtaketErrorFields,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Alert, Checkbox, Radio } from '@navikt/ds-react';
import { Checkboxes } from '../common/checkboxes';
import { ContainerWithHelpText } from '../common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../common/styled-components';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

const vedtaketAutomatiskVedtakhelpText =
  'Du skal gjøre de samme kvalitetsvurderingene for automatiske vedtak som for andre vedtak. Du kan krysse av for automatisk vedtak dersom det er tydelig merket i vedtaket.';

export const Vedtaket = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Vedtaket);

  if (isLoading) {
    return null;
  }

  const { vedtaket, vedtaketAutomatiskVedtak } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ vedtaket: value });

  return (
    <section>
      <StyledHeading size="small">{HEADER}</StyledHeading>

      {vedtaketAutomatiskVedtak === true ? <Alert variant="info">{vedtaketAutomatiskVedtakhelpText}</Alert> : null}
      <ContainerWithHelpText helpText={vedtaketAutomatiskVedtakhelpText}>
        <Checkbox
          value={VedtaketBoolean.vedtaketAutomatiskVedtak}
          checked={vedtaketAutomatiskVedtak}
          onChange={({ target }) => update({ vedtaketAutomatiskVedtak: target.checked })}
          disabled={!canEdit}
        >
          {VEDTAKET_LABELS[VedtaketBoolean.vedtaketAutomatiskVedtak]}
        </Checkbox>
      </ContainerWithHelpText>

      <StyledRadioGroup
        legend={HEADER}
        hideLegend
        value={vedtaket}
        error={validationError}
        onChange={onChange}
        id="vedtaket"
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Bra/godt nok
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {vedtaket === Radiovalg.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          update={update}
          childList={CHECKBOXES}
          groupErrorField={VedtaketErrorFields.vedtaketGroup}
          label="Hva er mangelfullt?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  getCheckbox({
    field: VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel,
    allRegistreringshjemler: VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList,
  }),
  getCheckbox({
    field: VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert,
    saksdatahjemler: VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
  }),
  getCheckbox({
    field: VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil,
    saksdatahjemler: VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList,
  }),
  getCheckbox({
    field: VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet,
    saksdatahjemler: VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList,
  }),
  getCheckbox({ field: VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum }),
  getCheckbox({
    field: VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse,
    saksdatahjemler: VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList,
  }),
  getCheckbox({
    field: VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse,
    childList: [
      getCheckbox({ field: VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum }),
      getCheckbox({
        field:
          VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum,
      }),
      getCheckbox({ field: VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst }),
    ],
    groupErrorField: VedtaketErrorFields.vedtaketIkkeKonkretIndividuellBegrunnelseGroup,
  }),
  getCheckbox({ field: VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig }),
];
