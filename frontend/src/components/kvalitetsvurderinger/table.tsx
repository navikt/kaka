import React from 'react';
import { ISaksdataCompleteSearchHit, ISaksdataIncompleteSearchHit } from '../../types/saksdata';
import { TableHeader } from './header';
import { VurderingRows } from './rows';
import { SakCounter } from './sak-counter';
import { StyledTable, StyledTableContainer } from './styled-components';

interface Props {
  data?: (ISaksdataIncompleteSearchHit | ISaksdataCompleteSearchHit)[];
  testId: string;
}

const TABLE_HEADERS: (string | null)[] = ['Type', 'Ytelse', 'Saken gjelder', 'Sist endret', 'Utfall', null];

export const Table = ({ data, testId }: Props) => (
  <>
    <StyledTableContainer>
      <StyledTable className="tabell tabell--stripet" data-testid={`${testId}-table`}>
        <TableHeader headers={TABLE_HEADERS} />
        <VurderingRows vurderinger={data} columnCount={TABLE_HEADERS.length} testId={testId} />
      </StyledTable>
    </StyledTableContainer>
    <SakCounter list={data} />
  </>
);
