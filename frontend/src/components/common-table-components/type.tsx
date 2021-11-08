import React from 'react';
import { useKodeverkSakstype } from '../../hooks/use-kodeverk-value';
import { LabelMain } from '../../styled-components/labels';

interface Props {
  type: string;
}

export const Type = ({ type }: Props) => <LabelMain>{useKodeverkSakstype(type)?.navn}</LabelMain>;
