import {
  SÆRREGELVERKET_HELP_TEXTS,
  SÆRREGELVERKET_LABELS,
  SærregelverketBoolean,
  SærregelverketHjemlerFromYtelseList,
  SærregelverketSaksdataHjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const SÆRREGELVERKET_TEXTS = {
  [SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil]: {
    color: ColorToken.Accent500,
    label: SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil],
    helpText: SÆRREGELVERKET_HELP_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil],
  },
  [SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum]: {
    color: ColorToken.Accent600,
    label: SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum],
    helpText: SÆRREGELVERKET_HELP_TEXTS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum],
  },
};

export const LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS = {
  [SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning]: {
    color: ColorToken.Accent500,
    label: SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning],
    helpText:
      SÆRREGELVERKET_HELP_TEXTS[SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning],
  },
  [SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn]: {
    color: ColorToken.Accent600,
    label:
      SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn],
    helpText:
      SÆRREGELVERKET_HELP_TEXTS[
        SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn
      ],
  },
};

type LovenErTolketEllerAnvendtFeilTextsKeys = keyof typeof LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS;

export const LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS = Object.keys(LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS).filter(
  (key): key is LovenErTolketEllerAnvendtFeilTextsKeys => key in LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS,
);

export const SÆRREGELVERKET_HJEMLER_LIST_TEXTS = {
  [SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList]: {
    label:
      SÆRREGELVERKET_LABELS[
        SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList
      ],
  },
  [SærregelverketSaksdataHjemlerList.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList]: {
    label:
      SÆRREGELVERKET_LABELS[
        SærregelverketSaksdataHjemlerList
          .saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList
      ],
  },
  [SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList]: {
    label: SÆRREGELVERKET_LABELS[SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList],
  },
};
