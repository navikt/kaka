import React, { createRef, useEffect } from 'react';
import { usePrevious } from '../../../hooks/use-previous';
import { IKvalitetsvurderingBooleans } from '../../../types/kvalitetsvurdering';
import { Checkboxes, CheckboxesProps } from './checkboxes';

export interface Reason {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  textareaId?: string;
  helpText?: string;
  show?: boolean;
  checked: boolean;
}
interface ReasonsProps extends CheckboxesProps {
  show: boolean;
}

export const Reasons = ({ show, ...props }: ReasonsProps) => {
  const ref = createRef<HTMLDivElement>();
  const wasShown = usePrevious(show);

  useEffect(() => {
    if (wasShown !== show && typeof wasShown === 'boolean' && ref.current !== null) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [ref, show, wasShown]);

  if (!show) {
    return null;
  }

  return <Checkboxes {...props} ref={ref} />;
};
