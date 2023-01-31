import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useSaksbehandlere } from '../../../../simple-api-state/use-saksbehandlere';
import { useUser } from '../../../../simple-api-state/use-user';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../../styled-components/cards';
import { ContentArea } from '../../../../styled-components/filters-and-content';
import { IFullStatisticVurderingV1 } from '../../../../types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
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

  const saksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: filterIrrelevant(stats),
      })),
    [saksbehandlerList, saksbehandlere]
  );

  const relevantMine = useRelevantStatistics(mine);
  const relevantRest = useRelevantStatistics(rest);

  const datasets = [
    { label: 'Min enhet', data: relevantMine },
    { label: 'Andre enheter', data: relevantRest },
    { label: 'Alle enheter', data: [...relevantMine, ...relevantRest] },
    ...saksbehandlereStats,
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={mine} />
            <Omgjort stats={relevantMine} label="Omgjort av vår enhet" />
            <Gjennomsnittstid stats={relevantMine} />
            <Processed weeks={12} stats={relevantMine} />
            <Processed weeks={15} stats={relevantMine} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Min enhets omgjøringsprosent</CardTitle>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV1 stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <BehandlingstidHistogram stats={relevantMine} />
        </DynamicCard>

        <BehandlingstidOverTime stats={relevantMine} />
      </ContentArea>
    </>
  );
};
