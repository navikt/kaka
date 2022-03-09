import { IKodeverkValue } from '../types/kodeverk';
import { IUser, Role } from '../types/user';
import { UserAccess, getUserAccess } from './use-user-access';

describe('getUserAccess', () => {
  it('gives access to klageinstansleder', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KLAGE_LEDER]);

    const expected: UserAccess = {
      isKlageinstansleder: true,
      isSaksbehandler: false,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('gives access to saksbehandler', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KAKA_SAKSBEHANDLER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: true,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('gives access to styringsenhetleder', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('styringsenhet', [Role.ROLE_KLAGE_LEDER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: true,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('gives access to vedtaksinstansleder', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('vedtaksinstansenhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: true,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('denies access to user without any roles', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('randomenhet', []);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('denies access to vedtaksinstansleder without valid vedtaksinstans', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('invalid vedtaksinstansenhet')];
    const user: IUser = getTestUser('vedtaksinstansenhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('denies access to klageinstansleder without valid klageinstans (but gives access as styringsenhetleder)', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('invalid klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KLAGE_LEDER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: true,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });

  it('denies access to saksbehandler without valid klageinstans', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('invalid klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KAKA_SAKSBEHANDLER]);

    const expected: UserAccess = {
      isKlageinstansleder: false,
      isSaksbehandler: false,
      isStyringsenhetleder: false,
      isVedtaksinstansleder: false,
    };

    expect(getUserAccess(user, klageenheter, enheter)).toStrictEqual(expected);
  });
});

const getTestUser = (ansattEnhetId: string, roles: Role[]): IUser => ({
  ansattEnhet: {
    id: ansattEnhetId,
    beskrivelse: 'NAV Test',
    navn: ansattEnhetId,
  },
  roller: roles,
  ident: '',
  navn: {
    fornavn: '',
    etternavn: '',
    sammensattNavn: '',
  },
});

const getTestEnhet = (id: string): IKodeverkValue => ({
  id,
  navn: id,
  beskrivelse: `Enhet ${id}`,
});
