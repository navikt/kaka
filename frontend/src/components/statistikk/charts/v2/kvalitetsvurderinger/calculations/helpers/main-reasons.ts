import { Radiovalg } from '../../../../../../../types/kvalitetsvurdering/radio';
import { MAIN_REASON_IDS } from '../../../../../../../types/kvalitetsvurdering/texts/structures';
import { MainReason } from '../../../../../../../types/kvalitetsvurdering/v2';
import { IFullStatisticVurderingV2 } from '../../../../../../../types/statistics/v2';

interface Counts {
  [MainReason.Klageforberedelsen]: number;
  [MainReason.Utredningen]: number;
  [MainReason.Vedtaket]: number;
  [MainReason.BrukAvRaadgivendeLege]: number;
}

interface Calculation {
  mainReasons: Counts;
  totalMainReasonsCount: number;
}

export const calculateMainReasons = (data: Partial<IFullStatisticVurderingV2>[]): Calculation => {
  const mainReasons = data.reduce<Record<MainReason, number>>(
    (acc, sak) => {
      const mangelfulleIds = MAIN_REASON_IDS.filter((id) => sak[id] === Radiovalg.MANGELFULLT);
      const numberOfMangelfullt = mangelfulleIds.length;

      if (numberOfMangelfullt !== 0) {
        mangelfulleIds.forEach((id) => {
          acc[id] += 1;
        });
      }

      return acc;
    },
    {
      [MainReason.Klageforberedelsen]: 0,
      [MainReason.Utredningen]: 0,
      [MainReason.Vedtaket]: 0,
      [MainReason.BrukAvRaadgivendeLege]: 0,
    }
  );

  const totalMainReasonsCount = Object.values(mainReasons).reduce((total, count) => total + count, 0);

  return { mainReasons, totalMainReasonsCount };
};
