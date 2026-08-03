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
import { Kvalitetsvurderinghjemler } from '@app/components/statistikk/charts/common/hjemler';
import { MangelfullDetails } from '@app/components/statistikk/charts/common/mangelfull-details';
import { NoKvalitetsvurderingWarning } from '@app/components/statistikk/charts/common/no-kvalitetsvurdering-warning';
import { getIkkeKonkretBegrunnelseDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/ikke-konkret-begrunnelse';
import { getMangelfullDetailsDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/mangelfull-details';
import { getSakensDokumenterDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/sakens-dokumenter';
import { getUtredningenUnderKlageforberedelsenDatasets } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/calculations/utredningen-under-klageforberedelsen';
import { TotalMangelfull } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/total-mangelfull';
import type { DataSet } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { useCanShowKvalitetsvurderingStats } from '@app/components/statistikk/hooks/use-can-show-kvalitetsvurdering-stats';
import { BRUK_AV_RAADGIVENDE_LEGE_TEXTS } from '@app/components/statistikk/types/bruk-av-raadgivende-lege';
import { KLAGEFORBEREDELSEN_TEXTS, SAKENS_DOKUMENTER_TEXTS } from '@app/components/statistikk/types/klageforberedelsen';
import { KVALITETSVURDERING_HELP_TEXTS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { UTREDNINGEN_TEXTS } from '@app/components/statistikk/types/utredningen';
import {
  type StatisticsVedtaketHjemlerList,
  type StatisticsVedtaketHjemlerListBoolean,
  VEDTAKET_TEXTS,
} from '@app/components/statistikk/types/vedtaket';
import { Heading, HGrid, Tag, VStack } from '@navikt/ds-react';
import { useMemo } from 'react';
import { QueryParams } from '../../../../filters/filter-query-params';
import { useQueryParam } from '../../../hooks/use-query-param';
import { Card } from '../../../wrappers/wrappers';
import { HelpTexts } from '../../common/help-texts';
import { CardTitleWithExplainer } from '../../kvalitetsvurderinger/explainer';
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

  const mangellfullDetailsDatasets = useMemo(
    () => getMangelfullDetailsDatasets(datasets, 'avvik', theme),
    [datasets, theme],
  );
  const sakensDokumenterDatasets = useMemo(
    () => getSakensDokumenterDatasets(datasets, 'avvik', theme),
    [datasets, theme],
  );
  const utredningenDatasets = useMemo(
    () => getUtredningenUnderKlageforberedelsenDatasets(datasets, 'avvik', theme),
    [datasets, theme],
  );
  const ikkeKonkretBegrunnelseDatasets = useMemo(
    () => getIkkeKonkretBegrunnelseDatasets(datasets, 'avvik', theme),
    [datasets, theme],
  );

  if (!canShow) {
    return <NoKvalitetsvurderingWarning />;
  }

  if (datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  return (
    <Card className="flex flex-col gap-8" colSpan={2}>
      <CardTitleWithExplainer helpText="Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene «henlagt», «retur», «trukket» eller «ugunst (ugyldig)» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i saker med disse utfallene.">
        Kvalitetsvurderinger
      </CardTitleWithExplainer>

      <VStack gap="space-1">
        <TotalMangelfull stats={datasets} title="Kvalitetsvurderte saker" helpText={EXPLANATION_HELP_TEXT} />
        <HelpTexts helpTexts={KVALITETSVURDERING_HELP_TEXTS} />
      </VStack>

      <Mangelfull
        stats={datasets}
        title="Andel mangelfulle saker av total per hovedkategori"
        helpText={EXPLANATION_HELP_TEXT}
      />

      <VStack gap="space-1">
        <MangelfullDetails
          datasets={mangellfullDetailsDatasets.datasets}
          labels={mangellfullDetailsDatasets.labels}
          title="Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)"
          helpText={EXPLANATION_HELP_TEXT}
        />
        <HelpTexts helpTexts={MAIN_HELP_TEXTS} />
      </VStack>

      <HGrid columns={3}>
        <div>
          <MangelfullDetails
            datasets={sakensDokumenterDatasets.datasets}
            labels={sakensDokumenterDatasets.labels}
            title={`Avvik under «${KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenSakensDokumenter.label}»`}
            headingHeight={90}
            helpText={EXPLANATION_HELP_TEXT}
          />
          <HelpTexts helpTexts={[{ texts: SAKENS_DOKUMENTER_TEXTS, key: 'SAKENS_DOKUMENTER_TEXTS' }]} />
        </div>
        <MangelfullDetails
          datasets={utredningenDatasets.datasets}
          labels={utredningenDatasets.labels}
          title={`Avvik under «${KLAGEFORBEREDELSEN_TEXTS.klageforberedelsenUtredningenUnderKlageforberedelsen.label}»`}
          extraTitleContent={<Tag2024 />}
          headingHeight={90}
          helpText={EXPLANATION_HELP_TEXT}
        />
        <MangelfullDetails
          datasets={ikkeKonkretBegrunnelseDatasets.datasets}
          labels={ikkeKonkretBegrunnelseDatasets.labels}
          title={`Avvik under «${VEDTAKET_TEXTS.vedtaketIkkeKonkretIndividuellBegrunnelse.label}»`}
          headingHeight={90}
          helpText={EXPLANATION_HELP_TEXT}
        />
      </HGrid>

      <Heading size="small" align="center">
        Mest brukte hjemler
      </Heading>

      <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />

      <HGrid columns={3}>
        {HJEMLER_CHART_PROPS_LIST.map((params) => (
          <Kvalitetsvurderinghjemler
            key={params.reasonId}
            hjemlerCount={getHjemlerCount(focusedDataset, params.hjemmelListId)}
            title={params.title}
            extraTitleContent={params.extraTitleContent}
            backgroundColor={getColorFromTheme(VEDTAKET_TEXTS[params.reasonId].color, theme)}
            headingHeight={90}
          />
        ))}
      </HGrid>
    </Card>
  );
};

interface HjemlerChartProps {
  hjemmelListId: StatisticsVedtaketHjemlerList;
  reasonId: StatisticsVedtaketHjemlerListBoolean;
  title: string;
  extraTitleContent?: React.ReactNode;
}

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
    title: VEDTAKET_TEXTS.vedtaketBruktFeilHjemmel.label,
    extraTitleContent: <Tag2024 />,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
    title: VEDTAKET_TEXTS.vedtaketAlleRelevanteHjemlerErIkkeVurdert.label,
    extraTitleContent: <Tag2024 />,
  },
  {
    reasonId: LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert,
    hjemmelListId: LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
    title: VEDTAKET_TEXTS.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert.label,
    extraTitleContent: <Tag2023 />,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList,
    title: VEDTAKET_TEXTS.vedtaketLovbestemmelsenTolketFeil.label,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList,
    title: VEDTAKET_TEXTS.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet.label,
  },
  {
    reasonId: VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse,
    hjemmelListId: VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList,
    title: VEDTAKET_TEXTS.vedtaketFeilKonkretRettsanvendelse.label,
  },
];

const getHjemlerCount = (dataset: DataSet, hjemmelListId: StatisticsVedtaketHjemlerList): Record<string, number> =>
  dataset.data.reduce<Record<string, number>>((counts, sak) => {
    for (const hjemmelId of sak[hjemmelListId] ?? []) {
      counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
    }

    return counts;
  }, {});
