import type { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { Pagination, Table } from '@navikt/ds-react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { VurderingRows } from './rows';
import { SakCounter } from './sak-counter';

interface Props {
  data?: (ISaksdataIncomplete | ISaksdataComplete)[];
  testId: string;
}

const TABLE_HEADERS: (string | null)[] = ['Type', 'Ytelse', 'Saken gjelder', 'Sist endret', 'Utfall', null];
const ROWS_PER_PAGE = 10;

export const VurderingerTable = ({ data = [], testId }: Props) => {
  const [page, setPage] = useState(1);

  const pageData = data.slice(ROWS_PER_PAGE * (page - 1), ROWS_PER_PAGE * page);

  return (
    <TableWrapper>
      <Table zebraStripes data-testid={`${testId}-table`}>
        <Table.Header>
          <Table.Row>
            {TABLE_HEADERS.map((header) => (
              <Table.HeaderCell key={header} scope="col">
                {header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <VurderingRows vurderinger={pageData} columnCount={TABLE_HEADERS.length} testId={testId} />
      </Table>

      <Pagination page={page} onPageChange={setPage} count={Math.max(Math.ceil(data.length / ROWS_PER_PAGE), 1)} />

      <SakCounter list={data} />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
