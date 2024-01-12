import { MAIN_REASON_IDS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { MainReasonsVurdering } from '../../types';

export const calculateTotalMangelfullFactor = (data: MainReasonsVurdering[]) =>
  data.filter((v) => MAIN_REASON_IDS.some((id) => v[id] === Radiovalg.MANGELFULLT)).length / data.length;
