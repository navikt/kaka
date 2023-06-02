const NUMERIC_REGEX = /^\d+$/;

export const formatId = (id: string): string => {
  if (id.length === 11 && id.match(NUMERIC_REGEX)) {
    return formatFnr(id);
  }

  if (id.length === 9 && id.match(NUMERIC_REGEX)) {
    return formatOrgNum(id);
  }

  return id;
};

export const formatIdOrNull = (id: string | null): string | null => {
  if (id === null) {
    return null;
  }

  return formatId(id);
};

const formatOrgNum = (n: string): string => {
  const [a = '', b = '', c = '', d = '', e = '', f = '', g = '', h = '', i = ''] = n;

  return `${a}${b}${c} ${d}${e}${f} ${g}${h}${i}`;
};

const formatFnr = (n: string): string => {
  const [a = '', b = '', c = '', d = '', e = '', f = '', g = '', h = '', i = '', j = '', k = ''] = n;

  return `${a}${b}${c}${d}${e}${f} ${g}${h}${i}${j}${k}`;
};
