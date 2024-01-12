import { Select, Tag, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  LegacyVedtaketBoolean,
  LegacyVedtaketHjemlerList,
  VedtaketAllregistreringshjemlerList,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { UtredningenUnderKlageforberedelsen } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/utredningen-under-klageforberedelsen';
import { BRUK_AV_RAADGIVENDE_LEGE_TEXTS } from '@app/components/statistikk/types/bruk-av-raadgivende-lege';
import {
  KLAGEFORBEREDELSEN_TEXTS,
  SAKENS_DOKUMENTER_TEXTS,
  UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS,
} from '@app/components/statistikk/types/klageforberedelsen';
import { KVALITETSVURDERING_HELP_TEXTS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { UTREDNINGEN_TEXTS } from '@app/components/statistikk/types/utredningen';
import {
  StatisticsVedtaketHjemlerList,
  StatisticsVedtaketHjemlerListBoolean,
  VEDTAKET_TEXTS,
} from '@app/components/statistikk/types/vedtaket';
import { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { QueryParams } from '../../../../filters/filter-query-params';
import { CardSize, DynamicCard } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';
import { CardTitleWithExplainer, TitleWithExplainer } from '../../kvalitetsvurderinger/explainer';
import { ChartContainer, ChartTitle } from '../../styled-components';
import { HelpTexts } from './help-texts';
import { Hjemler } from './hjemler';
import { IkkeKonkretBegrunnelse } from './ikke-konkret-begrunnelse';
import { MangelfullDetails } from './mangelfull-details';
import { SakensDokumenter } from './sakens-dokumenter';
import { TotalMangelfull } from './total-mangelfull';

interface DataSet {
  label: string;
  data: IStatisticVurderingV2[];
}

interface Props {
  datasets: DataSet[];
}

const MAIN_HELP_TEXTS = [
  {
    label: MAIN_REASON_LABELS[MainReason.Klageforberedelsen],
    key: MainReason.Klageforberedelsen,
    texts: KLAGEFORBEREDELSEN_TEXTS,
  },
  {
    label: MAIN_REASON_LABELS[MainReason.Utredningen],
    key: MainReason.Utredningen,
    texts: UTREDNINGEN_TEXTS,
  },
  {
    label: MAIN_REASON_LABELS[MainReason.Vedtaket],
    key: MainReason.Vedtaket,
    texts: VEDTAKET_TEXTS,
  },
  {
    label: MAIN_REASON_LABELS[MainReason.BrukAvRaadgivendeLege],
    key: MainReason.BrukAvRaadgivendeLege,
    texts: BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
  },
];

export const KvalitetsvurderingerV2 = ({ datasets }: Props) => {
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');

  const datasetIndex = parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  if (datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  return (
    <DynamicCard size={CardSize.LARGE}>
      <CardTitleWithExplainer
        helpText="Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene
          «retur», «trukket» og «ugunst (ugyldig)» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i
          saker med disse utfallene."
      >
        Kvalitetsvurderinger
      </CardTitleWithExplainer>
      <TitleWithExplainer>Hovedgrunner</TitleWithExplainer>
      <TotalMangelfull stats={datasets} />
      <HelpTexts helpTexts={KVALITETSVURDERING_HELP_TEXTS} />

      <TitleWithExplainer>Grunner</TitleWithExplainer>
      <MangelfullDetails stats={datasets} />
      <HelpTexts helpTexts={MAIN_HELP_TEXTS} />

      <CategoryContainer>
        <ChartContainer $columns={3}>
          <TitleWithExplainer>{KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenSakensDokumenter.label}</TitleWithExplainer>
          <SakensDokumenter stats={datasets} />
          <HelpTexts helpTexts={[{ texts: SAKENS_DOKUMENTER_TEXTS, key: 'SAKENS_DOKUMENTER_TEXTS' }]} />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <TitleWithExplainer>
            <LabelContainer>
              {KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenUtredningenUnderKlageforberedelsen.label}
              <Tag2024 />
            </LabelContainer>
          </TitleWithExplainer>
          <UtredningenUnderKlageforberedelsen stats={datasets} />
          <HelpTexts
            helpTexts={[
              { texts: UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS, key: 'UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS' },
            ]}
          />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <TitleWithExplainer>{VEDTAKET_TEXTS.vedtaketIkkeKonkretIndividuellBegrunnelse.label}</TitleWithExplainer>
          <IkkeKonkretBegrunnelse stats={datasets} />
        </ChartContainer>
      </CategoryContainer>
      <ChartTitle>Mest brukte hjemler</ChartTitle>
      <Container>
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </Container>
      <HjemlerContainer>
        {HJEMLER_CHART_PROPS_LIST.map((params, index) => (
          <HjemlerSubContainer key={params.reasonId}>
            <Hjemler key={params.reasonId} {...params} dataset={focusedDataset} index={index} />
          </HjemlerSubContainer>
        ))}
      </HjemlerContainer>
    </DynamicCard>
  );
};

interface DatasetSelectorProps {
  datasets: DataSet[];
  onChange: (value: string) => void;
  datasetIndexString: string;
}

const DatasetSelector = ({ datasets, datasetIndexString, onChange }: DatasetSelectorProps) => {
  if (datasets.length === 1) {
    return null;
  }

  if (datasets.length < 8) {
    return (
      <ToggleGroup size="small" value={datasetIndexString} onChange={onChange}>
        {datasets.map(({ label }, index) => (
          <ToggleGroup.Item key={index} value={index.toString(10)}>
            {label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <Select
      size="small"
      label="Velg datasett"
      hideLabel
      value={datasetIndexString}
      onChange={({ target }) => onChange(target.value)}
    >
      {datasets.map(({ label }, index) => (
        <option key={index} value={index.toString(10)}>
          {label}
        </option>
      ))}
    </Select>
  );
};

interface HjemlerChartProps {
  hjemmelListId: StatisticsVedtaketHjemlerList;
  reasonId: StatisticsVedtaketHjemlerListBoolean;
  label: React.ReactNode;
}
const LabelContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--a-spacing-1);
`;

const Tag2024 = () => (
  <Tag title="Ny i 2024" variant="alt3-filled" size="xsmall" style={{ cursor: 'help' }}>
    2024
  </Tag>
);

const Tag2023 = () => (
  <Tag title="Fjernet i 2024" variant="warning-filled" size="xsmall" style={{ cursor: 'help' }}>
    2023
  </Tag>
);

const HJEMLER_CHART_PROPS_LIST: HjemlerChartProps[] = [
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel,
    hjemmelListId: VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList,
    label: (
      <LabelContainer>
        {VEDTAKET_TEXTS.vedtaketBruktFeilHjemmel.label}
        <Tag2024 />
      </LabelContainer>
    ),
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
    label: (
      <LabelContainer>
        {VEDTAKET_TEXTS.vedtaketAlleRelevanteHjemlerErIkkeVurdert.label}
        <Tag2024 />
      </LabelContainer>
    ),
  },
  {
    reasonId: LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert,
    hjemmelListId: LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
    label: (
      <LabelContainer>
        {VEDTAKET_TEXTS.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert.label}
        <Tag2023 />
      </LabelContainer>
    ),
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList,
    label: VEDTAKET_TEXTS.vedtaketLovbestemmelsenTolketFeil.label,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList,
    label: VEDTAKET_TEXTS.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet.label,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList,
    label: VEDTAKET_TEXTS.vedtaketFeilKonkretRettsanvendelse.label,
  },
];

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const HjemlerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  column-gap: 0;
  width: 100%;
`;

const HjemlerSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
