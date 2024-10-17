import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  LegacyVedtaketBoolean,
  LegacyVedtaketHjemlerList,
  VedtaketAllregistreringshjemlerList,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { TotalMangelfull } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/total-mangelfull';
import type { DataSet } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
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
  type StatisticsVedtaketHjemlerList,
  type StatisticsVedtaketHjemlerListBoolean,
  VEDTAKET_TEXTS,
} from '@app/components/statistikk/types/vedtaket';
import { SakstypeEnum } from '@app/types/sakstype';
import { Select, Tag, ToggleGroup } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { QueryParams } from '../../../../filters/filter-query-params';
import { CardSize, DynamicCard } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';
import { CardTitleWithExplainer, TitleWithExplainer } from '../../kvalitetsvurderinger/explainer';
import { ChartContainer, ChartTitle } from '../../styled-components';
import { HelpTexts } from './help-texts';
import { Hjemler } from './hjemler';
import { IkkeKonkretBegrunnelse } from './ikke-konkret-begrunnelse';
import { Mangelfull } from './mangelfull';
import { MangelfullDetails } from './mangelfull-details';
import { SakensDokumenter } from './sakens-dokumenter';

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
  const types = useSakstypeFilter();
  const hide = types.every((type) => type === SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET); // TODO: Add omgjøringskrav here
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');

  const datasetIndex = Number.parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  if (hide || datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  return (
    <DynamicCard size={CardSize.LARGE}>
      <CardTitleWithExplainer
        helpText="Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene
          «retur» eller «trukket» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i
          saker med disse utfallene."
      >
        Kvalitetsvurderinger
      </CardTitleWithExplainer>

      <TitleWithExplainer>Kvalitetsvurderte saker</TitleWithExplainer>
      <TotalMangelfull stats={datasets} />

      <HelpTexts helpTexts={KVALITETSVURDERING_HELP_TEXTS} />

      <TitleWithExplainer>Andel mangelfulle saker av total per hovedkategori</TitleWithExplainer>
      <Mangelfull datasets={datasets} />

      <TitleWithExplainer>
        Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)
      </TitleWithExplainer>
      <MangelfullDetails stats={datasets} />
      <HelpTexts helpTexts={MAIN_HELP_TEXTS} />

      <CategoryContainer>
        <ChartContainer $columns={3}>
          <TitleWithExplainer>
            Avvik under «{KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenSakensDokumenter.label}»
          </TitleWithExplainer>

          <SakensDokumenter stats={datasets} />
          <HelpTexts helpTexts={[{ texts: SAKENS_DOKUMENTER_TEXTS, key: 'SAKENS_DOKUMENTER_TEXTS' }]} />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <TitleWithExplainer>
            <LabelContainer>
              Avvik under «{KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenUtredningenUnderKlageforberedelsen.label}»
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
          <TitleWithExplainer>
            Avvik under «{VEDTAKET_TEXTS.vedtaketIkkeKonkretIndividuellBegrunnelse.label}»
          </TitleWithExplainer>
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
          <ToggleGroup.Item key={label} value={index.toString(10)}>
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
        <option key={label} value={index.toString(10)}>
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
