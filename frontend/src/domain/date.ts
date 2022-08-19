const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // 2020-10-29
const isoTimeRegex = /^\d{2}:\d{2}:\d{2}\.\d+$/; // 14:25:19.734593
const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z?$/; // 2020-10-29T14:25:19.734593Z

type ISODate = string;
type ISODateTime = string;
type ISOTime = string;
type prettyDate = string;
type prettyDateTime = string;
type prettyTime = string;

// eslint-disable-next-line import/no-unused-modules
export const isoDateTimeToPretty = (isoDateTime: ISODateTime | null): prettyDateTime | null => {
  if (isoDateTime === null || !isoDateTimeRegex.test(isoDateTime)) {
    return null;
  }

  const [isoDate, isoTime] = isoDateTime.split('T');

  const prettyDate = isoDateToPretty(isoDate);
  const prettyTime = isoTimeToPretty(isoTime);

  if (prettyDate === null || prettyTime === null) {
    return null;
  }

  return `${prettyDate} ${prettyTime}`;
};

export const isoDateTimeToPrettyDate = (isoDateTime: ISODateTime | null): prettyDateTime | null => {
  if (isoDateTime === null || !isoDateTimeRegex.test(isoDateTime)) {
    return null;
  }

  const [isoDate] = isoDateTime.split('T');

  return isoDateToPretty(isoDate);
};

// eslint-disable-next-line import/no-unused-modules
export const isoTimeToPretty = (isoTime: ISOTime | null): prettyTime | null => {
  if (isoTime === null || !isoTimeRegex.test(isoTime)) {
    return null;
  }

  return isoTime.split('.')[0];
};

// eslint-disable-next-line import/no-unused-modules
export const isoDateToPretty = (isoDate: ISODate | null): prettyDate | null => {
  if (isoDate === null || !isoDateRegex.test(isoDate)) {
    return null;
  }

  return isoDate.split('-').reverse().join('.');
};

const prettyRegex = /^\d{2}.\d{2}.\d{4}$/;

// eslint-disable-next-line import/no-unused-modules
export const prettyDateToISO = (prettyDate: prettyDate | null): ISODate | null => {
  if (prettyDate === null || !prettyRegex.test(prettyDate)) {
    return null;
  }

  return prettyDate.split('.').reverse().join('-');
};
