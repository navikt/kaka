import { Historic } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';

interface Props {
  date: string;
  selectedDate: string;
  onClick: (date: string) => void;
  title?: string;
}

export const ResetDateButton = ({ date, selectedDate, title, onClick }: Props) => {
  if (date === selectedDate) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="small"
      title={title}
      onClick={() => onClick(date)}
      icon={<Historic aria-hidden />}
    />
  );
};
