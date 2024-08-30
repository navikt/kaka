import type { IKvalitetsvurderingBooleans, IKvalitetsvurderingTexts } from '@app/types/kvalitetsvurdering/v1';

export interface Reason {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  textareaId?: keyof IKvalitetsvurderingTexts;
  helpText?: string;
  show?: boolean;
  checked: boolean;
}
