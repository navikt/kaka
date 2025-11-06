import type { IStatisticVurderingV3 } from '@app/types/statistics/v3';

type Counts = Partial<Record<keyof IStatisticVurderingV3, number>>;

interface Calculation {
  reasons: Counts;
  reasonArray: [string, number][];
}

export const calculateReasons = (
  data: IStatisticVurderingV3[],
  reasonIds: (keyof IStatisticVurderingV3)[],
): Calculation => {
  const reasons = data.reduce<Partial<Record<keyof IStatisticVurderingV3, number>>>((acc, sak) => {
    const mangelfulleIds = reasonIds.filter((id) => sak[id] === true);

    if (mangelfulleIds.length > 0) {
      for (const id of mangelfulleIds) {
        acc[id] = (acc[id] ?? 0) + 1;
      }
    }

    return acc;
  }, {});

  const reasonArray = Object.entries(reasons);

  return { reasons, reasonArray };
};
