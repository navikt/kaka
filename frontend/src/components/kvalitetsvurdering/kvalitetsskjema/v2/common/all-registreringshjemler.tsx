import React from 'react';
import { LovhjemmelSelect } from '@app/components/kvalitetsvurdering/saksdata/lovhjemmel/lovhjemmel-select';
import { SelectedHjemlerList } from '@app/components/kvalitetsvurdering/saksdata/lovhjemmel/selected-hjemler-list';
import { useCanEdit } from '@app/hooks/use-can-edit';
import {
  IKvalitetsvurderingAllRegistreringshjemler,
  IKvalitetsvurderingBooleans,
} from '@app/types/kvalitetsvurdering/v2';
import { useKvalitetsvurderingV2 } from './use-kvalitetsvurdering-v2';

const EMPTY_ARRAY: string[] = [];

interface AllRegistreringshjemlerProps {
  field: keyof IKvalitetsvurderingAllRegistreringshjemler;
  parentKey?: keyof IKvalitetsvurderingBooleans;
}

export const AllRegistreringshjemler = ({ field, parentKey }: AllRegistreringshjemlerProps) => {
  const { update, isLoading, kvalitetsvurdering } = useKvalitetsvurderingV2();
  const canEdit = useCanEdit();

  if (isLoading) {
    return null;
  }

  const show = parentKey === undefined || kvalitetsvurdering[parentKey];

  if (!show) {
    return null;
  }

  const onChange = (newHjemler: string[]) => update({ [field]: newHjemler });

  const selected = kvalitetsvurdering[field] ?? EMPTY_ARRAY;

  return (
    <div style={{ width: 400 }}>
      {canEdit ? (
        <LovhjemmelSelect onChange={onChange} selected={selected} showFjernAlle show size="small" variant="secondary">
          Velg hjemmel/hjemler
        </LovhjemmelSelect>
      ) : null}
      <SelectedHjemlerList selected={selected} />
    </div>
  );
};
