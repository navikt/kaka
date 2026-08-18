import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { useSaksbehandlere } from '@app/simple-api-state/use-saksbehandlere';
import { useUser } from '@app/simple-api-state/use-user';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { useMemo } from 'react';
import { LoadingOverlay } from '../../../loader/overlay';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../../charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { COLORS } from '../../comparison/get-default-color';
import { filterIrrelevant } from '../../filters/relevant';
import { useRelevantStatistics } from '../../hooks/use-relevant-statistics';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';
import { Card, ChartsWrapper, StatisticsWrapper } from '../../wrappers/wrappers';

type SaksbehandlerStats = Record<string, IFullStatisticVurderingV2[]>;

interface Props {
  myEnhet: IFullStatisticVurderingV2[];
  otherEnheter: IFullStatisticVurderingV2[];
  saksbehandlere: SaksbehandlerStats;
  isLoading: boolean;
}

export const ContentV2 = ({ myEnhet, otherEnheter, isLoading, saksbehandlere }: Props) => {
  const userData = useUser();
  const { data: saksbehandlerList = [] } = useSaksbehandlere(userData.ansattEnhet.id);

  const selectedSaksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: filterIrrelevant(stats, KvalitetsvurderingVersion.V2),
      })),
    [saksbehandlerList, saksbehandlere],
  );

  const relevantMyEnhet = useRelevantStatistics(myEnhet, KvalitetsvurderingVersion.V2);
  const relevantOtherEnheter = useRelevantStatistics(otherEnheter, KvalitetsvurderingVersion.V2);

  const relevantSelected = useMemo(
    () =>
      Object.keys(saksbehandlere).length > 0
        ? Object.values(saksbehandlere).flatMap((stats) => filterIrrelevant(stats, KvalitetsvurderingVersion.V2))
        : relevantMyEnhet,
    [saksbehandlere, relevantMyEnhet],
  );

  const datasets = useMemo(
    () => [
      { label: 'Vår enhet', data: relevantMyEnhet },
      { label: 'Andre enheter', data: relevantOtherEnheter },
      { label: 'Alle enheter', data: [...relevantMyEnhet, ...relevantOtherEnheter] },
      ...selectedSaksbehandlereStats,
    ],
    [relevantMyEnhet, relevantOtherEnheter, selectedSaksbehandlereStats],
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
    <StatisticsWrapper>
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={myEnhet} version={KvalitetsvurderingVersion.V2} />
          <TotalProcessed length={relevantMyEnhet.length} version={KvalitetsvurderingVersion.V2} />
          <Omgjort version={KvalitetsvurderingVersion.V2} stats={relevantMyEnhet} label="Omgjort av vår enhet" />
          <Gjennomsnittstid stats={relevantMyEnhet} />
          <Processed weeks={12} stats={relevantMyEnhet} />
          <Processed weeks={15} stats={relevantMyEnhet} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card rowSpan={2} colSpan={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V2}
            title="Min enhets omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV2 datasets={datasets} />
        <UtfallGraph stats={relevantSelected} title="Utfall" />
        <Hjemler stats={relevantSelected} title="Hjemler" />
        <BehandlingstidHistogram stats={relevantSelected} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        <BehandlingstidOverTime stats={behandlingstidStats} title="Behandlingstid" />
      </ChartsWrapper>
    </StatisticsWrapper>
  );
};
