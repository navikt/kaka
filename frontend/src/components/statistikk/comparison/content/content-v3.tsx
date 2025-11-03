import { CardSize, DynamicCard } from '@app/components/statistikk/card/card';
import { BehandlingstidComparison } from '@app/components/statistikk/charts/comparison/behandlingstid';
import { BehandlingstidOverTime } from '@app/components/statistikk/charts/comparison/behandlingstid-over-time';
import { OmgjoeringsprosentOverTime } from '@app/components/statistikk/charts/comparison/omgjoeringsprosent-over-time';
import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { Omgjoeringsprosent } from '@app/components/statistikk/charts/omgjoeringsprosent';
import { KvalitetsvurderingerV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/kvalitetsvurderinger';
import { filterIrrelevant } from '@app/components/statistikk/filters/relevant';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import type { IComparedFullStatisticVurderingV3 } from '@app/types/statistics/v3';
import { LoadingOverlay } from '../../../loader/overlay';

interface Props {
  stats: IComparedFullStatisticVurderingV3[];
  isLoading: boolean;
}

export const ContentV3 = ({ stats, isLoading }: Props) => {
  const datasets = stats.map(({ label, vurderinger, color }) => ({
    label,
    color,
    data: filterIrrelevant(vurderinger),
  }));

  return (
    <ContentArea>
      <LoadingOverlay isLoading={isLoading} />

      <DynamicCard size={CardSize.LARGE}>
        <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
          Omgjøringsprosent
        </CardTitleWithExplainer>
        <Omgjoeringsprosent stats={datasets} />
      </DynamicCard>

      <TypeWarning />
      <KvalitetsvurderingerV3 datasets={datasets} />

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Omgjøringsprosent per uke</CardTitle>
        <OmgjoeringsprosentOverTime stats={datasets} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Gjennomsnittlig behandlingstid</CardTitle>
        <BehandlingstidComparison stats={datasets} />
      </DynamicCard>

      <BehandlingstidOverTime datasets={datasets} />
    </ContentArea>
  );
};
