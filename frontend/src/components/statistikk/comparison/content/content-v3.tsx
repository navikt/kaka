import { Card } from '@app/components/statistikk/card/card';
import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { BehandlingstidComparison } from '@app/components/statistikk/charts/comparison/behandlingstid';
import { BehandlingstidOverTime } from '@app/components/statistikk/charts/comparison/behandlingstid-over-time';
import { OmgjoeringsprosentOverTime } from '@app/components/statistikk/charts/comparison/omgjoeringsprosent-over-time';
import { Omgjoeringsprosent } from '@app/components/statistikk/charts/omgjoeringsprosent';
import { KvalitetsvurderingerV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/kvalitetsvurderinger';
import { filterIrrelevant } from '@app/components/statistikk/filters/relevant';
import { OMGJORT_HELP_TEXT_V3 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
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
    data: filterIrrelevant(vurderinger, KvalitetsvurderingVersion.V3),
  }));

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={isLoading} />
      <ChartsWrapper>
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V3}
            title="Omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V3}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV3 datasets={datasets} />

        <Card span={2}>
          <OmgjoeringsprosentOverTime stats={datasets} title="Omgjøringsprosent per uke" />
        </Card>

        <Card span={2}>
          <BehandlingstidComparison stats={datasets} title="Gjennomsnittlig behandlingstid" />
        </Card>

        <Card span={2}>
          <BehandlingstidOverTime datasets={datasets} />
        </Card>
      </ChartsWrapper>
    </div>
  );
};
