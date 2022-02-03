import { IKodeverkValue } from '../types/kodeverk';
import { IUser, Role } from '../types/user';
import { FOERSTEINSTANS_ROLES, KA_ROLES, hasAccess, hasRequiredEnhetAccess } from './use-has-access';

describe('hasAccess validates roles and enhet', () => {
  it('gives all users access when no roles required', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KLAGE_LEDER]);

    const requiredRoles: Role[] = [];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(true);
  });

  it('gives KA leder access, if also employed in KA-enhet', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KLAGE_LEDER]);

    const requiredRoles: Role[] = [Role.ROLE_KLAGE_LEDER];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(true);
  });

  it('gives førsteinstans leder access, if also employed in a førsteinstans', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('vedtaksinstansenhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const requiredRoles: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(true);
  });

  it('denies KA saksbehandler access, KA leder role is required', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('klageinstansenhet', [Role.ROLE_KLAGE_SAKSBEHANDLER]);

    const requiredRoles: Role[] = [Role.ROLE_KLAGE_LEDER];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(false);
  });

  it('denies førsteinstans leder access, if KA saksbehandler role is required', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('vedtaksinstansenhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const requiredRoles: Role[] = [Role.ROLE_KLAGE_SAKSBEHANDLER];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(false);
  });

  it('denies user with KA leder role, as required, because user is not employed in a KA enhet', () => {
    expect.assertions(1);

    const klageenheter: IKodeverkValue[] = [getTestEnhet('klageinstansenhet')];
    const enheter: IKodeverkValue[] = [getTestEnhet('vedtaksinstansenhet')];
    const user: IUser = getTestUser('styringsenheten', [Role.ROLE_KLAGE_LEDER]);

    const requiredRoles: Role[] = [Role.ROLE_KLAGE_LEDER];

    expect(hasAccess(klageenheter, enheter, requiredRoles, user)).toBe(false);
  });
});

describe('hasRequiredEnhetAccess', () => {
  it('gives access with no required enhet roles', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [];
    const enhetRoles: Role[] = [];
    const requiredRoles: Role[] = [];
    const user = getTestUser('', []);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(true);
  });

  it('gives access for users with correct KA role and tilknyttet enhet', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = KA_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_KLAGE_SAKSBEHANDLER];
    const user = getTestUser('enhet', [Role.ROLE_KLAGE_SAKSBEHANDLER]);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(true);
  });

  it('gives access for users with correct førsteinstans role and tilknyttet enhet', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = FOERSTEINSTANS_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];
    const user = getTestUser('enhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(true);
  });

  it('denies KA access with wrong user roles', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = KA_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_KLAGE_SAKSBEHANDLER];
    const user = getTestUser('enhet', [Role.ROLE_VEDTAKSINSTANS_LEDER]);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(false);
  });

  it('denies KA access for users with no KA-enheter', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = KA_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_KLAGE_SAKSBEHANDLER];
    const user = getTestUser('enhet', []);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(false);
  });

  it('denies førsteinstans access with wrong user roles', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = FOERSTEINSTANS_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];
    const user = getTestUser('enhet', [Role.ROLE_KLAGE_SAKSBEHANDLER]);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(false);
  });

  it('denies førsteinstans access for users with no førsteinstansenheter', () => {
    expect.assertions(1);

    const enheter: IKodeverkValue[] = [getTestEnhet('enhet')];
    const enhetRoles: Role[] = FOERSTEINSTANS_ROLES;
    const requiredRoles: Role[] = [Role.ROLE_VEDTAKSINSTANS_LEDER];
    const user = getTestUser('enhet', []);

    const actual = hasRequiredEnhetAccess(enheter, enhetRoles, requiredRoles, user);
    expect(actual).toBe(false);
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
  klageenheter: [],
});

const getTestEnhet = (id: string): IKodeverkValue => ({
  id,
  navn: id,
  beskrivelse: `Enhet ${id}`,
});
