import { useAppTheme } from '@app/app-theme';
import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  LegacyVedtaketBoolean,
  LegacyVedtaketHjemlerList,
  VedtaketAllregistreringshjemlerList,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { DatasetSelector } from '@app/components/statistikk/charts/common/dataset-selector';
import { NoKvalitetsvurderingWarning } from '@app/components/statistikk/charts/common/no-kvalitetsvurdering-warning';
import { Kvalitetsvurderinghjemler } from '@app/components/statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinghjemler';
import { MangelfullDetails } from '@app/components/statistikk/charts/kvalitetsvurderinger/mangelfull-details';
import { getIkkeKonkretBegrunnelseDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/ikke-konkret-begrunnelse';
import { getMangelfullDetailsDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/mangelfull-details';
import { getSakensDokumenterDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/sakens-dokumenter';
import { getUtredningenUnderKlageforberedelsenDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/utredningen-under-klageforberedelsen';
import { TotalMangelfull } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/total-mangelfull';
import type { DataSet } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { useCanShowKvalitetsvurderingStats } from '@app/components/statistikk/hooks/use-can-show-kvalitetsvurdering-stats';
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
import { Tag } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { QueryParams } from '../../../../filters/filter-query-params';
import { Card } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';
import { HelpTexts } from '../../common/help-texts';
import { CardTitleWithExplainer } from '../../kvalitetsvurderinger/explainer';
import { ChartContainer, ChartTitle } from '../../styled-components';
import { Mangelfull } from './mangelfull';

interface Props {
  datasets: DataSet[];
}

const EXPLANATION_HELP_TEXT =
  'En sak kan ha ett eller flere avvik. Prosenten er regnet ut fra totalt antall kvalitetsvurderte saker.';

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
  const theme = useAppTheme();
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');

  const datasetIndex = Number.parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  const canShow = useCanShowKvalitetsvurderingStats();

  if (!canShow) {
    return <NoKvalitetsvurderingWarning />;
  }

  if (datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  const mangellfullDetailsDatasets = getMangelfullDetailsDatasets(datasets, 'avvik', theme);
  const sakensDokumenterDatasets = getSakensDokumenterDatasets(datasets, 'avvik', theme);
  const utredningenDatasets = getUtredningenUnderKlageforberedelsenDatasets(datasets, 'avvik', theme);
  const ikkeKonkretBegrunnelseDatasets = getIkkeKonkretBegrunnelseDatasets(datasets, 'avvik', theme);

  return (
    <Card span={16} className="flex flex-col gap-8">
      <CardTitleWithExplainer helpText="Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene «henlagt», «retur», «trukket» eller «ugunst (ugyldig)» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i saker med disse utfallene.">
        Kvalitetsvurderinger
      </CardTitleWithExplainer>

      <TotalMangelfull stats={datasets} title="Kvalitetsvurderte saker" helpText={EXPLANATION_HELP_TEXT} />

      <HelpTexts helpTexts={KVALITETSVURDERING_HELP_TEXTS} />

      <Mangelfull
        stats={datasets}
        title="Andel mangelfulle saker av total per hovedkategori"
        helpText={EXPLANATION_HELP_TEXT}
      />

      <MangelfullDetails
        datasets={mangellfullDetailsDatasets.datasets}
        labels={mangellfullDetailsDatasets.labels}
        title="Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)"
        helpText={EXPLANATION_HELP_TEXT}
      />
      <HelpTexts helpTexts={MAIN_HELP_TEXTS} />

      <CategoryContainer>
        <ChartContainer $columns={3}>
          <MangelfullDetails
            datasets={sakensDokumenterDatasets.datasets}
            labels={sakensDokumenterDatasets.labels}
            title={`Avvik under «${KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenSakensDokumenter.label}»`}
            helpText={EXPLANATION_HELP_TEXT}
          />
          <HelpTexts helpTexts={[{ texts: SAKENS_DOKUMENTER_TEXTS, key: 'SAKENS_DOKUMENTER_TEXTS' }]} />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <MangelfullDetails
            datasets={utredningenDatasets.datasets}
            labels={utredningenDatasets.labels}
            title={`Avvik under «${KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenUtredningenUnderKlageforberedelsen.label}» (Ny i 2024)`}
            helpText={EXPLANATION_HELP_TEXT}
          />
          <HelpTexts
            helpTexts={[
              { texts: UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS, key: 'UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS' },
            ]}
          />
        </ChartContainer>

        <ChartContainer $columns={3}>
          <MangelfullDetails
            datasets={ikkeKonkretBegrunnelseDatasets.datasets}
            labels={ikkeKonkretBegrunnelseDatasets.labels}
            title={`Avvik under «${VEDTAKET_TEXTS.vedtaketIkkeKonkretIndividuellBegrunnelse.label}»`}
            helpText={EXPLANATION_HELP_TEXT}
          />
        </ChartContainer>
      </CategoryContainer>
      <ChartTitle>Mest brukte hjemler</ChartTitle>
      <Container>
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </Container>
      <HjemlerContainer>
        {HJEMLER_CHART_PROPS_LIST.map((params) => (
          <HjemlerSubContainer key={params.reasonId}>
            <ChartTitle>{params.label}</ChartTitle>
            <div style={{ height: 300 }}>
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(focusedDataset, params.hjemmelListId)}
                title={VEDTAKET_TEXTS[params.reasonId].label}
                hideTitle
                backgroundColor={getColorFromTheme(VEDTAKET_TEXTS[params.reasonId].color, theme)}
              />
            </div>
          </HjemlerSubContainer>
        ))}
      </HjemlerContainer>
    </Card>
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
  gap: var(--ax-space-4);
`;

const Tag2024 = () => (
  <Tag data-color="info" title="Ny i 2024" variant="strong" size="xsmall" style={{ cursor: 'help' }}>
    2024
  </Tag>
);

const Tag2023 = () => (
  <Tag data-color="warning" title="Fjernet i 2024" variant="strong" size="xsmall" style={{ cursor: 'help' }}>
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

const getHjemlerCount = (dataset: DataSet, hjemmelListId: StatisticsVedtaketHjemlerList): Record<string, number> =>
  dataset.data.reduce<Record<string, number>>((counts, sak) => {
    for (const hjemmelId of sak[hjemmelListId] ?? []) {
      counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
    }

    return counts;
  }, {});
