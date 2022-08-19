const NUMERIC_REGEX = /^\d+$/;

export const formatId = (id: string | null): string | null => {
  if (id === null) {
    return null;
  }

  if (id.length === 11 && id.match(NUMERIC_REGEX)) {
    return formatFnr(id);
  }

  if (id.length === 9 && id.match(NUMERIC_REGEX)) {
    return formatOrgNum(id);
  }

  return id;
};

const formatOrgNum = (n: string): string => {
  const [a, b, c, d, e, f, g, h, i] = n;

  return `${a}${b}${c} ${d}${e}${f} ${g}${h}${i}`;
};

const formatFnr = (n: string | undefined): string | null => {
  if (typeof n === 'undefined') {
    return null;
  }

  const [a, b, c, d, e, f, g, h, i, j, k] = n;

  return `${a}${b}${c}${d}${e}${f} ${g}${h}${i}${j}${k}`;
};
