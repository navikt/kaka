import { Filter } from '@app/components/filters/common/filter';
import { Hjemler } from '@app/components/filters/common/hjemler';
import { QueryParams } from '@app/components/filters/filter-query-params';
import type { IYtelse } from '@app/types/kodeverk';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';
import { useMemo } from 'react';

interface Props {
  selectedYtelser: string[];
  selectedHjemler: string[];
  setFilter: (key: QueryParams, ...values: string[]) => void;
  ytelser: IYtelse[];
}

export const YtelserAndHjemler = ({ ytelser, selectedHjemler, selectedYtelser, setFilter }: Props) => {
  const ytelserOptions = useMemo(() => ytelser.map(({ navn, id }) => ({ label: navn, id })), [ytelser]);
  const relevantYtelser = useMemo(
    () =>
      selectedYtelser === null || selectedYtelser.length === 0
        ? ytelser
        : ytelser.filter((y) => selectedYtelser.includes(y.id)),
    [selectedYtelser, ytelser],
  );

  return (
    <>
      <Filter
        label="Ytelser"
        selected={selectedYtelser}
        setSelected={(v) => {
          setFilter(QueryParams.YTELSER, ...v);
          setFilter(QueryParams.HJEMLER, ...EMPTY);
        }}
        filters={ytelserOptions}
      />

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
