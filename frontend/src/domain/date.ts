const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // 2020-10-29
const isoTimeRegex = /^\d{2}:\d{2}:\d{2}\.\d+$/; // 14:25:19.734593
const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z?$/; // 2020-10-29T14:25:19.734593Z

type ISODate = string;
type ISODateTime = string;
type ISOTime = string;
type prettyDate = string;
type prettyDateTime = string;
type prettyTime = string;

/** @public */
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

export const isoDateTimeToPrettyDate = (isoDateTime: ISODateTime | null | undefined): prettyDateTime | null => {
  if (isoDateTime === null || typeof isoDateTime === 'undefined' || !isoDateTimeRegex.test(isoDateTime)) {
    return null;
  }

  const [isoDate] = isoDateTime.split('T');

  return isoDateToPretty(isoDate);
};

/** @public */
export const isoTimeToPretty = (isoTime: ISOTime | null | undefined): prettyTime | null => {
  if (isoTime === null || typeof isoTime === 'undefined' || !isoTimeRegex.test(isoTime)) {
    return null;
  }

  return isoTime.split('.')[0] ?? null;
};

export const isoDateToPretty = (isoDate: ISODate | null | undefined): prettyDate | null => {
  if (isoDate === null || typeof isoDate === 'undefined' || !isoDateRegex.test(isoDate)) {
    return null;
  }

  return isoDate.split('-').reverse().join('.');
};

const prettyRegex = /^\d{2}.\d{2}.\d{4}$/;

/** @public */
export const prettyDateToISO = (prettyDate: prettyDate | null): ISODate | null => {
  if (prettyDate === null || !prettyRegex.test(prettyDate)) {
    return null;
  }

  return prettyDate.split('.').reverse().join('-');
};
