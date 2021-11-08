import React from 'react';

interface EmptyOptionProps {
  show: boolean;
}

export const EmptyOption = ({ show }: EmptyOptionProps) => {
  if (!show) {
    return null;
  }

  return <option value="">Ikke valgt</option>;
};
