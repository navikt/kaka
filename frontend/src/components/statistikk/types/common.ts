import type { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';

type HelpTexts = Partial<Record<keyof IKvalitetsvurderingData, { label: string; helpText?: string }>>;

export interface HelpTextContainer {
  label?: string;
  key: string;
  texts: HelpTexts;
}
