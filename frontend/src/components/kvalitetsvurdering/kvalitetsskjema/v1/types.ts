import { IKvalitetsvurderingBooleans } from '../../../../types/kvalitetsvurdering/v1';

export interface Reason {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  textareaId?: string;
  helpText?: string;
  show?: boolean;
  checked: boolean;
}
