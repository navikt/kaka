import { Select, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import {
  VedtaketHjemlerListTextsKeys,
  VedtaketTextsKeys,
} from '../../../../../types/kvalitetsvurdering/texts/structures';
import {
  BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
  KLAGEFORBEREDELSEN_TEXTS,
  KVALITETSVURDERING_TEXTS,
  SAKENS_DOKUMENTER_TEXTS,
  UTREDNINGEN_TEXTS,
  VEDTAKET_TEXTS,
} from '../../../../../types/kvalitetsvurdering/texts/texts';
import { MainReason } from '../../../../../types/kvalitetsvurdering/v2';
import { IStatisticVurderingV2 } from '../../../../../types/statistics/v2';
import { QueryParams } from '../../../../filters/filter-query-params';
import { useQueryParam } from '../../../hooks/use-query-param';
import { TitleWithExplainer } from '../../kvalitetsvurderinger/explainer';
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
    label: KVALITETSVURDERING_TEXTS[MainReason.Klageforberedelsen].label,
    key: MainReason.Klageforberedelsen,
    texts: KLAGEFORBEREDELSEN_TEXTS,
  },
  {
    label: KVALITETSVURDERING_TEXTS[MainReason.Utredningen].label,
    key: MainReason.Utredningen,
    texts: UTREDNINGEN_TEXTS,
  },
  {
    label: KVALITETSVURDERING_TEXTS[MainReason.Vedtaket].label,
    key: MainReason.Vedtaket,
    texts: VEDTAKET_TEXTS,
  },
  {
    label: KVALITETSVURDERING_TEXTS[MainReason.BrukAvRaadgivendeLege].label,
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
    <>
      <TitleWithExplainer>Hovedgrunner</TitleWithExplainer>
      <TotalMangelfull stats={datasets} />
      <HelpTexts helpTexts={[{ texts: KVALITETSVURDERING_TEXTS, key: 'KVALITETSVURDERING_TEXTS' }]} />

      <TitleWithExplainer>Grunner</TitleWithExplainer>
      <MangelfullDetails stats={datasets} />
      <HelpTexts helpTexts={MAIN_HELP_TEXTS} />

      <CategoryContainer>
        <ChartContainer columns={2}>
          <TitleWithExplainer>{KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenSakensDokumenter.label}</TitleWithExplainer>
          <SakensDokumenter stats={datasets} />
          <HelpTexts helpTexts={[{ texts: SAKENS_DOKUMENTER_TEXTS, key: 'SAKENS_DOKUMENTER_TEXTS' }]} />
        </ChartContainer>
        <ChartContainer columns={2}>
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
    </>
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
          <ToggleGroup.Item key={index} value={index.toString()}>
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
        <option key={index} value={index.toString()}>
          {label}
        </option>
      ))}
    </Select>
  );
};

interface HjemlerChartProps {
  hjemmelListId: VedtaketHjemlerListTextsKeys;
  reasonId: VedtaketTextsKeys;
}

const HJEMLER_CHART_PROPS_LIST: HjemlerChartProps[] = [
  {
    reasonId: 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert',
    hjemmelListId: 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
  },
  {
    reasonId: 'vedtaketLovbestemmelsenTolketFeil',
    hjemmelListId: 'vedtaketLovbestemmelsenTolketFeilHjemlerList',
  },
  {
    reasonId: 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
    hjemmelListId: 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList',
  },
  {
    reasonId: 'vedtaketFeilKonkretRettsanvendelse',
    hjemmelListId: 'vedtaketFeilKonkretRettsanvendelseHjemlerList',
  },
];

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const HjemlerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 0;
  justify-content: space-evenly;
  width: 100%;
`;

const HjemlerSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  width: 25%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
