import React from 'react';
import { useFullYtelseNameFromId } from '../../hooks/use-kodeverk-value';
import { LabelYtelse } from '../../styled-components/labels';

interface Props {
  ytelseId: string | null;
}

export const Ytelse = ({ ytelseId }: Props) => {
  const ytelse = useFullYtelseNameFromId(ytelseId);
  return <LabelYtelse>{ytelse}</LabelYtelse>;
};
