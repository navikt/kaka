import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { MainReasonsVurdering } from '../../types';

const MAIN_REASON_IDS: Readonly<MainReason[]> = Object.freeze([
  MainReason.Klageforberedelsen,
  MainReason.Utredningen,
  MainReason.Vedtaket,
  MainReason.BrukAvRaadgivendeLege,
]);

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

export const calculateMainReasons = (data: MainReasonsVurdering[]): Calculation => {
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
    },
  );

  const totalMainReasonsCount = Object.values(mainReasons).reduce((total, count) => total + count, 0);

  return { mainReasons, totalMainReasonsCount };
};
