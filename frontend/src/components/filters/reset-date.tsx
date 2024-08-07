import { ClockDashedIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

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
      variant="tertiary"
      size="xsmall"
      title={title}
      onClick={() => onClick(date)}
      icon={<ClockDashedIcon aria-hidden />}
    />
  );
};
