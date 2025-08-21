import { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { StatsDate } from '@app/types/statistics/common';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
  vedtaksinstansBehandlingstidDays: number;
  kaBehandlingstidDays: number;
  totalBehandlingstidDays: number;
}

export const useBehandlingstidOverTime = (stats: Stat[]) => [
  {
    label: 'Vedtaksinstans',
    color: ColorToken.BrandBlue500,
    data: stats.map(({ avsluttetAvSaksbehandler, vedtaksinstansBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: vedtaksinstansBehandlingstidDays,
    })),
  },
  {
    label: 'Klageinstans',
    color: ColorToken.Purple500,
    data: stats.map(({ avsluttetAvSaksbehandler, kaBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: kaBehandlingstidDays,
    })),
  },
  {
    label: 'Totalt',
    color: ColorToken.Success500,
    data: stats.map(({ avsluttetAvSaksbehandler, totalBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: totalBehandlingstidDays,
    })),
  },
];
