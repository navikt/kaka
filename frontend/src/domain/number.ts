export const round = (n: number, decimals = 1) =>
  n.toLocaleString('nb-no', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
