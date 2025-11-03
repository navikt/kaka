import { LovhjemmelSelect } from '@app/components/kvalitetsvurdering/saksdata/lovhjemmel/lovhjemmel-select';
import { SelectedHjemlerList } from '@app/components/kvalitetsvurdering/saksdata/lovhjemmel/selected-hjemler-list';
import { useCanEdit } from '@app/hooks/use-can-edit';
import type {
  KvalitetsvurderingAllRegistreringshjemlerV3,
  KvalitetsvurderingV3Boolean,
} from '@app/types/kvalitetsvurdering/v3';
import { useKvalitetsvurderingV3 } from './use-kvalitetsvurdering-v3';

const EMPTY_ARRAY: string[] = [];

interface AllRegistreringshjemlerProps {
  field: keyof KvalitetsvurderingAllRegistreringshjemlerV3;
  parentKey?: keyof KvalitetsvurderingV3Boolean;
}

export const AllRegistreringshjemler = ({ field, parentKey }: AllRegistreringshjemlerProps) => {
  const { update, isLoading, kvalitetsvurdering } = useKvalitetsvurderingV3();
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
        <LovhjemmelSelect onChange={onChange} selected={selected} show size="small" variant="secondary">
          Velg hjemmel/hjemler
        </LovhjemmelSelect>
      ) : null}
      <SelectedHjemlerList selected={selected} />
    </div>
  );
};
