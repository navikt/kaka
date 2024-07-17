import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { CardTitle } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IComparedFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidComparison } from '../../charts/comparison/behandlingstid';
import { BehandlingstidOverTime } from '../../charts/comparison/behandlingstid-over-time';
import { OmgjoeringsprosentOverTime } from '../../charts/comparison/omgjoeringsprosent-over-time';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { KvalitetsvurderingerV2 } from '../../charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { filterIrrelevant } from '../../filters/relevant';

interface Props {
  stats: IComparedFullStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ stats, isLoading }: Props) => {
  const datasets = stats.map(({ label, vurderinger, color }) => ({
    label,
    color,
    data: filterIrrelevant(vurderinger),
  }));

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <ContentArea>
        <DynamicCard size={CardSize.LARGE}>
          <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
            Omgjøringsprosent
          </CardTitleWithExplainer>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <KvalitetsvurderingerV2 datasets={datasets} />

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
    </>
  );
};
