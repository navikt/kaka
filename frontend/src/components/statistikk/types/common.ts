import type { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import type { KvalitetsvurderingDataV3 } from '@app/types/kvalitetsvurdering/v3';

interface Metadata {
  label: string;
  helpText?: string;
}

type HelpTextsV2 = Record<keyof IKvalitetsvurderingData, Metadata>;
type HelpTextsV3 = Record<keyof KvalitetsvurderingDataV3, Metadata>;

type HelpTexts = Partial<HelpTextsV2 & HelpTextsV3>;

export interface HelpTextContainer {
  label?: string;
  key: string;
  texts: HelpTexts;
}
