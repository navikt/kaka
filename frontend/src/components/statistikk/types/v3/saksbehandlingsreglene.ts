import {
  BegrunnelsespliktenBoolean,
  BegrunnelsespliktenSaksdataHjemlerLists,
  ForeleggelsespliktenBoolean,
  JournalfoeringspliktenBoolean,
  KlageOgKlageforberedelsenBoolean,
  KlartSpraakBoolean,
  OmgjoeringBoolean,
  SAKSBEHANDLINGSREGLENE_HELP_TEXTS,
  SAKSBEHANDLINGSREGLENE_LABELS,
  UtredningspliktenBoolean,
  VeiledningspliktenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

// Generell SAKSBEHANDLINGSREGLENE_TEXTS (alle hovednivå)
export const SAKSBEHANDLINGSREGLENE_TEXTS = {
  [VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten]: {
    color: ColorToken.Warning300,
    label: SAKSBEHANDLINGSREGLENE_LABELS[VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten],
  },
  [UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten]: {
    color: ColorToken.Warning400,
    label: SAKSBEHANDLINGSREGLENE_LABELS[UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten],
  },
  [ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten]: {
    color: ColorToken.Warning500,
    label: SAKSBEHANDLINGSREGLENE_LABELS[ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten],
  },
  [BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten]: {
    color: ColorToken.Warning600,
    label: SAKSBEHANDLINGSREGLENE_LABELS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten],
  },
  [KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse]: {
    color: ColorToken.Warning700,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse
      ],
  },
  [OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke]: {
    color: ColorToken.Warning800,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke
      ],
  },
  [JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten]: {
    color: ColorToken.Warning900,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten
      ],
  },
  [KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak]: {
    color: ColorToken.Warning1000,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak
      ],
  },
};

// Veiledningsplikten
export const VEILEDNINGSPLIKTEN_TEXTS = {
  [VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser
      ],
  },
  [VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning]: {
    color: ColorToken.Warning600,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning
      ],
  },
};

type VeiledningspliktenReasonsTextsKeys = keyof typeof VEILEDNINGSPLIKTEN_TEXTS;

export const VEILEDNINGSPLIKTEN_REASONS = Object.keys(VEILEDNINGSPLIKTEN_TEXTS).filter(
  (key): key is VeiledningspliktenReasonsTextsKeys => key in VEILEDNINGSPLIKTEN_TEXTS,
);

// Utredningsplikten
export const UTREDNINGSPLIKTEN_TEXTS = {
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvMedisinskeForholdHarIkkeVaertGodNok]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvMedisinskeForholdHarIkkeVaertGodNok
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvMedisinskeForholdHarIkkeVaertGodNok
      ],
  },
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvInntektsArbeidsforholdHarIkkeVaertGodNok]:
    {
      color: ColorToken.Warning600,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvInntektsArbeidsforholdHarIkkeVaertGodNok
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvInntektsArbeidsforholdHarIkkeVaertGodNok
        ],
    },
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvEoesUtenlandsforholdHarIkkeVaertGodNok]:
    {
      color: ColorToken.Warning700,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvEoesUtenlandsforholdHarIkkeVaertGodNok
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvEoesUtenlandsforholdHarIkkeVaertGodNok
        ],
    },
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSivilstandsBoforholdHarIkkeVaertGodNok]:
    {
      color: ColorToken.Warning800,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvSivilstandsBoforholdHarIkkeVaertGodNok
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          UtredningspliktenBoolean
            .saksbehandlingsreglerUtredningspliktenUtredningenAvSivilstandsBoforholdHarIkkeVaertGodNok
        ],
    },
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSamvaersforholdHarIkkeVaertGodNok]: {
    color: ColorToken.Warning900,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSamvaersforholdHarIkkeVaertGodNok
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSamvaersforholdHarIkkeVaertGodNok
      ],
  },
  [UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvAndreForholdISakenHarIkkeVaertGodNok]: {
    color: ColorToken.Warning1000,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvAndreForholdISakenHarIkkeVaertGodNok
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvAndreForholdISakenHarIkkeVaertGodNok
      ],
  },
};

type UtredningspliktenReasonsTextsKeys = keyof typeof UTREDNINGSPLIKTEN_TEXTS;

export const UTREDNINGSPLIKTEN_REASONS = Object.keys(UTREDNINGSPLIKTEN_TEXTS).filter(
  (key): key is UtredningspliktenReasonsTextsKeys => key in UTREDNINGSPLIKTEN_TEXTS,
);

// Foreleggelsesplikten
export const FORELEGGELSESPLIKTEN_TEXTS = {
  [ForeleggelsespliktenBoolean.saksbehandlingsreglerForeleggelsespliktenUttalelseFraRaadgivendeLegeHarIkkeVaertForelagtParten]:
    {
      color: ColorToken.Warning500,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          ForeleggelsespliktenBoolean
            .saksbehandlingsreglerForeleggelsespliktenUttalelseFraRaadgivendeLegeHarIkkeVaertForelagtParten
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          ForeleggelsespliktenBoolean
            .saksbehandlingsreglerForeleggelsespliktenUttalelseFraRaadgivendeLegeHarIkkeVaertForelagtParten
        ],
    },
  [ForeleggelsespliktenBoolean.saksbehandlingsreglerForeleggelsespliktenAndreOpplysningerISakenHarIkkeVaertForelagtParten]:
    {
      color: ColorToken.Warning600,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          ForeleggelsespliktenBoolean
            .saksbehandlingsreglerForeleggelsespliktenAndreOpplysningerISakenHarIkkeVaertForelagtParten
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          ForeleggelsespliktenBoolean
            .saksbehandlingsreglerForeleggelsespliktenAndreOpplysningerISakenHarIkkeVaertForelagtParten
        ],
    },
};

type ForeleggelsespliktenReasonsTextsKeys = keyof typeof FORELEGGELSESPLIKTEN_TEXTS;

export const FORELEGGELSESPLIKTEN_REASONS = Object.keys(FORELEGGELSESPLIKTEN_TEXTS).filter(
  (key): key is ForeleggelsespliktenReasonsTextsKeys => key in FORELEGGELSESPLIKTEN_TEXTS,
);

// Begrunnelsesplikten
export const BEGRUNNELSESPLIKTEN_TEXTS = {
  [BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket
      ],
  },
  [BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum]: {
    color: ColorToken.Warning600,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum
      ],
  },
  [BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn]: {
    color: ColorToken.Warning700,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn
      ],
  },
};

type BegrunnelsespliktenReasonsTextsKeys = keyof typeof BEGRUNNELSESPLIKTEN_TEXTS;

export const BEGRUNNELSESPLIKTEN_REASONS = Object.keys(BEGRUNNELSESPLIKTEN_TEXTS).filter(
  (key): key is BegrunnelsespliktenReasonsTextsKeys => key in BEGRUNNELSESPLIKTEN_TEXTS,
);

export const BEGRUNNELSESPLIKTEN_HJEMLER_LIST_TEXTS = {
  [BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList]:
    {
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket
        ],
    },
  [BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList]:
    {
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum
        ],
    },
  [BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList]:
    {
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn
        ],
    },
};

// Klage og klageforberedelse
export const KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS = {
  [KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageKlagefristenEllerOppreisningErIkkeVurdertEllerFeilVurdert]:
    {
      color: ColorToken.Warning500,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageKlagefristenEllerOppreisningErIkkeVurdertEllerFeilVurdert
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageKlagefristenEllerOppreisningErIkkeVurdertEllerFeilVurdert
        ],
    },
  [KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageDetErIkkeSoergetForRettingAvFeilIKlagensFormEllerInnhold]:
    {
      color: ColorToken.Warning600,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageDetErIkkeSoergetForRettingAvFeilIKlagensFormEllerInnhold
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageDetErIkkeSoergetForRettingAvFeilIKlagensFormEllerInnhold
        ],
    },
  [KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageUnderKlageforberedelsenErDetIkkeUtredetEllerGjortUndersoekelser]:
    {
      color: ColorToken.Warning700,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageUnderKlageforberedelsenErDetIkkeUtredetEllerGjortUndersoekelser
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          KlageOgKlageforberedelsenBoolean
            .saksbehandlingsreglerBruddPaaKlageUnderKlageforberedelsenErDetIkkeUtredetEllerGjortUndersoekelser
        ],
    },
};

type KlageOgKlageforberedelsenReasonsTextsKeys = keyof typeof KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS;

export const KLAGE_OG_KLAGEFORBEREDELSEN_REASONS = Object.keys(KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS).filter(
  (key): key is KlageOgKlageforberedelsenReasonsTextsKeys => key in KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS,
);

// Omgjøring
export const OMGJØRING_TEXTS = {
  [OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringUgyldighetOgOmgjoeringErIkkeVurdertEllerFeilVurdert]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringUgyldighetOgOmgjoeringErIkkeVurdertEllerFeilVurdert
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringUgyldighetOgOmgjoeringErIkkeVurdertEllerFeilVurdert
      ],
  },
  [OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringDetErFattetVedtakTilTrossForAtBeslutningVarRiktigAvgjoerelsesform]:
    {
      color: ColorToken.Warning600,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          OmgjoeringBoolean
            .saksbehandlingsreglerOmgjoeringDetErFattetVedtakTilTrossForAtBeslutningVarRiktigAvgjoerelsesform
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          OmgjoeringBoolean
            .saksbehandlingsreglerOmgjoeringDetErFattetVedtakTilTrossForAtBeslutningVarRiktigAvgjoerelsesform
        ],
    },
};

type OmgjoeringReasonsTextsKeys = keyof typeof OMGJØRING_TEXTS;

export const OMGJØRING_REASONS = Object.keys(OMGJØRING_TEXTS).filter(
  (key): key is OmgjoeringReasonsTextsKeys => key in OMGJØRING_TEXTS,
);

// Journalføringsplikten
export const JOURNALFØRINGSPLIKTEN_TEXTS = {
  [JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerErIkkeJournalfoert]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerErIkkeJournalfoert
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerErIkkeJournalfoert
      ],
  },
  [JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerHarIkkeGodNokTittelEllerDokumentkvalitet]:
    {
      color: ColorToken.Warning600,
      label:
        SAKSBEHANDLINGSREGLENE_LABELS[
          JournalfoeringspliktenBoolean
            .saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerHarIkkeGodNokTittelEllerDokumentkvalitet
        ],
      helpText:
        SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
          JournalfoeringspliktenBoolean
            .saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerHarIkkeGodNokTittelEllerDokumentkvalitet
        ],
    },
};

type JournalfoeringspliktenReasonsTextsKeys = keyof typeof JOURNALFØRINGSPLIKTEN_TEXTS;

export const JOURNALFØRINGSPLIKTEN_REASONS = Object.keys(JOURNALFØRINGSPLIKTEN_TEXTS).filter(
  (key): key is JournalfoeringspliktenReasonsTextsKeys => key in JOURNALFØRINGSPLIKTEN_TEXTS,
);

// Klart språk
export const KLART_SPRÅK_TEXTS = {
  [KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIVedtaketErIkkeKlartNok]: {
    color: ColorToken.Warning500,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIVedtaketErIkkeKlartNok
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIVedtaketErIkkeKlartNok
      ],
  },
  [KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIOversendelsesbrevetsErIkkeKlartNok]: {
    color: ColorToken.Warning600,
    label:
      SAKSBEHANDLINGSREGLENE_LABELS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIOversendelsesbrevetsErIkkeKlartNok
      ],
    helpText:
      SAKSBEHANDLINGSREGLENE_HELP_TEXTS[
        KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIOversendelsesbrevetsErIkkeKlartNok
      ],
  },
};

type KlartSpraakReasonsTextsKeys = keyof typeof KLART_SPRÅK_TEXTS;

export const KLART_SPRÅK_REASONS = Object.keys(KLART_SPRÅK_TEXTS).filter(
  (key): key is KlartSpraakReasonsTextsKeys => key in KLART_SPRÅK_TEXTS,
);
