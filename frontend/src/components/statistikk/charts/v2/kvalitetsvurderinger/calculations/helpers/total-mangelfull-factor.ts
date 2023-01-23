import { Radiovalg } from '../../../../../../../types/kvalitetsvurdering/radio';
import { MinimalVurdering } from '../../types';
import { MAIN_REASON_IDS } from '../constants';

export const calculateTotalMangelfullFactor = (data: MinimalVurdering[]) =>
  data.filter((v) => MAIN_REASON_IDS.some((id) => v[id] === Radiovalg.MANGELFULLT)).length / data.length;
