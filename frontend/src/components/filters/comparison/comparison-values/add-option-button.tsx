import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

interface Props {
  onAdd: (option: string) => void;
  option: string | undefined;
}

export const AddOptionButton = ({ onAdd, option }: Props) => {
  const disabled = typeof option !== 'string';
  const title = disabled ? 'Ingen flere mulige verdier å legge til' : undefined;

  const add = () => {
    if (!disabled) {
      onAdd(option);
    }
  };

  return (
    <Button onClick={add} size="small" icon={<PlusIcon aria-hidden />} disabled={disabled} title={title}>
      Legg til
    </Button>
  );
};
