import React from 'react';
import { formatId } from '../../functions/format-id';
import { CopyButton } from '../copy-button/copy-button';

interface Props {
  children: string;
}

export const IdentificationNumber = ({ children }: Props) => (
  <CopyButton text={children} title="Klikk for å kopiere">
    {formatId(children)}
  </CopyButton>
);
