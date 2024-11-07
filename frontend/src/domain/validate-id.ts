const DIGITS_REGEX = /^\d+$/;

export const validateId = (inputValue: string): string | null => {
  const cleanedValue = inputValue.replaceAll(' ', '');

  if (cleanedValue.length === 0) {
    return null;
  }

  const hasValidCharacters = DIGITS_REGEX.test(cleanedValue);

  if (!hasValidCharacters) {
    return 'Fnr. og orgnr. kan kun bestå av siffer';
  }

  const hasValidLength = cleanedValue.length === 9 || cleanedValue.length === 11;

  if (!hasValidLength) {
    return 'Fnr. må bestå av 11 tegn. Orgnr. må bestå av 9 tegn.';
  }

  return null;
};
