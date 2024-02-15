import { skipToken } from '@reduxjs/toolkit/query';
import React, { useMemo } from 'react';
import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { useSaksbehandlere } from '@app/simple-api-state/use-saksbehandlere';
import { useUser } from '@app/simple-api-state/use-user';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { QueryParams } from '../../../filters/filter-query-params';
import { useQueryFilters } from '../../../filters/hooks/use-query-filter';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { COLORS } from '../../comparison/get-default-color';
import { filterIrrelevant } from '../../filters/relevant';
import { useRelevantStatistics } from '../../hooks/use-relevant-statistics';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

type SaksbehandlerStats = Record<string, IFullStatisticVurderingV1[]>;

interface Props {
  mine: IFullStatisticVurderingV1[];
  rest: IFullStatisticVurderingV1[];
  saksbehandlere: SaksbehandlerStats;
  isLoading: boolean;
}

export const ContentV1 = ({ mine, rest, saksbehandlere, isLoading }: Props) => {
  const { data: userData } = useUser();
  const { data: saksbehandlerList = [] } = useSaksbehandlere(userData?.ansattEnhet.id ?? skipToken);
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const relevantSaksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: filterIrrelevant(stats),
      })),
    [saksbehandlerList, saksbehandlere],
  );

  const allSaksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: stats,
      })),
    [saksbehandlerList, saksbehandlere],
  );

  const relevantMine = useRelevantStatistics(mine);
  const relevantRest = useRelevantStatistics(rest);

  const relevantData = useMemo(
    () => (selectedSaksbehandlere.length > 0 ? relevantSaksbehandlereStats.flatMap(({ data }) => data) : relevantMine),
    [relevantMine, relevantSaksbehandlereStats, selectedSaksbehandlere.length],
  );

  const allData = useMemo(
    () => (selectedSaksbehandlere.length > 0 ? allSaksbehandlereStats.flatMap(({ data }) => data) : mine),
    [allSaksbehandlereStats, mine, selectedSaksbehandlere.length],
  );

  const datasets = useMemo(
    () => [
      { label: 'Min enhet', data: relevantMine },
      { label: 'Andre enheter', data: relevantRest },
      { label: 'Alle enheter', data: [...relevantMine, ...relevantRest] },
      ...relevantSaksbehandlereStats,
    ],
    [relevantMine, relevantRest, relevantSaksbehandlereStats],
  );

  const behandlingstidStats = useMemo(
    () =>
      datasets.map(({ label, data }, i) => ({
        label,
        color: COLORS[i] ?? 'red',
        data: data.map(({ avsluttetAvSaksbehandler, kaBehandlingstidDays }) => ({
          avsluttetAvSaksbehandler,
          behandlingstidDays: kaBehandlingstidDays,
        })),
      })),
    [datasets],
  );

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={allData} />
            <TotalProcessed length={relevantData.length} />
            <Omgjort stats={relevantData} label="Omgjort av vår enhet" />
            <Gjennomsnittstid stats={relevantData} />
            <Processed weeks={12} stats={relevantData} />
            <Processed weeks={15} stats={relevantData} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
            Min enhets omgjøringsprosent
          </CardTitleWithExplainer>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV1 stats={relevantData} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={relevantData} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={relevantData} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <BehandlingstidHistogram stats={relevantData} />
        </DynamicCard>

        <BehandlingstidOverTime stats={behandlingstidStats} />
      </ContentArea>
    </>
  );
};
