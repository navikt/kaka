import { NAV_COLORS } from '@app/colors/colors';
import { RadiovalgExtended } from '../radio';
import {
  BrukAvRaadgivendeLegeKeys,
  IKvalitetsvurderingHjemler,
  IkkeKonkretBegrunnelseKeys,
  KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES,
  KlageforberedelsenKeys,
  MainReason,
  SakensDokumenterKeys,
  UtredningenKeys,
  VedtaketHjemlerListKeys,
  VedtaketKeys,
} from '../v2';

type Children =
  | Record<SakensDokumenterKeys, KvalitetsskjemaText>
  | Record<IkkeKonkretBegrunnelseKeys, KvalitetsskjemaText>;

export interface KvalitetsskjemaText {
  label: string;
  helpText?: string;
  color?: string;
  hjemler?: keyof IKvalitetsvurderingHjemler;
  groupErrorField?: keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES;
  children?: Children;
}

export const SAKENS_DOKUMENTER_TEXTS: Record<SakensDokumenterKeys, KvalitetsskjemaText> = {
  klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert: {
    color: NAV_COLORS.blue[400],
    label: 'Relevante opplysninger fra andre fagsystemer er ikke journalført',
    helpText:
      'F.eks. notater, klager, referat eller andre opplysninger fra Arena, Pesys, Infotrygd, A-inntekt, Modia, eller digital aktivitetsplan.',
  },
  klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn: {
    color: NAV_COLORS.blue[500],
    label: 'Journalførte dokumenter har feil titler/navn',
    helpText: 'F.eks. står det «fritekstbrev» i stedet for «vedtak», eller «samtale» i stedet for «klage».',
  },
  klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: {
    color: NAV_COLORS.blue[600],
    label: 'Mangler fysisk saksmappe',
    helpText: 'Gjelder kun i saker det er relevant/nødvendig.',
  },
};

export const KLAGEFORBEREDELSEN_TEXTS: Record<KlageforberedelsenKeys, KvalitetsskjemaText> = {
  klageforberedelsenSakensDokumenter: {
    children: SAKENS_DOKUMENTER_TEXTS,
    color: NAV_COLORS.blue[100],
    label: 'Sakens dokumenter',
    groupErrorField: 'klageforberedelsenSakensDokumenterGroup',
    helpText:
      'Dokumentene er ikke fullstendige; f.eks. feil eller mangelfull journalføring av relevante opplysninger i klagebehandlingen.',
  },
  klageforberedelsenOversittetKlagefristIkkeKommentert: {
    color: NAV_COLORS.blue[200],
    label: 'Oversittet klagefrist er ikke kommentert.',
  },
  klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt: {
    color: NAV_COLORS.blue[300],
    label: 'Klagers relevante anførsler er ikke tilstrekkelig kommentert/imøtegått.',
  },
  klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar: {
    color: NAV_COLORS.blue[400],
    label: 'Feil ved begrunnelsen for hvorfor avslag opprettholdes/klager ikke oppfyller vilkår.',
  },
  klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema: {
    color: NAV_COLORS.blue[500],
    label: 'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema.',
  },
  klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker: {
    color: NAV_COLORS.blue[600],
    label: 'Det er ikke sendt kopi av oversendelsesbrevet til parten, eller det er sendt til feil mottaker.',
    helpText: 'F.eks. er oversendelsesbrevet ikke sendt til fullmektig i saken.',
  },
};

export const UTREDNINGEN_TEXTS: Record<UtredningenKeys, KvalitetsskjemaText> = {
  utredningenAvMedisinskeForhold: {
    color: NAV_COLORS.orange[300],
    label: 'Utredningen av medisinske forhold',
    helpText:
      'F.eks. er det ikke innhentet uttalelse fra en behandler eller rapport fra rehabiliteringsopphold. Dersom opplysninger som er innhentet ikke er gode nok, og NAV burde bedt om presiseringer eller mer utdypede opplysninger, registreres det her.',
  },
  utredningenAvInntektsforhold: {
    color: NAV_COLORS.orange[400],
    label: 'Utredningen av inntektsforhold',
    helpText: 'F.eks. er det ikke innhentet lønnslipper eller kontoopplysninger.',
  },
  utredningenAvArbeidsaktivitet: {
    color: NAV_COLORS.orange[500],
    label: 'Utredningen av arbeidsaktivitet',
    helpText: 'F.eks. er det ikke innhentet arbeidskontrakt, timelister, eller rapporter fra tiltak.',
  },
  utredningenAvEoesUtenlandsproblematikk: {
    color: NAV_COLORS.orange[600],
    label: 'Utredningen av EØS-/utenlandsproblematikk',
    helpText:
      'F.eks. er det ikke er innhentet opplysninger om trygdetid i andre land. Er EØS-/utenlandsproblematikk ikke fanget opp i det hele tatt, registreres også det her.',
  },
  utredningenAvAndreAktuelleForholdISaken: {
    color: NAV_COLORS.orange[700],
    label: 'Utredningen av andre aktuelle forhold i saken',
    helpText:
      'Du kan skrive konkret hvilke feil ved utredningen av andre aktuelle forhold det gjelder i fritekstfeltet nederst.',
  },
};

export const VEDTAKET_HJEMLER_LIST_TEXTS: Record<VedtaketHjemlerListKeys, KvalitetsskjemaText> = {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList: {
    label: 'Hjemler for "Det er brukt feil hjemmel eller alle relevante hjemler er ikke vurdert"',
  },
  vedtaketLovbestemmelsenTolketFeilHjemlerList: {
    label: 'Hjemler for "Lovbestemmelsen er tolket feil"',
  },
  vedtaketFeilKonkretRettsanvendelseHjemlerList: {
    label: 'Hjemler for "Feil i den konkrete rettsanvendelsen"',
  },
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList: {
    label: 'Hjemler for "Innholdet i rettsreglene er ikke tilstrekkelig beskrevet"',
  },
};

export const IKKE_KONKRET_BEGRUNNELSE_TEXTS: Record<IkkeKonkretBegrunnelseKeys, KvalitetsskjemaText> = {
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum: {
    color: NAV_COLORS.green[400],
    label: 'Det går ikke godt nok frem hva slags faktum som er lagt til grunn',
  },
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum: {
    color: NAV_COLORS.green[500],
    label: 'Det går ikke godt nok frem hvordan rettsregelen er anvendt på faktum',
  },
  vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst: {
    color: NAV_COLORS.green[600],
    label: 'Det er mye standardtekst',
  },
};

export const VEDTAKET_TEXTS: Record<VedtaketKeys, KvalitetsskjemaText> = {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert: {
    color: NAV_COLORS.green[100],
    label: 'Det er brukt feil hjemmel eller alle relevante hjemler er ikke vurdert',
    helpText: 'Du registrerer også her dersom EØS-/utenlandsproblematikk ikke er fanget opp.',
    hjemler: 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
  },
  vedtaketLovbestemmelsenTolketFeil: {
    color: NAV_COLORS.green[200],
    label: 'Lovbestemmelsen er tolket feil',
    helpText: 'F.eks. er «en vesentlig medvirkende årsak» tolket som et krav om hovedårsak.',
    hjemler: 'vedtaketLovbestemmelsenTolketFeilHjemlerList',
  },
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: {
    color: NAV_COLORS.green[300],
    label: 'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
    hjemler: 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList',
    helpText:
      'F.eks. er ikke alle relevante momenter eller unntak beskrevet som er nødvendige for at bruker skal forstå innholdet i regelen.',
  },
  vedtaketDetErLagtTilGrunnFeilFaktum: {
    color: NAV_COLORS.green[400],
    label: 'Det er lagt til grunn feil faktum',
    helpText:
      'Med faktum mener vi de faktiske forhold du legger til grunn etter å ha vurdert og vektet bevisene i saken. Du registrerer her dersom alle relevante bevis ikke er sett/vurdert, herunder informasjon fra andre fagsystemer NAV har tilgang til. Du registrerer også her dersom bevis er tolket eller vektlagt feil.',
  },
  vedtaketFeilKonkretRettsanvendelse: {
    color: NAV_COLORS.green[500],
    label: 'Feil i den konkrete rettsanvendelsen',
    hjemler: 'vedtaketFeilKonkretRettsanvendelseHjemlerList',
    helpText:
      'Det er lagt til grunn riktig tolkning av rettsregelen og riktig faktum, men likevel kommet til feil resultat/subsumsjonen er feil.',
  },
  vedtaketIkkeKonkretIndividuellBegrunnelse: {
    color: NAV_COLORS.green[600],
    label: 'Begrunnelsen er ikke konkret og individuell nok',
    groupErrorField: 'vedtaketIkkeKonkretIndividuellBegrunnelseGroup',
    children: IKKE_KONKRET_BEGRUNNELSE_TEXTS,
  },
  vedtaketSpraakOgFormidlingErIkkeTydelig: {
    color: NAV_COLORS.green[700],
    label: 'Språket og formidlingen er ikke tydelig',
    helpText:
      'F.eks. er ikke språket tilpasset mottaker, oppbyggingen av innholdet er ulogisk, det er mye gjentagelser eller det er ikke mellomrom mellom ordene i brevet.',
  },
};

export const AUTOMATISK_VEDTAK_TEXTS = {
  vedtaketAutomatiskVedtak: {
    label: 'Automatisk vedtak',
    helpText:
      'Du skal gjøre de samme kvalitetsvurderingene for automatiske vedtak som for andre vedtak. Du kan krysse av for automatisk vedtak dersom det er tydelig merket i vedtaket.',
  },
};

export const BRUK_AV_RAADGIVENDE_LEGE_TEXTS: Record<BrukAvRaadgivendeLegeKeys, KvalitetsskjemaText> = {
  raadgivendeLegeIkkebrukt: {
    color: NAV_COLORS.red[400],
    label: 'Rådgivende lege er ikke brukt',
    helpText:
      'Du registrerer her om rådgivende lege burde vært brukt for å sikre og/eller synliggjøre at det trygdemedisinske er forstått riktig.',
  },
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege: {
    color: NAV_COLORS.red[500],
    label: 'Saksbehandlers bruk av rådgivende lege er mangelfull',
    helpText:
      'F.eks. har saksbehandler stilt feil spørsmål, eller saksbehandler har lagt for mye vekt på vurdering fra rådgivende lege/brukt som «fasit».',
  },
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin: {
    color: NAV_COLORS.red[600],
    label: 'Rådgivende lege har uttalt seg om tema utover trygdemedisin',
  },
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert: {
    color: NAV_COLORS.red[700],
    label: 'Rådgivende lege er brukt, men begrunnelsen fra rådgivende lege er mangelfull eller ikke dokumentert',
    helpText:
      'Du registrerer her om begrunnelsen er dokumentert, men for tynn, f.eks. kun inneholder en konklusjon. Du registrerer her om det ikke går frem hva slags dokumentasjon rådgivende lege har sett. Du registrerer også her om vurderingen fra rådgivende lege ikke er dokumentert i det hele tatt.',
  },
};

export const ANNET_TEXTS = {
  annetFritekst: {
    label: 'Annet (valgfri)',
    helpText:
      'Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Har saken andre avvik som ikke passer med noen av de andre registreringsmulighetene i Kaka, kan du skrive dette her. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken. Du kan også skrive stikkord dersom saken gjelder et typetilfelle.',
    description:
      'Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger.',
  },
};

export const BRUK_AV_RAADGIVENDE_LEGE_RADIO_TEXTS = {
  [RadiovalgExtended.IKKE_AKTUELT]: {
    helpText: 'Du registrerer her dersom den konkrete saken ikke gjelder trygdemedisinske spørsmål.',
  },
  [RadiovalgExtended.BRA]: {
    helpText:
      'Du registrerer her om den konkrete saken gjelder trygdemedisinske spørsmål og det er ok at rådgivende lege ikke er brukt, eller bruken av rådgivende lege er god nok.',
  },
};

export const KVALITETSVURDERING_TEXTS = {
  [MainReason.Klageforberedelsen]: {
    color: NAV_COLORS.blue[400],
    label: 'Klageforberedelsen',
    helpText:
      'Underinstansen skal gjøre de undersøkelser klagen gir grunn til, og vurdere om de skal endre eget vedtak. De skal imøtegå klagers anførsler og begrunne hvorfor vedtaket blir opprettholdt. Underinstansen har ansvar for å sørge for at alle dokumenter som hører til klagesaken er gjort tilgjengelige for klageinstansen. Underinstansen skal sende kopi av oversendelsesbrevet til parten.',
  },
  [MainReason.Utredningen]: {
    color: NAV_COLORS.orange[400],
    label: 'Utredningen',
    helpText:
      'Gjelder kvaliteten på utredningen av opplysninger som NAV ikke har tilgang til. Gjelder utredningen av saken i perioden frem til og med oversendelse til klageinstansen. Er det kommet nye opplysninger etter at saken er oversendt klageinstansen, men som vedtaksinstansen burde innhentet, skal dette også registreres her.',
  },
  [MainReason.Vedtaket]: {
    color: NAV_COLORS.green[400],
    label: 'Vedtaket',
  },
  [MainReason.BrukAvRaadgivendeLege]: {
    color: NAV_COLORS.red[400],
    label: 'Bruk av rådgivende lege',
  },
};
