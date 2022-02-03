export const cleanNumberDisplay = (n: number | undefined): string =>
  Number.isNaN(n) || typeof n !== 'number' ? '-' : n.toLocaleString('nb-NB');
