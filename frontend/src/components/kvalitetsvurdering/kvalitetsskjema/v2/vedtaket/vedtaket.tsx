import { Alert, Checkbox, Radio } from '@navikt/ds-react';
import React from 'react';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  HEADER,
  VEDTAKET_LABELS,
  VedtaketErrorFields,
  VedtaketFields,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Checkboxes } from '../common/checkboxes';
import { ContainerWithHelpText } from '../common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../common/styled-components';
import { CheckboxParams, TypeEnum } from '../common/types';
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
          value={VedtaketFields.vedtaketAutomatiskVedtak}
          checked={vedtaketAutomatiskVedtak}
          onChange={({ target }) => update({ vedtaketAutomatiskVedtak: target.checked })}
          disabled={!canEdit}
        >
          {VEDTAKET_LABELS[VedtaketFields.vedtaketAutomatiskVedtak]}
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
  {
    field: VedtaketFields.vedtaketBruktFeilHjemmel,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketBruktFeilHjemmel],
    allRegistreringshjemler: VedtaketFields.vedtaketBruktFeilHjemmelHjemlerList,
  },
  {
    field: VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdert,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdert],
    saksdatahjemler: VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
  },
  {
    field: VedtaketFields.vedtaketLovbestemmelsenTolketFeil,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketLovbestemmelsenTolketFeil],
    saksdatahjemler: VedtaketFields.vedtaketLovbestemmelsenTolketFeilHjemlerList,
    helpText: 'F.eks. er «en vesentlig medvirkende årsak» tolket som et krav om hovedårsak.',
  },
  {
    field: VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet],
    saksdatahjemler: VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList,
    helpText:
      'F.eks. er ikke alle relevante momenter eller unntak beskrevet som er nødvendige for at bruker skal forstå innholdet i regelen.',
  },
  {
    field: VedtaketFields.vedtaketDetErLagtTilGrunnFeilFaktum,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketDetErLagtTilGrunnFeilFaktum],
    helpText:
      'Med faktum mener vi de faktiske forhold du legger til grunn etter å ha vurdert og vektet bevisene i saken. Du registrerer her dersom alle relevante bevis ikke er sett/vurdert, herunder informasjon fra andre fagsystemer NAV har tilgang til. Du registrerer også her dersom bevis er tolket eller vektlagt feil.',
  },
  {
    field: VedtaketFields.vedtaketFeilKonkretRettsanvendelse,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketFeilKonkretRettsanvendelse],
    saksdatahjemler: VedtaketFields.vedtaketFeilKonkretRettsanvendelseHjemlerList,
    helpText:
      'Det er lagt til grunn riktig tolkning av rettsregelen og riktig faktum, men likevel kommet til feil resultat/subsumsjonen er feil.',
  },
  {
    field: VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelse,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelse],
    groupErrorField: VedtaketErrorFields.vedtaketIkkeKonkretIndividuellBegrunnelseGroup,
    childList: [
      {
        field: VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum,
        type: TypeEnum.CHECKBOX,
        label: VEDTAKET_LABELS[VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum],
      },
      {
        field:
          VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum,
        type: TypeEnum.CHECKBOX,
        label:
          VEDTAKET_LABELS[
            VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum
          ],
      },
      {
        field: VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst,
        type: TypeEnum.CHECKBOX,
        label: VEDTAKET_LABELS[VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst],
      },
    ],
  },
  {
    field: VedtaketFields.vedtaketSpraakOgFormidlingErIkkeTydelig,
    type: TypeEnum.CHECKBOX,
    label: VEDTAKET_LABELS[VedtaketFields.vedtaketSpraakOgFormidlingErIkkeTydelig],
    helpText:
      'F.eks. er ikke språket tilpasset mottaker, oppbyggingen av innholdet er ulogisk, det er mye gjentagelser eller det er ikke mellomrom mellom ordene i brevet.',
  },
];
