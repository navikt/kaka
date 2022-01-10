import { ChartOptions } from 'chart.js';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFilteredStatistics } from '../../../hooks/use-statistics';
import { useBuckets } from '../hooks/use-buckets';

const useOptions = (onClick?: ChartOptions<'bar'>['onClick']): ChartOptions<'bar'> => ({
  onClick,
  responsive: true,
  animation: {
    duration: 200,
    easing: 'easeOutQuart',
  },
  animations: {},
  scales: {
    y: {
      title: {
        display: true,
        text: 'Antall',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      beginAtZero: true,
      bounds: 'ticks',
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Innen uker',
        font: {
          weight: 'bold',
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 14,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      labels: {
        font: {
          size: 16,
          family: '"Source Sans Pro", Arial, sans-serif',
        },
      },
    },
    title: {
      display: false,
      font: {
        size: 24,
        family: '"Source Sans Pro", Arial, sans-serif',
      },
    },
  },
});

interface Props {
  type: BehandlingsTidEnum;
}

enum BehandlingsTidEnum {
  TOTAL,
  KA,
}

export const RegistreringTimeDistribution = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = Number.parseInt(searchParams.get('bht') ?? BehandlingsTidEnum.KA.toString(), 10);

  const setType = (behandlingstidType: BehandlingsTidEnum) => {
    searchParams.set('bht', behandlingstidType.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      <h1>Behandlingstid</h1>

      <StyledRadiogruppe>
        <Radio
          label="Total behandlingstid"
          value={BehandlingsTidEnum.TOTAL}
          name="totalBehandlingstidDays"
          onChange={() => setType(BehandlingsTidEnum.TOTAL)}
          checked={type === BehandlingsTidEnum.TOTAL}
        />
        <Radio
          label="KA-behandlingstid"
          value={BehandlingsTidEnum.KA}
          name="behandlingstidDays"
          onChange={() => setType(BehandlingsTidEnum.KA)}
          checked={type === BehandlingsTidEnum.KA}
        />
      </StyledRadiogruppe>
      <Histogram type={type} />
    </>
  );
};

const StyledRadiogruppe = styled(RadioGruppe)`
  display: flex;
  justify-content: center;

  .skjemaelement {
    margin-right: 1em;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Histogram = ({ type }: Props) => {
  const stats = useFilteredStatistics();
  const field = type === BehandlingsTidEnum.TOTAL ? 'totalBehandlingstidDays' : 'behandlingstidDays';
  const fieldStats = useMemo(() => stats.map((stat) => stat[field]), [stats, field]);
  const [labels, data] = useBuckets(fieldStats, 7);

  const options = useOptions();

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            data,
            barPercentage: 0.95,
            categoryPercentage: 0.95,
            backgroundColor: '#3386E0',
          },
        ],
      }}
    />
  );
};
