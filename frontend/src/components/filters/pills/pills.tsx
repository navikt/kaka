import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import {
  useEnheter,
  useKlageenheter,
  useRegistreringshjemlerMap,
  useSakstyper,
  useYtelser,
} from '@app/simple-api-state/use-kodeverk';
import { useSaksbehandlere } from '@app/simple-api-state/use-saksbehandlere';
import { useUser } from '@app/simple-api-state/use-user';
import { useUtfall } from '@app/simple-api-state/use-utfall';
import { QueryParams } from '../../filters/filter-query-params';
import { VEDTAKSINSTANSGRUPPER } from '../../statistikk/total/vedtaksinstansgruppe-filter';
import { useQueryFilters } from '../hooks/use-query-filter';
import { KOMMENTARER_KODEVERK } from '../kommentarer';
import { MANGELFULLT_KODEVERK } from '../mangelfullt';
import { PillIcon, StyledLi, StyledPill } from './styled-components';

export { PillContainer } from './styled-components';

interface CommonProps<Q extends QueryParams> {
  queryKey: Q;
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  values: string[];
  category: string;
}

interface PillProps<Q extends QueryParams> extends CommonProps<Q> {
  id: string;
  name: string;
}

const Pill = <Q extends QueryParams>({ name, category, queryKey, setFilter, id, values }: PillProps<Q>) => (
  <StyledLi>
    <StyledPill
      title={`Fjern ${name} fra filter for ${category}`}
      onClick={() => setFilter(queryKey, ...values.filter((v) => v !== id))}
    >
      {name} <PillIcon />
    </StyledPill>
  </StyledLi>
);

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
}

export const YtelserPills = ({ setFilter }: Props) => {
  const { data: ytelser = [] } = useYtelser();
  const selected = useQueryFilters(QueryParams.YTELSER);

  const c = 'ytelser';
  const { YTELSER } = QueryParams;

  const pills = selected.map((id) => {
    const name = ytelser.find((y) => y.id === id)?.navn ?? id;

    return (
      <Pill key={id} id={id} queryKey={YTELSER} setFilter={setFilter} name={name} values={selected} category={c} />
    );
  });

  return <>{pills}</>;
};

export const SakstyperPills = ({ setFilter }: Props) => {
  const { data: sakstyper = [] } = useSakstyper();
  const selected = useQueryFilters(QueryParams.TYPES);

  const c = 'sakstyper';
  const { TYPES } = QueryParams;

  const pills = selected.map((id) => {
    const name = sakstyper.find((y) => y.id === id)?.navn ?? id;

    return <Pill key={id} id={id} queryKey={TYPES} setFilter={setFilter} name={name} values={selected} category={c} />;
  });

  return <>{pills}</>;
};

export const UtfallPills = ({ setFilter }: Props) => {
  const { data: utfall = [] } = useUtfall();
  const selected = useQueryFilters(QueryParams.UTFALL);

  const c = 'utfall';
  const { UTFALL } = QueryParams;

  const pills = selected.map((id) => {
    const name = utfall.find((y) => y.id === id)?.navn ?? id;

    return <Pill key={id} id={id} queryKey={UTFALL} setFilter={setFilter} name={name} values={selected} category={c} />;
  });

  return <>{pills}</>;
};

export const EnheterPills = ({ setFilter }: Props) => {
  const { data: enheter = [] } = useEnheter();
  const selected = useQueryFilters(QueryParams.ENHETER);

  const mappedValues = useMemo(() => enheter.filter(({ id }) => selected.includes(id)), [enheter, selected]);
  const c = 'utfall';
  const { ENHETER } = QueryParams;

  const pills = mappedValues.map(({ id, navn }) => (
    <Pill key={id} id={id} queryKey={ENHETER} setFilter={setFilter} name={navn} values={selected} category={c} />
  ));

  return <>{pills}</>;
};

export const KlageenheterPills = ({ setFilter }: Props) => {
  const { data: klageenheter = [] } = useKlageenheter();
  const selected = useQueryFilters(QueryParams.KLAGEENHETER);

  const mappedValues = useMemo(() => klageenheter.filter(({ id }) => selected.includes(id)), [klageenheter, selected]);
  const c = 'klageenhet';
  const { KLAGEENHETER } = QueryParams;

  const pills = mappedValues.map(({ id, navn }) => (
    <Pill key={id} id={id} queryKey={KLAGEENHETER} setFilter={setFilter} name={navn} values={selected} category={c} />
  ));

  return <>{pills}</>;
};

export const HjemlerPills = ({ setFilter }: Props) => {
  const { data: hjemler } = useRegistreringshjemlerMap();
  const selected = useQueryFilters(QueryParams.HJEMLER);

  if (selected.length === 0 || typeof hjemler === 'undefined') {
    return null;
  }

  const c = 'hjemler';
  const { HJEMLER } = QueryParams;

  const pills = selected.map((id) => {
    const hjemmel = hjemler[id];

    const label = typeof hjemmel === 'undefined' ? id : `${hjemmel.lovkilde.beskrivelse} ${hjemmel.hjemmelnavn}`;

    return (
      <Pill key={id} id={id} queryKey={HJEMLER} setFilter={setFilter} name={label} values={selected} category={c} />
    );
  });

  return <>{pills}</>;
};

export const KommentarerPills = ({ setFilter }: Props) => {
  const selected = useQueryFilters(QueryParams.KOMMENTARER);
  const mappedValues = useMemo(() => KOMMENTARER_KODEVERK.filter(({ id }) => selected.includes(id)), [selected]);

  const c = 'kommentarer';
  const { KOMMENTARER } = QueryParams;

  const pills = mappedValues.map(({ id, label }) => (
    <Pill key={id} id={id} name={label} queryKey={KOMMENTARER} category={c} values={selected} setFilter={setFilter} />
  ));

  return <>{pills}</>;
};

export const MangelfulltPills = ({ setFilter }: Props) => {
  const selected = useQueryFilters(QueryParams.MANGELFULLT);
  const mappedValues = useMemo(() => MANGELFULLT_KODEVERK.filter(({ id }) => selected.includes(id)), [selected]);

  const c = 'mangelfullt';
  const { MANGELFULLT } = QueryParams;

  const pills = mappedValues.map(({ id, label }) => (
    <Pill key={id} id={id} name={label} queryKey={MANGELFULLT} category={c} values={selected} setFilter={setFilter} />
  ));

  return <>{pills}</>;
};

export const SaksbehandlerPills = ({ setFilter }: Props) => {
  const { data: user } = useUser();
  const { data } = useSaksbehandlere(typeof user === 'undefined' ? skipToken : user.ansattEnhet.id);

  const saksbehandlere = data ?? [];
  const selected = useQueryFilters(QueryParams.SAKSBEHANDLERE);
  const c = 'saksbehandler';
  const { SAKSBEHANDLERE: S } = QueryParams;

  const pills = selected.map((id) => {
    const label = saksbehandlere.find(({ navIdent }) => id === navIdent)?.navn ?? id;

    return <Pill key={id} id={id} queryKey={S} setFilter={setFilter} name={label} values={selected} category={c} />;
  });

  return <>{pills}</>;
};

export const VedtaksinstansgrupperPills = ({ setFilter }: Props) => {
  const selected = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);

  const c = 'vedtaksinstansgrupper';
  const { VEDTAKSINSTANSGRUPPER: V } = QueryParams;

  const pills = selected.map((id) => {
    const label = VEDTAKSINSTANSGRUPPER.find((v) => v.id === id)?.label ?? id;

    return <Pill key={id} id={id} queryKey={V} setFilter={setFilter} name={label} values={selected} category={c} />;
  });

  return <>{pills}</>;
};
