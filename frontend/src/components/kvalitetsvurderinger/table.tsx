import type { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';
import { Pagination, Table } from '@navikt/ds-react';
import { useState } from 'react';
import { VurderingRows } from './rows';
import { SakCounter } from './sak-counter';

interface Props {
  data?: (ISaksdataIncomplete | ISaksdataComplete)[];
}

const TABLE_HEADERS: (string | null)[] = ['Type', 'Ytelse', 'Saken gjelder', 'Sist endret', 'Utfall', null];
const ROWS_PER_PAGE = 10;

export const VurderingerTable = ({ data = [] }: Props) => {
  const [page, setPage] = useState(1);

  const pageData = data.slice(ROWS_PER_PAGE * (page - 1), ROWS_PER_PAGE * page);

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <Table zebraStripes className="overflow-hidden">
        <Table.Header>
          <Table.Row>
            {TABLE_HEADERS.map((header) => (
              <Table.HeaderCell key={header} scope="col">
                {header}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <VurderingRows vurderinger={pageData} columnCount={TABLE_HEADERS.length} />
      </Table>

      <SakCounter list={data} />

      <Pagination
        page={page}
        onPageChange={setPage}
        count={Math.max(Math.ceil(data.length / ROWS_PER_PAGE), 1)}
        className="self-center"
      />
    </div>
  );
};
