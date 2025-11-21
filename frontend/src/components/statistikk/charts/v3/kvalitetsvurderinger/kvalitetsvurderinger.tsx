import { useAppTheme } from '@app/app-theme';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import {
  BegrunnelsespliktenBoolean as BPBoolean,
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
import { Hjemler } from '@app/components/statistikk/charts/common/hjemler';
import { MangelfullDetails } from '@app/components/statistikk/charts/common/mangelfull-details';
import { getMangelfullDetailsDatasets } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/mangelfull-details';
import { Details } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/details';
import { KvalitetsvurderingModal } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/help-text-modal';
import { Mangelfull } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/mangelfull';
import { TotalMangelfull } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/total-mangelfull';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import type { KvalitetsvurderingV3HjemlerList } from '@app/components/statistikk/types/v3/kvalitetsvurdering';
import {
  BEGRUNNELSESPLIKTEN_REASONS,
  BEGRUNNELSESPLIKTEN_TEXTS as BP_TEXTS,
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
  SAKSBEHANDLINGSREGLENE_TEXTS as SBR_TEXTS,
  UTREDNINGSPLIKTEN_REASONS,
  UTREDNINGSPLIKTEN_TEXTS,
  VEILEDNINGSPLIKTEN_REASONS,
  VEILEDNINGSPLIKTEN_TEXTS,
} from '@app/components/statistikk/types/v3/saksbehandlingsreglene';
import {
  LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS as FEIL_LOVTOLKNING_TEXTS,
  LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS,
  SÆRREGELVERKET_TEXTS as SR_TEXTS,
} from '@app/components/statistikk/types/v3/særregelverket';
import type { KvalitetsvurderingV3Boolean } from '@app/types/kvalitetsvurdering/v3';
import { SakstypeEnum } from '@app/types/sakstype';
import { HGrid, HStack, Heading, HelpText, VStack } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { QueryParams } from '../../../../filters/filter-query-params';
import { CardSize, DynamicCard } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';

interface Props {
  datasets: DataSetV3[];
}

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
      <VStack>
        <HStack align="center" justify="center" gap="2">
          <Heading size="large">Kvalitetsvurderinger</Heading>
          <HelpText>
            Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene
            «henlagt», «retur», «trukket» eller «ugunst (ugyldig)» med i grunnlaget. Klageinstansen gjør ikke
            kvalitetsvurderinger i saker med disse utfallene.
          </HelpText>
        </HStack>
        <KvalitetsvurderingModal />
      </VStack>

      <TitleWithExplainer>Kvalitetsvurderte saker</TitleWithExplainer>
      <TotalMangelfull stats={datasets} />

      <TitleWithExplainer>Andel mangelfulle saker av total per hovedkategori</TitleWithExplainer>
      <Mangelfull datasets={datasets} />

      <TitleWithExplainer>
        Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)
      </TitleWithExplainer>
      <MangelfullDetails {...mangellfullDetailsDatasets} />

      <TitleWithExplainer>
        Avvik under «{SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].label}»
      </TitleWithExplainer>
      <Details
        stats={datasets}
        reasonIds={LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS}
        reasonTexts={FEIL_LOVTOLKNING_TEXTS}
      />

      <HStack justify="center">
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </HStack>

      <KvalitetsvurderingModal focus={MainReason.Særregelverket} />

      <HGrid columns={3}>
        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList,
          )}
          label={
            FEIL_LOVTOLKNING_TEXTS[SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning]
              .label
          }
          backgroundColor={getColorFromTheme(
            SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketSaksdataHjemlerList.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList,
          )}
          label={
            FEIL_LOVTOLKNING_TEXTS[
              SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn
            ].label
          }
          backgroundColor={getColorFromTheme(
            SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList,
          )}
          label={SR_TEXTS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum].label}
          backgroundColor={getColorFromTheme(
            SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
            theme,
          )}
        />
      </HGrid>

      <TitleWithExplainer boolean={VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten}>
        {SBR_TEXTS[VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={VEILEDNINGSPLIKTEN_REASONS} reasonTexts={VEILEDNINGSPLIKTEN_TEXTS} />

      <TitleWithExplainer boolean={UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten}>
        {SBR_TEXTS[UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={UTREDNINGSPLIKTEN_REASONS} reasonTexts={UTREDNINGSPLIKTEN_TEXTS} />

      <TitleWithExplainer boolean={ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten}>
        {SBR_TEXTS[ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={FORELEGGELSESPLIKTEN_REASONS} reasonTexts={FORELEGGELSESPLIKTEN_TEXTS} />

      <TitleWithExplainer boolean={BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten}>
        {SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={BEGRUNNELSESPLIKTEN_REASONS} reasonTexts={BP_TEXTS} />

      <HGrid columns={3}>
        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList,
          )}
          label={BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket].label}
          backgroundColor={getColorFromTheme(
            SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList,
          )}
          label={BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum].label}
          backgroundColor={getColorFromTheme(
            SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
            theme,
          )}
        />

        <Hjemler
          hjemlerCount={getHjemlerCount(
            focusedDataset,
            BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList,
          )}
          label={
            BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn].label
          }
          backgroundColor={getColorFromTheme(
            SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
            theme,
          )}
        />
      </HGrid>

      <TitleWithExplainer
        boolean={KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse}
      >
        {
          SBR_TEXTS[KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse]
            .label
        }
      </TitleWithExplainer>
      <Details
        stats={datasets}
        reasonIds={KLAGE_OG_KLAGEFORBEREDELSEN_REASONS}
        reasonTexts={KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS}
      />

      <TitleWithExplainer
        boolean={OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke}
      >
        {SBR_TEXTS[OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={OMGJØRING_REASONS} reasonTexts={OMGJØRING_TEXTS} />

      <TitleWithExplainer boolean={JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten}>
        {SBR_TEXTS[JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={JOURNALFØRINGSPLIKTEN_REASONS} reasonTexts={JOURNALFØRINGSPLIKTEN_TEXTS} />

      <TitleWithExplainer
        boolean={KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak}
      >
        {SBR_TEXTS[KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak].label}
      </TitleWithExplainer>
      <Details stats={datasets} reasonIds={KLART_SPRÅK_REASONS} reasonTexts={KLART_SPRÅK_TEXTS} />
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

const TitleWithExplainer = ({
  children,
  helpText,
  boolean,
}: { children: ReactNode; helpText?: string; boolean?: keyof KvalitetsvurderingV3Boolean }) => (
  <VStack>
    <HStack align="center" justify="center" gap="2">
      <Heading size="small">Avvik under «{children}»</Heading>
      {helpText ? <HelpText>{helpText}</HelpText> : null}
    </HStack>
    {boolean ? <KvalitetsvurderingModal focus={boolean} /> : null}
  </VStack>
);
