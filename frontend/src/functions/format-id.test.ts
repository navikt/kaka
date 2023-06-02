import { formatIdOrNull } from './format-id';

describe('format IDs', () => {
  it('should format fødselsnummer', () => {
    expect.assertions(1);

    const expected = '311282 12345';
    const actual = formatIdOrNull('31128212345');
    expect(actual).toBe(expected);
  });

  it('should format org. number', () => {
    expect.assertions(1);

    const expected = '123 456 789';
    const actual = formatIdOrNull('123456789');
    expect(actual).toBe(expected);
  });

  it('should not format other strings', () => {
    expect.assertions(1);

    const expected = 'other string';
    const actual = formatIdOrNull('other string');
    expect(actual).toBe(expected);
  });
});
