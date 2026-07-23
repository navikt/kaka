import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IComparedFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { Card } from '../../card/card';
import { BehandlingstidComparison } from '../../charts/comparison/behandlingstid';
import { BehandlingstidOverTime } from '../../charts/comparison/behandlingstid-over-time';
import { OmgjoeringsprosentOverTime } from '../../charts/comparison/omgjoeringsprosent-over-time';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { filterIrrelevant } from '../../filters/relevant';

interface Props {
  stats: IComparedFullStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ stats, isLoading }: Props) => {
  const datasets = stats.map(({ label, vurderinger, color }) => ({
    label,
    color,
    data: filterIrrelevant(vurderinger, KvalitetsvurderingVersion.V1),
  }));

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={isLoading} />

      <ChartsWrapper>
        <Card span={2}>
          <div className="h-100">
            <Omgjoeringsprosent
              stats={datasets}
              version={KvalitetsvurderingVersion.V1}
              title="Omgjøringsprosent"
              helpText={OMGJORT_HELP_TEXT_V1_V2}
            />
          </div>
        </Card>

        <Card span={2}>
          <OmgjoeringsprosentOverTime stats={datasets} title="Omgjøringsprosent per uke" />
        </Card>

        <Card span={2}>
          <BehandlingstidComparison stats={datasets} title="Gjennomsnittlig behandlingstid" />
        </Card>

        <BehandlingstidOverTime datasets={datasets} />
      </ChartsWrapper>
    </div>
  );
};
