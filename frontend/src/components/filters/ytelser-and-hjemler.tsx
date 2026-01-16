import { Filter } from '@app/components/filters/common/filter';
import { Hjemler } from '@app/components/filters/common/hjemler';
import { QueryParams } from '@app/components/filters/filter-query-params';
import { getYtelserFromYtelsegrupper } from '@app/components/statistikk/hooks/use-ytelser-query-filter';
import { YTELSESGRUPPE_OPTIONS } from '@app/components/statistikk/types';
import type { IYtelse } from '@app/types/kodeverk';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';
import { useMemo } from 'react';

interface Props {
  selectedYtelser: string[];
  selectedYtelsegrupper: string[];
  selectedHjemler: string[];
  setFilter: (key: QueryParams, ...values: string[]) => void;
  ytelser: IYtelse[];
}

export const YtelserAndHjemler = ({
  ytelser,
  selectedHjemler,
  selectedYtelser,
  selectedYtelsegrupper,
  setFilter,
}: Props) => {
  const relevantYtelser = useMemo(() => {
    if (selectedYtelsegrupper.length === 0 && selectedYtelser.length === 0) {
      return ytelser;
    }

    const fromGrupper = getYtelserFromYtelsegrupper(selectedYtelsegrupper, selectedYtelser);

    return ytelser.filter((y) => fromGrupper.includes(y.id));
  }, [selectedYtelsegrupper, selectedYtelser, ytelser]);

  return (
    <>
      <YtelsegrupperFilter selected={selectedYtelsegrupper} setFilter={setFilter} />
      <YtelseFilter ytelser={ytelser} selected={selectedYtelser} setFilter={setFilter} />

      <SubFilter>
        <Hjemler
          relevantYtelser={relevantYtelser}
          selectedHjemler={selectedHjemler}
          setSelectedHjemler={(v) => setFilter(QueryParams.HJEMLER, ...v)}
        />
      </SubFilter>
    </>
  );
};

const SubFilter = ({ children }: { children: React.ReactNode }) => (
  <HStack align="center" className="flex" wrap={false}>
    <ChevronRightIcon fontSize={24} aria-hidden />
    {children}
  </HStack>
);

const EMPTY: string[] = [];

interface YtelseFilterProps {
  selected: string[];
  setFilter: (key: QueryParams, ...values: string[]) => void;
}

export const YtelsegrupperFilter = ({ selected, setFilter }: YtelseFilterProps) => (
  <Filter
    label="Ytelsegrupper"
    selected={selected}
    setSelected={(v) => {
      setFilter(QueryParams.YTELSESGRUPPER, ...v);
      setFilter(QueryParams.HJEMLER, ...EMPTY);
    }}
    filters={YTELSESGRUPPE_OPTIONS}
  />
);

export const YtelseFilter = ({ ytelser, selected, setFilter }: YtelseFilterProps & { ytelser: IYtelse[] }) => {
  const ytelserOptions = useMemo(() => ytelser.map(({ navn, id }) => ({ label: navn, id })), [ytelser]);

  return (
    <Filter
      label="Ytelser"
      selected={selected}
      setSelected={(v) => {
        setFilter(QueryParams.YTELSER, ...v);
        setFilter(QueryParams.HJEMLER, ...EMPTY);
      }}
      filters={ytelserOptions}
    />
  );
};
