import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IComparedFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { Card } from '../../card/card';
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
    data: filterIrrelevant(vurderinger, KvalitetsvurderingVersion.V2),
  }));

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={isLoading} />

      <ChartsWrapper>
        <Card span={2}>
          <div className="h-100">
            <Omgjoeringsprosent
              stats={datasets}
              version={KvalitetsvurderingVersion.V2}
              title="Omgjøringsprosent"
              helpText={OMGJORT_HELP_TEXT_V1_V2}
            />
          </div>
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV2 datasets={datasets} />

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
