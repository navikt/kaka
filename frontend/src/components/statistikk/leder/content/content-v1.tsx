import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { Hjemler } from '@app/components/statistikk/charts/hjemler';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { useSaksbehandlere } from '@app/simple-api-state/use-saksbehandlere';
import { useUser } from '@app/simple-api-state/use-user';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useMemo } from 'react';
import { QueryParams } from '../../../filters/filter-query-params';
import { useQueryFilters } from '../../../filters/hooks/use-query-filter';
import { LoadingOverlay } from '../../../loader/overlay';
import { Card } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
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
  const userData = useUser();
  const { data: saksbehandlerList = [] } = useSaksbehandlere(userData.ansattEnhet.id);
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const relevantSaksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: filterIrrelevant(stats, KvalitetsvurderingVersion.V1),
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

  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V1);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V1);

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
        color: COLORS[i] ?? ColorToken.Beige500,
        data: data.map(({ avsluttetAvSaksbehandler, kaBehandlingstidDays }) => ({
          avsluttetAvSaksbehandler,
          behandlingstidDays: kaBehandlingstidDays,
        })),
      })),
    [datasets],
  );

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={allData} version={KvalitetsvurderingVersion.V1} />
          <TotalProcessed length={relevantData.length} version={KvalitetsvurderingVersion.V1} />
          <Omgjort version={KvalitetsvurderingVersion.V1} stats={relevantData} label="Omgjort av vår enhet" />
          <Gjennomsnittstid stats={relevantData} />
          <Processed weeks={12} stats={relevantData} />
          <Processed weeks={15} stats={relevantData} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V1}
            title="Min enhets omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <Card span={4}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <TypeWarning />
          <KvalitetsvurderingerV1 stats={relevantData} />
        </Card>

        <Card span={2}>
          <UtfallGraph stats={allData} title="Utfall" />
        </Card>

        <Card span={3}>
          <Hjemler stats={relevantData} title="Hjemler" />
        </Card>

        <Card span={3}>
          <BehandlingstidHistogram stats={relevantData} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        </Card>

        <Card span={2}>
          <BehandlingstidOverTime stats={behandlingstidStats} title="Behandlingstid" />
        </Card>
      </ChartsWrapper>
    </div>
  );
};
