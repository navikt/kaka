import React from 'react';
import { useKodeverkHjemmel } from '../../hooks/use-kodeverk-value';
import { LabelMain } from '../../styled-components/labels';

interface Props {
  hjemmel: string;
}

export const Hjemmel = ({ hjemmel }: Props) => <LabelMain>{useKodeverkHjemmel(hjemmel)?.navn}</LabelMain>;
