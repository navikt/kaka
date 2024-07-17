import { ISaksdata } from '@app/types/statistics/common';
import { useBehandlingstidParam } from '../../hooks/use-behandlingstid-param';
import { ToggleTotalOrKA } from '../../toggle-ka-total';
import { BehandlingstidEnum } from '../../types';
import { BehandlingstidOverTime as BehandlingstidOverTimeChart } from '../behandlingstid-over-time';

type Subset = Pick<ISaksdata, 'totalBehandlingstidDays' | 'kaBehandlingstidDays' | 'vedtaksinstansBehandlingstidDays'>;

const KEY_MAP: Record<BehandlingstidEnum, keyof Subset> = {
  [BehandlingstidEnum.TOTAL]: 'totalBehandlingstidDays',
  [BehandlingstidEnum.KA]: 'kaBehandlingstidDays',
  [BehandlingstidEnum.VEDTAKSINSTANS]: 'vedtaksinstansBehandlingstidDays',
};

interface DataSet {
  label: string;
  color: string;
  data: ISaksdata[];
}

interface Props {
  datasets: DataSet[];
}

export const BehandlingstidOverTime = ({ datasets }: Props) => {
  const [behandlingstid] = useBehandlingstidParam();

  const property = KEY_MAP[behandlingstid];

  return (
    <BehandlingstidOverTimeChart
      stats={datasets.map((d) => ({
        ...d,
        data: d.data.map(({ [property]: behandlingstidDays, avsluttetAvSaksbehandler }) => ({
          behandlingstidDays,
          avsluttetAvSaksbehandler,
        })),
      }))}
    >
      <ToggleTotalOrKA />
    </BehandlingstidOverTimeChart>
  );
};
