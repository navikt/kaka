import React, { createRef, useEffect } from 'react';
import { usePrevious } from '@app/hooks/use-previous';
import { Checkboxes, CheckboxesProps } from './checkboxes';

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
