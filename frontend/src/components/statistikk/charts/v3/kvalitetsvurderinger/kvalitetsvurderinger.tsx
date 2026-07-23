import { useAppTheme } from '@app/app-theme';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import {
  BegrunnelsespliktenSaksdataHjemlerLists,
  BegrunnelsespliktenBoolean as BPBoolean,
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
import { NoKvalitetsvurderingWarning } from '@app/components/statistikk/charts/common/no-kvalitetsvurdering-warning';
import { Kvalitetsvurderinghjemler } from '@app/components/statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinghjemler';
import { MangelfullDetails } from '@app/components/statistikk/charts/kvalitetsvurderinger/mangelfull-details';
import { getMangelfullDetailsDatasets } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/calculations/mangelfull-details';
import { KvalitetsvurderingModal } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/help-text-modal';
import type { DataSetV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { useCanShowKvalitetsvurderingStats } from '@app/components/statistikk/hooks/use-can-show-kvalitetsvurdering-stats';
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
import { SakstypeEnum } from '@app/types/sakstype';
import { Heading, HelpText, HStack, VStack } from '@navikt/ds-react';
import { QueryParams } from '../../../../filters/filter-query-params';
import { Card } from '../../../card/card';
import { useQueryParam } from '../../../hooks/use-query-param';
import { Details } from './details';
import { Mangelfull } from './mangelfull';
import { TotalMangelfull } from './total-mangelfull';

interface Props {
  datasets: DataSetV3[];
}

export const KvalitetsvurderingerV3 = ({ datasets }: Props) => {
  const theme = useAppTheme();
  const types = useSakstypeFilter();
  const [datasetIndexString, setDatasetIndex] = useQueryParam(QueryParams.DATASET_INDEX, '0');
  const canShow = useCanShowKvalitetsvurderingStats();

  if (!canShow) {
    return <NoKvalitetsvurderingWarning />;
  }

  const datasetIndex = Number.parseInt(datasetIndexString, 10);

  const focusedDataset = datasets[datasetIndex];

  if (datasets.length === 0 || typeof focusedDataset === 'undefined') {
    return null;
  }

  const showsOnlyAnke = types.length === 1 && types[0] === SakstypeEnum.ANKE;

  const mangellfullDetailsDatasets = getMangelfullDetailsDatasets(datasets, types, 'avvik', theme);

  return (
    <Card span={20} className="flex flex-col gap-8">
      <VStack>
        <HStack align="center" justify="center" gap="space-8">
          <Heading size="large">Kvalitetsvurderinger</Heading>
          <HelpText>
            Ved utregningen av hvor mange prosent av sakene som har mangler ved kvaliteten, er ikke saker med utfallene
            «henlagt», «retur» eller «trukket» med i grunnlaget. Klageinstansen gjør ikke kvalitetsvurderinger i saker
            med disse utfallene.
          </HelpText>
        </HStack>
        <KvalitetsvurderingModal />
      </VStack>

      <TotalMangelfull stats={datasets} title="Avvik under «Kvalitetsvurderte saker»" helpText={DEFAULT_HELP_TEXT} />

      <Mangelfull
        stats={datasets}
        title="Avvik under «Andel mangelfulle saker av total per hovedkategori»"
        helpText={DEFAULT_HELP_TEXT}
      />

      <MangelfullDetails
        datasets={mangellfullDetailsDatasets.datasets}
        labels={mangellfullDetailsDatasets.labels}
        title="Avvik under «Antall spesifikke avvik per underkategori (prosentandel av kvalitetsvurderte saker)»"
        helpText={DEFAULT_HELP_TEXT}
      />

      <Details
        stats={datasets}
        reasonIds={LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_REASONS}
        reasonTexts={FEIL_LOVTOLKNING_TEXTS}
        title={`Avvik under «${SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />

      <HStack justify="center">
        <DatasetSelector datasets={datasets} onChange={setDatasetIndex} datasetIndexString={datasetIndexString} />
      </HStack>

      <KvalitetsvurderingModal focus={MainReason.Særregelverket} />

      <table>
        <thead>
          <tr>
            <th scope="col" align="center">
              {
                FEIL_LOVTOLKNING_TEXTS[SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning]
                  .label
              }
            </th>
            <th scope="col" align="center">
              {
                FEIL_LOVTOLKNING_TEXTS[
                  SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn
                ].label
              }
            </th>
            <th scope="col" align="center">
              {SR_TEXTS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum].label}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  SærregelverketHjemlerFromYtelseList.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList,
                )}
                title={
                  FEIL_LOVTOLKNING_TEXTS[
                    SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning
                  ].label
                }
                hideTitle
                backgroundColor={getColorFromTheme(
                  SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
                  theme,
                )}
              />
            </td>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  SærregelverketSaksdataHjemlerList.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList,
                )}
                title={
                  FEIL_LOVTOLKNING_TEXTS[
                    SærregelverketBoolean.saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn
                  ].label
                }
                hideTitle
                backgroundColor={getColorFromTheme(
                  SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
                  theme,
                )}
              />
            </td>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  SærregelverketSaksdataHjemlerList.saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList,
                )}
                title={SR_TEXTS[SærregelverketBoolean.saerregelverkDetErLagtTilGrunnFeilFaktum].label}
                hideTitle
                backgroundColor={getColorFromTheme(
                  SR_TEXTS[SærregelverketBoolean.saerregelverkLovenErTolketEllerAnvendtFeil].color,
                  theme,
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Details
        stats={datasets}
        reasonIds={VEILEDNINGSPLIKTEN_REASONS}
        reasonTexts={VEILEDNINGSPLIKTEN_TEXTS}
        title={`Avvik under «${SBR_TEXTS[VeiledningspliktenBoolean.saksbehandlingsreglerBruddPaaVeiledningsplikten].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />
      <Details
        stats={datasets}
        reasonIds={UTREDNINGSPLIKTEN_REASONS}
        reasonTexts={UTREDNINGSPLIKTEN_TEXTS}
        title={`Avvik under «${SBR_TEXTS[UtredningspliktenBoolean.saksbehandlingsreglerBruddPaaUtredningsplikten].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />
      <Details
        stats={datasets}
        reasonIds={FORELEGGELSESPLIKTEN_REASONS}
        reasonTexts={FORELEGGELSESPLIKTEN_TEXTS}
        title={`Avvik under «${SBR_TEXTS[ForeleggelsespliktenBoolean.saksbehandlingsreglerBruddPaaForeleggelsesplikten].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />
      <Details
        stats={datasets}
        reasonIds={BEGRUNNELSESPLIKTEN_REASONS}
        reasonTexts={BP_TEXTS}
        title={`Avvik under «${SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />

      <table>
        <thead>
          <tr>
            <th scope="col" align="center">
              {BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket].label}
            </th>
            <th scope="col" align="center">
              {BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum].label}
            </th>
            <th scope="col" align="center">
              {
                BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn]
                  .label
              }
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList,
                )}
                title={
                  BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket].label
                }
                hideTitle
                backgroundColor={getColorFromTheme(
                  SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
                  theme,
                )}
              />
            </td>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList,
                )}
                title={BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum].label}
                hideTitle
                backgroundColor={getColorFromTheme(
                  SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
                  theme,
                )}
              />
            </td>
            <td width="33.33%">
              <Kvalitetsvurderinghjemler
                hjemlerCount={getHjemlerCount(
                  focusedDataset,
                  BegrunnelsespliktenSaksdataHjemlerLists.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList,
                )}
                title={
                  BP_TEXTS[BPBoolean.saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn]
                    .label
                }
                hideTitle
                backgroundColor={getColorFromTheme(
                  SBR_TEXTS[BPBoolean.saksbehandlingsreglerBruddPaaBegrunnelsesplikten].color,
                  theme,
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {showsOnlyAnke ? null : (
        <Details
          stats={datasets}
          reasonIds={KLAGE_OG_KLAGEFORBEREDELSEN_REASONS}
          reasonTexts={KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS}
          title={`Avvik under «${
            SBR_TEXTS[KlageOgKlageforberedelsenBoolean.saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse]
              .label
          }»`}
          helpText={DEFAULT_HELP_TEXT}
        />
      )}

      <Details
        stats={datasets}
        reasonIds={OMGJØRING_REASONS}
        reasonTexts={OMGJØRING_TEXTS}
        title={`Avvik under «${SBR_TEXTS[OmgjoeringBoolean.saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />

      <Details
        stats={datasets}
        reasonIds={JOURNALFØRINGSPLIKTEN_REASONS}
        reasonTexts={JOURNALFØRINGSPLIKTEN_TEXTS}
        title={`Avvik under «${SBR_TEXTS[JournalfoeringspliktenBoolean.saksbehandlingsreglerBruddPaaJournalfoeringsplikten].label}»`}
        helpText={DEFAULT_HELP_TEXT}
      />

      {showsOnlyAnke ? null : (
        <Details
          stats={datasets}
          reasonIds={KLART_SPRÅK_REASONS}
          reasonTexts={KLART_SPRÅK_TEXTS}
          title={`Avvik under «${SBR_TEXTS[KlartSpraakBoolean.saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak].label}»`}
          helpText={DEFAULT_HELP_TEXT}
        />
      )}
    </Card>
  );
};

const getHjemlerCount = (dataset: DataSetV3, hjemmelListId: KvalitetsvurderingV3HjemlerList): Record<string, number> =>
  dataset.data.reduce<Record<string, number>>((counts, sak) => {
    for (const hjemmelId of sak[hjemmelListId] ?? []) {
      counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
    }

    return counts;
  }, {});

const DEFAULT_HELP_TEXT =
  'En sak kan ha ett eller flere avvik. Prosenten er regnet ut fra totalt antall kvalitetsvurderte saker.';
