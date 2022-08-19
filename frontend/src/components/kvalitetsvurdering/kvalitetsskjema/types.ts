import { IKvalitetsvurderingBooleans } from '../../../types/kvalitetsvurdering';

export interface Reason {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  textareaId?: string;
  helpText?: string;
  show?: boolean;
  checked: boolean;
}
