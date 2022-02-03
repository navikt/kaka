import { Historic } from '@navikt/ds-icons';
import Knapp from 'nav-frontend-knapper';
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
    <Knapp title={title} onClick={() => onClick(date)} kompakt>
      <Historic />
    </Knapp>
  );
};
