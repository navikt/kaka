import { Radio } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import { useYtelser } from '../../../../simple-api-state/use-kodeverk';
import { RadiovalgExtended } from '../../../../types/kvalitetsvurdering/radio';
import {
  BRUK_AV_RAADGIVENDE_LEGE_REASONS,
  getChildrenEntries,
} from '../../../../types/kvalitetsvurdering/texts/structures';
import {
  BRUK_AV_RAADGIVENDE_LEGE_RADIO_TEXTS,
  BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
} from '../../../../types/kvalitetsvurdering/texts/texts';
import { MainReason } from '../../../../types/kvalitetsvurdering/v2';
import { Checkboxes } from './common/checkboxes';
import { ContainerWithHelpText } from './common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from './common/styled-components';
import { ICheckboxParams } from './common/types';
import { useKvalitetsvurderingV2FieldName } from './common/use-field-name';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { useValidationError } from './common/use-validation-error';

enum Ytelser {
  Omsorgspenger = '1',
  Opplæringspenger = '2',
  Pleiepenger_sykt_barn = '3',
  Pleiepenger_i_livets_sluttfase = '4',
  Sykepenger = '5',
  Foreldrepenger = '6',
  Svangerskapspenger = '8',
  Arbeidsavklaringspenger = '9',
  Hjelpestønad = '20',
  Grunnstønad = '21',
  Hjelpemidler = '22',
  Uføretrygd = '35',
  Yrkesskade = '36',
  Menerstatning = '37',
  Yrkessykdom = '38',
  Tvungen_forvaltning = '39',
}

const YTELSER_RELEVANT_FOR_RAADGIVENDE_LEGE: string[] = [
  Ytelser.Omsorgspenger,
  Ytelser.Opplæringspenger,
  Ytelser.Pleiepenger_sykt_barn,
  Ytelser.Pleiepenger_i_livets_sluttfase,
  Ytelser.Sykepenger,
  Ytelser.Foreldrepenger,
  Ytelser.Svangerskapspenger,
  Ytelser.Arbeidsavklaringspenger,
  Ytelser.Hjelpestønad,
  Ytelser.Grunnstønad,
  Ytelser.Hjelpemidler,
  Ytelser.Uføretrygd,
  Ytelser.Yrkesskade,
  Ytelser.Menerstatning,
  Ytelser.Yrkessykdom,
  Ytelser.Tvungen_forvaltning,
];

const useIsRelevantYtelse = (ytelseId: string | null | undefined): boolean => {
  const { data: saksdata } = useSaksdata();
  const { data: ytelser } = useYtelser(saksdata?.kvalitetsvurderingReference.version ?? skipToken);

  return useMemo<boolean>(() => {
    if (typeof ytelser === 'undefined' || typeof ytelseId !== 'string') {
      return false;
    }

    return ytelser.some(({ id }) => id === ytelseId && YTELSER_RELEVANT_FOR_RAADGIVENDE_LEGE.includes(ytelseId));
  }, [ytelser, ytelseId]);
};

export const BrukAvRaadgivendeLege = () => {
  const { isLoading, kvalitetsvurdering, update, saksdata } = useKvalitetsvurderingV2();
  const show = useIsRelevantYtelse(saksdata?.ytelseId);

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.BrukAvRaadgivendeLege);
  const header = useKvalitetsvurderingV2FieldName(MainReason.BrukAvRaadgivendeLege);

  if (!show || isLoading) {
    return null;
  }

  const { brukAvRaadgivendeLege } = kvalitetsvurdering;

  const onChange = (value: RadiovalgExtended) => update({ brukAvRaadgivendeLege: value });

  return (
    <section>
      <StyledHeading size="small">{header}</StyledHeading>
      <StyledRadioGroup
        legend={header}
        hideLegend
        value={brukAvRaadgivendeLege}
        error={validationError}
        onChange={onChange}
        id="brukAvRaadgivendeLege"
      >
        <RadioButtonsRow>
          <ContainerWithHelpText helpText={BRUK_AV_RAADGIVENDE_LEGE_RADIO_TEXTS.IKKE_AKTUELT.helpText}>
            <Radio value={RadiovalgExtended.IKKE_AKTUELT} disabled={!canEdit}>
              Ikke aktuelt for den konkrete saken
            </Radio>
          </ContainerWithHelpText>

          <ContainerWithHelpText helpText={BRUK_AV_RAADGIVENDE_LEGE_RADIO_TEXTS.BRA.helpText}>
            <Radio value={RadiovalgExtended.BRA} disabled={!canEdit}>
              Bra/godt nok
            </Radio>
          </ContainerWithHelpText>

          <Radio value={RadiovalgExtended.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      <Checkboxes
        kvalitetsvurdering={kvalitetsvurdering}
        checkboxes={BRUK_AV_RAADGIVENDE_LEGE_CHECKBOXES}
        update={update}
        show={brukAvRaadgivendeLege === RadiovalgExtended.MANGELFULLT}
        groupErrorField="raadgivendeLegeGroup"
        label="Hva er mangelfullt?"
      />
    </section>
  );
};

const BRUK_AV_RAADGIVENDE_LEGE_CHECKBOXES: ICheckboxParams[] = BRUK_AV_RAADGIVENDE_LEGE_REASONS.map((field) => ({
  field,
  ...BRUK_AV_RAADGIVENDE_LEGE_TEXTS[field],
  checkboxes: getChildrenEntries(BRUK_AV_RAADGIVENDE_LEGE_TEXTS[field]).map(([f, value]) => ({
    field: f,
    ...value,
  })),
}));
