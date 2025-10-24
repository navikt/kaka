import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/helpers';
import {
  BegrunnelsespliktenBoolean,
  BegrunnelsespliktenSaksdataHjemlerLists,
  ForeleggelsespliktenBoolean,
  HEADER,
  JournalfoeringspliktenBoolean,
  KlageOgKlageforberedelsenBoolean,
  KlartSpraakBoolean,
  OmgjoeringBoolean,
  SaksbehandlingsregleneErrorFields,
  UtredningspliktenBoolean,
  VeiledningspliktenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Radio } from '@navikt/ds-react';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from '../../common/styled-components';
import { Checkboxes } from '../common/checkboxes';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV3 } from '../common/use-kvalitetsvurdering-v3';
import { useValidationError } from '../common/use-validation-error';

export const Saksbehandlingsreglene = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV3();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Saksbehandlingsreglene);

  if (isLoading) {
    return null;
  }

  const { saksbehandlingsregler } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ saksbehandlingsregler: value });

  return (
    <section>
      <StyledHeading size="small">{HEADER}</StyledHeading>

      <StyledRadioGroup
        legend={HEADER}
        hideLegend
        value={saksbehandlingsregler}
        error={validationError}
        onChange={onChange}
        id="saksbehandlingsreglene"
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Riktig/Ikke kvalitetsavvik
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt/kvalitetsavvik
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {saksbehandlingsregler === Radiovalg.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          update={update}
          childList={CHECKBOXES}
          groupErrorField={SaksbehandlingsregleneErrorFields.saksbehandlingsreglerGroup}
          label="Hva er mangelfullt/kvalitetsavvik?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  // Veiledningsplikten
  getCheckbox({
    field: VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten,
    groupErrorField: SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaVeiledningspliktenGroup,
    childList: [
      getCheckbox({
        field: VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser,
      }),
      getCheckbox({
        field: VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning,
      }),
    ],
  }),

  // Utredningsplikten
  getCheckbox({
    field: UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten,
    groupErrorField: SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaUtredningspliktenGroup,
    childList: [
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvMedisinskeForholdHarIkkeVaertGodNok,
      }),
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvInntektsArbeidsforholdHarIkkeVaertGodNok,
      }),
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvEoesUtenlandsforholdHarIkkeVaertGodNok,
      }),
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSivilstandsBoforholdHarIkkeVaertGodNok,
      }),
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvSamvaersforholdHarIkkeVaertGodNok,
      }),
      getCheckbox({
        field:
          UtredningspliktenBoolean.saksbehandlingsreglerUtredningspliktenUtredningenAvAndreForholdISakenHarIkkeVaertGodNok,
      }),
    ],
  }),

  // Foreleggelsesplikten
  getCheckbox({
    field: ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten,
    groupErrorField: SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaForeleggelsespliktenGroup,
    childList: [
      getCheckbox({
        field:
          ForeleggelsespliktenBoolean.saksbehandlingsreglerForeleggelsespliktenUttalelseFraRaadgivendeLegeHarIkkeVaertForelagtParten,
      }),
      getCheckbox({
        field:
          ForeleggelsespliktenBoolean.saksbehandlingsreglerForeleggelsespliktenAndreOpplysningerISakenHarIkkeVaertForelagtParten,
      }),
    ],
  }),

  // Begrunnelsesplikten
  getCheckbox({
    field: BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten,
    groupErrorField: SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaBegrunnelsespliktenGroup,
    childList: [
      getCheckbox({
        field: BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket,
        saksdatahjemler:
          BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList,
      }),
      getCheckbox({
        field: BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum,
        saksdatahjemler:
          BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList,
      }),
      getCheckbox({
        field:
          BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn,
        saksdatahjemler:
          BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList,
      }),
    ],
  }),

  // Klage og klageforberedelse
  getCheckbox({
    field: KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse,
    groupErrorField:
      SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelseGroup,
    childList: [
      getCheckbox({
        field:
          KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageKlagefristenEllerOppreisningErIkkeVurdertEllerFeilVurdert,
      }),
      getCheckbox({
        field:
          KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageDetErIkkeSoergetForRettingAvFeilIKlagensFormEllerInnhold,
      }),
      getCheckbox({
        field:
          KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaKlageUnderKlageforberedelsenErDetIkkeUtredetEllerGjortUndersoekelser,
      }),
    ],
  }),

  // Omgjøring
  getCheckbox({
    field: OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke,
    groupErrorField:
      SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnkeGroup,
    childList: [
      getCheckbox({
        field: OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringUgyldighetOgOmgjoeringErIkkeVurdertEllerFeilVurdert,
      }),
      getCheckbox({
        field:
          OmgjoeringBoolean.saksbehandlingsreglerOmgjoeringDetErFattetVedtakTilTrossForAtBeslutningVarRiktigAvgjoerelsesform,
      }),
    ],
  }),

  // Journalføringsplikten
  getCheckbox({
    field: JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten,
    groupErrorField: SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaJournalfoeringspliktenGroup,
    childList: [
      getCheckbox({
        field:
          JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerErIkkeJournalfoert,
      }),
      getCheckbox({
        field:
          JournalfoeringspliktenBoolean.saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerHarIkkeGodNokTittelEllerDokumentkvalitet,
      }),
    ],
  }),

  // Klart språk
  getCheckbox({
    field: KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak,
    groupErrorField:
      SaksbehandlingsregleneErrorFields.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraakGroup,
    childList: [
      getCheckbox({
        field: KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIVedtaketErIkkeKlartNok,
      }),
      getCheckbox({
        field: KlartSpraakBoolean.saksbehandlingsreglerBruddPaaKlartSprakSpraketIOversendelsesbrevetsErIkkeKlartNok,
      }),
    ],
  }),
];
