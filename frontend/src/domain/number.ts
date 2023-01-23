export const toPercent = (n: number, decimals = 1) => {
  const precision = 10 ** decimals;

  return Math.floor(n * 100 * precision) / precision;
};

export const round = (n: number, decimals = 1) => {
  const precision = 10 ** decimals;

  return Math.round(n * precision) / precision;
};
