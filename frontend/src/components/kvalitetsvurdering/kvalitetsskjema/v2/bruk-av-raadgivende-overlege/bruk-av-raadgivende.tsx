import { Radio } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import {
  BrukAvRaadgivendeOverlegeBoolean,
  BrukAvRaadgivendeOverlegeErrorFields,
  HEADER,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/helpers';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import { Checkboxes } from '../common/checkboxes';
import { ContainerWithHelpText } from '../common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../common/styled-components';
import { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

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
  Bil = '49',
  Helsetjenester_og_ortopediske_hjelpemidler = '50',
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
  Ytelser.Bil,
  Ytelser.Helsetjenester_og_ortopediske_hjelpemidler,
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
