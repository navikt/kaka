import { NAV_COLORS } from '../../../colors/colors';
import { StatsDate } from '../../../types/statistics/common';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
  vedtaksinstansBehandlingstidDays: number;
  kaBehandlingstidDays: number;
  totalBehandlingstidDays: number;
}

export const useBehandlingstidOverTime = (stats: Stat[]) => [
  {
    label: 'Vedtaksinstans',
    color: NAV_COLORS.lightblue[200],
    data: stats.map(({ avsluttetAvSaksbehandler, vedtaksinstansBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: vedtaksinstansBehandlingstidDays,
    })),
  },
  {
    label: 'Klageinstans',
    color: NAV_COLORS.purple[200],
    data: stats.map(({ avsluttetAvSaksbehandler, kaBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: kaBehandlingstidDays,
    })),
  },
  {
    label: 'Totalt',
    color: NAV_COLORS.green[200],
    data: stats.map(({ avsluttetAvSaksbehandler, totalBehandlingstidDays }) => ({
      avsluttetAvSaksbehandler,
      behandlingstidDays: totalBehandlingstidDays,
    })),
  },
];
