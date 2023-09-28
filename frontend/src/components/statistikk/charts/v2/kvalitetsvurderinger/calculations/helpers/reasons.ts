import { IStatisticVurderingV2 } from '@app/types/statistics/v2';

type Counts = Partial<Record<keyof IStatisticVurderingV2, number>>;

interface Calculation {
  reasons: Counts;
  totalReasonsCount: number;
  reasonArray: [string, number][];
}

export const calculateReasons = (
  data: IStatisticVurderingV2[],
  reasonIds: (keyof IStatisticVurderingV2)[],
): Calculation => {
  const reasons = data.reduce<Partial<Record<keyof IStatisticVurderingV2, number>>>((acc, sak) => {
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
