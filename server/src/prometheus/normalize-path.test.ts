import { describe, expect, it } from '@jest/globals';
import { normalizePath } from './normalize-path';

describe('normalizePath', () => {
  it('should normalize path', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/kaka-api/api/saksdata/12345/fullfoer');
    const expected = '/kaka-api/api/saksdata/:id/fullfoer';
    expect(actual).toBe(expected);
  });

  it('should normalize path with UUID ID and subpath', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/kaka-api/api/saksdata/123e4588-e89b-12d3-a456-426655440000/fullfoer');
    const expected = '/kaka-api/api/saksdata/:id/fullfoer';
    expect(actual).toBe(expected);
  });

  it('should normalize path with UUID ID', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/kaka-api/api/saksdata/123e4588-e89b-12d3-a456-426655440000');
    const expected = '/kaka-api/api/saksdata/:id';
    expect(actual).toBe(expected);
  });

  it('should normalize path with numeric ID, without second api prefix', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/some-other-api/saksdata/12345/fullfoer');
    const expected = '/some-other-api/saksdata/:id/fullfoer';
    expect(actual).toBe(expected);
  });

  it('should normalize path UUID but without second api prefix', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/some-other-api/saksdata/123e4588-e89b-12d3-a456-426655440000/fullfoer');
    const expected = '/some-other-api/saksdata/:id/fullfoer';
    expect(actual).toBe(expected);
  });

  it('should normalize query params with NAV-ident', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/kaka-api/saksdataliste?fullfoert=true&saksbehandlere=A123456');
    const expected = '/kaka-api/saksdataliste?fullfoert=true&saksbehandlere=NAVIDENT';
    expect(actual).toBe(expected);
  });

  it('should normalize query params with 2 NAV-idents', () => {
    expect.assertions(1);
    const actual = normalizePath('/api/kaka-api/saksdataliste?fullfoert=true&saksbehandlere=A123456,B098765');
    const expected = '/kaka-api/saksdataliste?fullfoert=true&saksbehandlere=NAVIDENT,NAVIDENT';
    expect(actual).toBe(expected);
  });
});
