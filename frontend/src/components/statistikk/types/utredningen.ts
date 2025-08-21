import {
  UTREDNINGEN_HELP_TEXTS,
  UTREDNINGEN_LABELS,
  UtredningenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const UTREDNINGEN_TEXTS = {
  [UtredningenBoolean.utredningenAvMedisinskeForhold]: {
    color: ColorToken.Warning500,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvMedisinskeForhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvMedisinskeForhold],
  },
  [UtredningenBoolean.utredningenAvInntektsforhold]: {
    color: ColorToken.Warning600,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvInntektsforhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvInntektsforhold],
  },
  [UtredningenBoolean.utredningenAvArbeidsaktivitet]: {
    color: ColorToken.Warning700,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvArbeidsaktivitet],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvArbeidsaktivitet],
  },
  [UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk]: {
    color: ColorToken.Warning800,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk],
  },
  [UtredningenBoolean.utredningenAvSivilstandBoforhold]: {
    color: ColorToken.Warning900,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvSivilstandBoforhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvSivilstandBoforhold],
  },
  [UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken]: {
    color: ColorToken.Warning1000,
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken],
  },
};
