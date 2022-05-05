const percentFormat = new Intl.NumberFormat('nb-NB', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

export const formatPercent = (n: number): string => {
  if (Number.isNaN(n) || typeof n !== 'number') {
    return '-';
  }

  return percentFormat.format(n);
};
