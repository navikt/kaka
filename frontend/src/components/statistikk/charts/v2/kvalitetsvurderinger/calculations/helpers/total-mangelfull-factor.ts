import { Radiovalg } from '../../../../../../../types/kvalitetsvurdering/radio';
import { MAIN_REASON_IDS } from '../../../../../../../types/kvalitetsvurdering/texts/structures';
import { MainReasonsVurdering } from '../../types';

export const calculateTotalMangelfullFactor = (data: MainReasonsVurdering[]) =>
  data.filter((v) => MAIN_REASON_IDS.some((id) => v[id] === Radiovalg.MANGELFULLT)).length / data.length;
