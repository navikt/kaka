import { NAV_COLORS } from '@app/colors/colors';
import {
  UTREDNINGEN_HELP_TEXTS,
  UTREDNINGEN_LABELS,
  UtredningenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';

export const UTREDNINGEN_TEXTS = {
  [UtredningenBoolean.utredningenAvMedisinskeForhold]: {
    color: NAV_COLORS.orange[300],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvMedisinskeForhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvMedisinskeForhold],
  },
  [UtredningenBoolean.utredningenAvInntektsforhold]: {
    color: NAV_COLORS.orange[400],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvInntektsforhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvInntektsforhold],
  },
  [UtredningenBoolean.utredningenAvArbeidsaktivitet]: {
    color: NAV_COLORS.orange[500],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvArbeidsaktivitet],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvArbeidsaktivitet],
  },
  [UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk]: {
    color: NAV_COLORS.orange[600],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk],
  },
  [UtredningenBoolean.utredningenAvSivilstandBoforhold]: {
    color: NAV_COLORS.orange[700],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvSivilstandBoforhold],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvSivilstandBoforhold],
  },
  [UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken]: {
    color: NAV_COLORS.orange[800],
    label: UTREDNINGEN_LABELS[UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken],
    helpText: UTREDNINGEN_HELP_TEXTS[UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken],
  },
};
