import { useAppTheme } from '@app/app-theme';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import {
  BegrunnelsespliktenBoolean,
  BegrunnelsespliktenSaksdataHjemlerLists,
  ForeleggelsespliktenBoolean,
  JournalfoeringspliktenBoolean,
  KlageOgKlageforberedelsenBoolean,
  KlartSpraakBoolean,
  OmgjoeringBoolean,
  UtredningspliktenBoolean,
  VeiledningspliktenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import {
  SærregelverketBoolean,
  SærregelverketHjemlerFromYtelseList,
  SærregelverketSaksdataHjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import { DatasetSelector } from '@app/components/statistikk/charts/common/dataset-selector';
import { HelpTexts } from '@app/components/statistikk/charts/common/help-texts';
import { Hjemler } from '@app/components/statistikk/charts/common/hjemler';
import { MangelfullDetails } from '@app/components/statistikk/charts/common/mangelfull-details';
import { getMangelfullDetailsDatasets } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/mangelfull-details';
import { Details } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/details';
import { Mangelfull } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/mangelfull';
import { TotalMangelfull } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/total-mangelfull';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import type { KvalitetsvurderingV3HjemlerList } from '@app/components/statistikk/types/v3/kvalitetsvurdering';
import {
  BEGRUNNELSESPLIKTEN_REASONS,
  BEGRUNNELSESPLIKTEN_TEXTS,
  FORELEGGELSESPLIKTEN_REASONS,
  FORELEGGELSESPLIKTEN_TEXTS,
  JOURNALFØRINGSPLIKTEN_REASONS,
  JOURNALFØRINGSPLIKTEN_TEXTS,
  KLAGE_OG_KLAGEFORBEREDELSEN_REASONS,
  KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS,
  KLART_SPRÅK_REASONS,
  KLART_SPRÅK_TEXTS,
  OMGJØRING_REASONS,
  OMGJØRING_TEXTS,
  SAKSBEHANDLINGSREGLENE_TEXTS,
  UTREDNINGSPLIKTEN_REASONS,
  UTREDNINGSPLIKTEN_TEXTS,
  VEILEDNINGSPLIKTEN_REASONS,
  VEILEDNINGSPLIKTEN_TEXTS,
} from '@app/components/statistikk/types/v3/saksbehandlingsreglene';
import {
  LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS,
  LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS,
  SÆRREGELVERKET_TEXTS,
} from '@app/components/statistikk/types/v3/særregelverket';
import { TRYGDEMEDISIN_TEXTS } from '@app/components/statistikk/types/v3/trygdemedisin';
import { SakstypeEnum } from '@app/types/sakstype';
import { HGrid, HStack } from '@navikt/ds-react';
import { QueryParams } from '../../../../filters/filter-query-params';
import { CardSize, DynamicCard } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';
import { CardTitleWithExplainer, TitleWithExplainer } from '../../kvalitetsvurderinger/explainer';

interface Props {
  datasets: DataSetV3[];
}

const MAIN_HELP_TEXTS = [
  {
    label: MAIN_REASON_LABELS[MainReason.Særregelverket],
    key: MainReason.Særregelverket,
    texts: SÆRREGELVERKET_TEXTS,
  },
  {
    label: MAIN_REASON_LABELS[MainReason.Saksbehandlingsreglene],
    key: MainReason.Saksbehandlingsreglene,
    texts: SAKSBEHANDLINGSREGLENE_TEXTS,
  },
  {
    label: MAIN_REASON_LABELS[MainReason.Trygdemedisin],
    key: MainReason.Trygdemedisin,
    texts: TRYGDEMEDISIN_TEXTS,
  },
];

export const KvalitetsvurderingerV3 = ({ datasets }: Props) => {
  const theme = useAppTheme();
  const types = useSakstypeFilter();
  const hide = types.every(
    (type) => type === SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET || type === SakstypeEnum.OMGJØRINGSKRAV,
  );
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');

  const datasetIndex = Number.parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  if (hide || datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  const mangellfullDetailsDatasets = getMangelfullDetailsDatasets(datasets, 'avvik', theme);

  return (
    <DynamicCard size={CardSize.LARGE}>
      <CardTitleWithExplainer helpText="Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene «henlagt», «retur», «trukket» eller «ugunst (ugyldig)» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i saker med disse utfallene.">
        Kvalitetsvurderinger
      </CardTitleWithExplainer>

      <TitleWithExplainer>Kvalitetsvurderte saker</TitleWithExplainer>
      <TotalMangelfull stats={datasets} />

      <TitleWithExplainer>Andel mangelfulle saker av total per hovedkategori</TitleWithExplainer>
      <Mangelfull datasets={datasets} />

      <TitleWithExplainer>
        Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)
      </TitleWithExplainer>
      <MangelfullDetails {...mangellfullDetailsDatasets} />
      <HelpTexts helpTexts={MAIN_HELP_TEXTS} />

      <TitleWithExplainer>
        Avvik under «{SÆRREGELVERKET_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].label}»
      </TitleWithExplainer>
      <Details
        stats={datasets}
        reasonIds={LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS}
        reasonTexts={LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS}
      />

      <HStack justify="center">
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </HStack>

      <HGrid columns={3}>
        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList,
          )}
          label={
            LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS[
              SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning
            ].label
          }
          backgroundColor={getColorFromTheme(
            SÆRREGELVERKET_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketSaksdataHjemlerList.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList,
          )}
          label={
            LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS[
              SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn
            ].label
          }
          backgroundColor={getColorFromTheme(
            SÆRREGELVERKET_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList,
          )}
          label={SÆRREGELVERKET_TEXTS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum].label}
          backgroundColor={getColorFromTheme(
            SÆRREGELVERKET_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />
      </HGrid>
      <HelpTexts
        helpTexts={[
          { texts: LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS, key: 'LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS' },
        ]}
      />

      <TitleWithExplainer>
        Avvik under «
        {SAKSBEHANDLINGSREGLENE_TEXTS[VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten].label}»
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={VEILEDNINGSPLIKTEN_REASONS} reasonTexts={VEILEDNINGSPLIKTEN_TEXTS} />
      <HelpTexts helpTexts={[{ texts: VEILEDNINGSPLIKTEN_TEXTS, key: 'VEILEDNINGSPLIKTEN_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {SAKSBEHANDLINGSREGLENE_TEXTS[UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten].label}»
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={UTREDNINGSPLIKTEN_REASONS} reasonTexts={UTREDNINGSPLIKTEN_TEXTS} />
      <HelpTexts helpTexts={[{ texts: UTREDNINGSPLIKTEN_TEXTS, key: 'UTREDNINGSPLIKTEN_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten]
            .label
        }
        »
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={FORELEGGELSESPLIKTEN_REASONS} reasonTexts={FORELEGGELSESPLIKTEN_TEXTS} />
      <HelpTexts helpTexts={[{ texts: FORELEGGELSESPLIKTEN_TEXTS, key: 'FORELEGGELSESPLIKTEN_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten]
            .label
        }
        »
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={BEGRUNNELSESPLIKTEN_REASONS} reasonTexts={BEGRUNNELSESPLIKTEN_TEXTS} />
      <HelpTexts helpTexts={[{ texts: BEGRUNNELSESPLIKTEN_TEXTS, key: 'BEGRUNNELSESPLIKTEN_TEXTS' }]} />

      <HGrid columns={3}>
        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList,
          )}
          label={
            BEGRUNNELSESPLIKTEN_TEXTS[
              BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket
            ].label
          }
          backgroundColor={getColorFromTheme(
            SAKSBEHANDLINGSREGLENE_TEXTS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten]
              .color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList,
          )}
          label={
            BEGRUNNELSESPLIKTEN_TEXTS[
              BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum
            ].label
          }
          backgroundColor={getColorFromTheme(
            SAKSBEHANDLINGSREGLENE_TEXTS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten]
              .color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList,
          )}
          label={
            BEGRUNNELSESPLIKTEN_TEXTS[
              BegrunnelsespliktenBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn
            ].label
          }
          backgroundColor={getColorFromTheme(
            SAKSBEHANDLINGSREGLENE_TEXTS[BegrunnelsespliktenBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten]
              .color,
            theme,
          )}
        />
      </HGrid>

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[
            KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse
          ].label
        }
        »
      </TitleWithExplainer>
      <Details
        stats={datasets}
        reasonIds={KLAGE_OG_KLAGEFORBEREDELSEN_REASONS}
        reasonTexts={KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS}
      />
      <HelpTexts helpTexts={[{ texts: KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS, key: 'KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[
            OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke
          ].label
        }
        »
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={OMGJØRING_REASONS} reasonTexts={OMGJØRING_TEXTS} />
      <HelpTexts helpTexts={[{ texts: OMGJØRING_TEXTS, key: 'OMGJØRING_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[
            JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten
          ].label
        }
        »
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={JOURNALFØRINGSPLIKTEN_REASONS} reasonTexts={JOURNALFØRINGSPLIKTEN_TEXTS} />
      <HelpTexts helpTexts={[{ texts: JOURNALFØRINGSPLIKTEN_TEXTS, key: 'JOURNALFØRINGSPLIKTEN_TEXTS' }]} />

      <TitleWithExplainer>
        Avvik under «
        {
          SAKSBEHANDLINGSREGLENE_TEXTS[
            KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak
          ].label
        }
        »
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={KLART_SPRÅK_REASONS} reasonTexts={KLART_SPRÅK_TEXTS} />
      <HelpTexts helpTexts={[{ texts: KLART_SPRÅK_TEXTS, key: 'KLART_SPRÅK_TEXTS' }]} />
    </DynamicCard>
  );
};

const getHjemlerCount = (dataset: DataSetV3, hjemmelListId: KvalitetsvurderingV3HjemlerList): Record<string, number> =>
  dataset.data.reduce<Record<string, number>>((counts, sak) => {
    for (const hjemmelId of sak[hjemmelListId] ?? []) {
      counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
    }

    return counts;
  }, {});
