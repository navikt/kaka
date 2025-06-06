import { QueryParams } from '@app/components/filters/filter-query-params';
import { HjemmelFilter } from '@app/components/filters/hjemler';
import { YtelseFilter } from '@app/components/filters/ytelser';
import type { IYtelse } from '@app/types/kodeverk';
import { Box, VStack } from '@navikt/ds-react';

interface Props {
  selectedYtelser: string[];
  selectedHjemler: string[];
  setFilter: (key: QueryParams, ...values: string[]) => void;
  ytelser: IYtelse[];
}

export const YtelserAndHjemler = ({ selectedYtelser, selectedHjemler, setFilter, ytelser }: Props) => {
  return (
    <VStack asChild gap="2">
      <Box borderColor="border-default" borderRadius={'medium'} borderWidth="1" padding="2" background="surface-subtle">
        <YtelseFilter selected={selectedYtelser} ytelser={ytelser} />
        <HjemmelFilter selected={selectedHjemler} setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)} />
      </Box>
    </VStack>
  );
};
