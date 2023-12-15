export enum MainReason {
  Klageforberedelsen = 'klageforberedelsen',
  Utredningen = 'utredningen',
  Vedtaket = 'vedtaket',
  BrukAvRaadgivendeLege = 'brukAvRaadgivendeLege',
}

const MAIN_REASON = Object.values(MainReason);

export const isMainReason = (value: string): value is MainReason => MAIN_REASON.some((v) => v === value);

export const MAIN_REASON_LABELS: Record<MainReason, string> = {
  [MainReason.Klageforberedelsen]: 'Klageforberedelsen',
  [MainReason.Utredningen]: 'Utredningen før vedtak',
  [MainReason.Vedtaket]: 'Vedtaket',
  [MainReason.BrukAvRaadgivendeLege]: 'Bruk av rådgivende lege',
};

export const MAIN_REASON_HELPTEXTS: Record<MainReason, string | null> = {
  [MainReason.Klageforberedelsen]:
    'Underinstansen skal gjøre de undersøkelser klagen gir grunn til, og vurdere om de skal endre eget vedtak. De skal imøtegå klagers anførsler og begrunne hvorfor vedtaket blir opprettholdt. Underinstansen har ansvar for å sørge for at alle dokumenter som hører til klagesaken er gjort tilgjengelige for klageinstansen. Underinstansen skal sende kopi av oversendelsesbrevet til parten.',
  [MainReason.Utredningen]:
    'Gjelder utredningen av saken i perioden frem til og med at vedtaket ble fattet. Gjelder kvaliteten på utredningen av opplysninger som NAV ikke har tilgang til.  Dersom opplysninger som er innhentet ikke er gode nok, og NAV burde bedt om presiseringer eller mer utdypede opplysninger, registreres det som mangelfullt. Dersom NAV har gjort et godt nok forsøk på å utrede saken, men opplysningene likevel er mangelfulle, er utredningen god nok. Er det kommet nye opplysninger etter at saken er oversendt klageinstansen, men som vedtaksinstansen burde innhentet før de fattet vedtak, skal dette også registreres som mangelfullt her.',
  [MainReason.Vedtaket]: null,
  [MainReason.BrukAvRaadgivendeLege]: null,
};

export enum AnnetFields {
  annetFritekst = 'annetFritekst',
}
