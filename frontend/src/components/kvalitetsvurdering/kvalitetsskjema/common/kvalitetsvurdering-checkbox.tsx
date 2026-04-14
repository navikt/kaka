import { useCanEdit } from '@app/hooks/use-can-edit';
import type { IKvalitetsvurderingBooleans } from '@app/types/kvalitetsvurdering/v2';
import type { KvalitetsvurderingV3Boolean } from '@app/types/kvalitetsvurdering/v3';
import { Checkbox } from '@navikt/ds-react';
import { type ReactElement, useMemo } from 'react';
import { ContainerWithHelpText } from './container-with-helptext';

interface Props {
  children: React.ReactNode;
  field: keyof IKvalitetsvurderingBooleans | keyof KvalitetsvurderingV3Boolean;
  helpText?: string | ReactElement;
}

export const KvalitetsskjemaCheckbox = ({ children, field, helpText }: Props) => {
  const canEdit = useCanEdit();

  const checkbox = useMemo(
    () => (
      <Checkbox value={field} disabled={!canEdit} data-testid={field}>
        {children}
      </Checkbox>
    ),
    [canEdit, children, field],
  );

  if (helpText === undefined) {
    return checkbox;
  }

  return <ContainerWithHelpText helpText={helpText}>{checkbox}</ContainerWithHelpText>;
};
