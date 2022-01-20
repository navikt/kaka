export const percent = (value: number, total: number): string => {
  const p = Math.round((value / total) * 1000) / 10;
  return `${p} % (${value})`;
};

export const tickCallback = (value: number | string, total: number): string => {
  if (typeof value === 'string') {
    return value;
  }

  const p = Math.round((value / total) * 100);
  return `${p} %`;
};

const MIN_LENGTH = 40;
const ELLIPSIS = ' ... ';
const PART = MIN_LENGTH / 2 - ELLIPSIS.length;

export const truncateLabel = (label: string | number) => {
  if (typeof label === 'string' && label.length > MIN_LENGTH) {
    return `${label.substring(0, PART)}${ELLIPSIS}${label.substring(label.length - PART)}`;
  }

  return label;
};
