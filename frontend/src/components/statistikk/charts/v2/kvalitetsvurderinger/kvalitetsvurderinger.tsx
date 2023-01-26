import { Select, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { IKvalitetsvurderingHjemler } from '../../../../../types/kvalitetsvurdering/v2';
import { IStatisticVurderingV2 } from '../../../../../types/statistics/v2';
import { QueryParams } from '../../../../filters/filter-query-params';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';
import { useQueryParam } from '../../../hooks/use-query-param';
import { ChartContainer, ChartTitle } from '../../styled-components';
import { KlageforberedelsenReasons, VedtaketReasons } from './calculations/constants';
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

export const KvalitetsvurderingerV2 = ({ datasets }: Props) => {
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');

  const datasetIndex = parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  if (datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  return (
    <>
      <TotalMangelfull stats={datasets} />
      <MangelfullDetails stats={datasets} />
      <CategoryContainer>
        <ChartContainer columns={2}>
          <ChartTitle>
            {KVALITETSVURDERING_V2_FIELD_NAMES[KlageforberedelsenReasons.klageforberedelsenSakensDokumenter]}
          </ChartTitle>
          <SakensDokumenter stats={datasets} />
        </ChartContainer>
        <ChartContainer columns={2}>
          <ChartTitle>
            {KVALITETSVURDERING_V2_FIELD_NAMES[VedtaketReasons.vedtaketIkkeKonkretIndividuellBegrunnelse]}
          </ChartTitle>
          <IkkeKonkretBegrunnelse stats={datasets} />
        </ChartContainer>
      </CategoryContainer>
      <ChartTitle>Mest brukte hjemler</ChartTitle>
      <Container>
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </Container>
      <HjemlerContainer>
        {HJEMLER_CHART_PROPS_LIST.map((params, index) => (
          <Hjemler key={params.reasonId} {...params} dataset={focusedDataset} index={index} />
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
  hjemmelListId: keyof IKvalitetsvurderingHjemler;
  reasonId: VedtaketReasons;
}

const HJEMLER_CHART_PROPS_LIST: HjemlerChartProps[] = [
  {
    reasonId: VedtaketReasons.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert,
    hjemmelListId: 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
  },
  {
    reasonId: VedtaketReasons.vedtaketLovbestemmelsenTolketFeil,
    hjemmelListId: 'vedtaketLovbestemmelsenTolketFeilHjemlerList',
  },
  {
    reasonId: VedtaketReasons.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet,
    hjemmelListId: 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList',
  },
  {
    reasonId: VedtaketReasons.vedtaketFeilKonkretRettsanvendelse,
    hjemmelListId: 'vedtaketFeilKonkretRettsanvendelseHjemlerList',
  },
];

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const HjemlerContainer = styled.div`
  display: grid;
  grid-template-areas: 'title-0 title-1 title-2 title-3' 'chart-0 chart-1 chart-2 chart-3';
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content auto;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
