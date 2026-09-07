import { Button, HGrid } from '@navikt/ds-react';
import { format } from 'date-fns';
import type { IOption } from './types';

interface Props {
  selectedFromDate: string;
  selectedToDate: string;
  options: IOption[];
  queryFormat: string;
  prettyFormat: string;
  setPreset: (fromDate: Date, toDate: Date) => void;
  disabled?: boolean;
}

export const DatePresets = ({
  selectedFromDate,
  selectedToDate,
  options,
  queryFormat,
  prettyFormat,
  setPreset,
  disabled = false,
}: Props) => (
  <HGrid as="ul" columns={2} gap="space-8" className="m-0 mb-4 list-none p-0">
    {options.map(({ label, fromDate, toDate }) => {
      const title = `${format(fromDate, prettyFormat)} - ${format(toDate, prettyFormat)}`;

      const queryFromDate = format(fromDate, queryFormat);
      const queryToDate = format(toDate, queryFormat);

      const isSelected = queryFromDate === selectedFromDate && queryToDate === selectedToDate;

      const onClick = () => setPreset(fromDate, toDate);

      return (
        <li key={label} className="grid w-full">
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            size="small"
            aria-pressed={isSelected}
            title={title}
            onClick={onClick}
            disabled={disabled}
          >
            {label}
          </Button>
        </li>
      );
    })}
  </HGrid>
);
