import { describe, expect, it } from 'bun:test';
import { validateId } from './validate-id';

describe('validateId', () => {
  it('should accept valid fnr.', () => {
    expect.assertions(1);

    const actual = validateId('12345678910');
    expect(actual).toBeNull();
  });

  it('should accept valid ogrnr.', () => {
    expect.assertions(1);

    const actual = validateId('123456789');
    expect(actual).toBeNull();
  });

  it('should accept valid fnr. with space', () => {
    expect.assertions(1);

    const actual = validateId('123456 78910');
    expect(actual).toBeNull();
  });

  it('should return error for ID with invalid length', () => {
    expect.assertions(1);

    const actual = validateId('1234567891');
    expect(actual).not.toBeNull();
  });

  it('should return error for ID with invalid characters', () => {
    expect.assertions(1);

    const actual = validateId('qwertyuio');
    expect(actual).not.toBeNull();
  });
});
