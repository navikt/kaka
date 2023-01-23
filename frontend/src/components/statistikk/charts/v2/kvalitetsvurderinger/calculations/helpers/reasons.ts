import { IKvalitetsvurderingData } from '../../../../../../../types/kvalitetsvurdering/v2';
import { IFullStatisticVurderingV2 } from '../../../../../../../types/statistics/v2';

type Counts = Partial<Record<keyof IKvalitetsvurderingData, number>>;

interface Calculation {
  reasons: Counts;
  totalReasonsCount: number;
  reasonArray: [string, number][];
}

export const calculateReasons = (
  data: Partial<IFullStatisticVurderingV2>[],
  reasonIds: (keyof IKvalitetsvurderingData)[]
): Calculation => {
  const reasons = data.reduce<Partial<Record<keyof IKvalitetsvurderingData, number>>>((acc, sak) => {
    const mangelfulleIds = reasonIds.filter((id) => sak[id] === true);

    if (mangelfulleIds.length !== 0) {
      mangelfulleIds.forEach((id) => {
        acc[id] = (acc[id] ?? 0) + 1;
      });
    }

    return acc;
  }, {});

  const reasonArray = Object.entries(reasons);
  const totalReasonsCount = reasonArray.reduce((total, [, count]) => total + count, 0);

  return { reasons, reasonArray, totalReasonsCount };
};
