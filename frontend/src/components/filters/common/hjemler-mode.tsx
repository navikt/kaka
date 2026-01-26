import { QueryParams } from '@app/components/filters/filter-query-params';
import { useHjemlerModeFilter } from '@app/components/filters/hooks/use-query-filter';
import { HjemlerModeFilter } from '@app/components/filters/types';
import { BodyLong, Heading, HelpText, HStack, ToggleGroup } from '@navikt/ds-react';
import { useSearchParams } from 'react-router';

export const HjemlerMode = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = useHjemlerModeFilter(HjemlerModeFilter.INCLUDE_FOR_SOME);

  return (
    <HStack wrap={false} gap="space-16">
      <ToggleGroup
        value={mode}
        onChange={(v) => {
          searchParams.set(QueryParams.HJEMLER_MODE, v);
          setSearchParams(searchParams);
        }}
        size="small"
        label={
          <HStack gap="space-8" align="center">
            Treff
            <HelpText>
              <Heading level="1" size="xsmall">
                Minst én
              </Heading>
              <BodyLong spacing>
                Saken tas med i statistikken dersom minst én av hjemlene som er valgt i filteret er registrert på saken.
              </BodyLong>

              <Heading level="1" size="xsmall">
                Alle valgte
              </Heading>
              <BodyLong spacing>
                Saken tas med i statistikken dersom alle hjemlene som er valgt i filteret er registrert på saken.
              </BodyLong>

              <Heading level="1" size="xsmall">
                Kun valgte
              </Heading>
              <BodyLong spacing>
                Saken tas med i statistikken dersom kun hjemmelen/hjemlene som er valgt i filteret er registrert på
                saken. Hvis saken inneholder en hjemmel som ikke er valgt i filteret, blir den ikke tatt med.
              </BodyLong>

              <BodyLong>
                Hvis det ikke er valgt noen hjemler i filteret vil saken bli tatt med i statistikken uansett.
              </BodyLong>
            </HelpText>
          </HStack>
        }
      >
        <ToggleGroup.Item className="whitespace-nowrap" value={HjemlerModeFilter.INCLUDE_FOR_SOME}>
          Minst én
        </ToggleGroup.Item>
        <ToggleGroup.Item className="whitespace-nowrap" value={HjemlerModeFilter.INCLUDE_ALL_SELECTED}>
          Alle valgte
        </ToggleGroup.Item>
        <ToggleGroup.Item className="whitespace-nowrap" value={HjemlerModeFilter.INCLUDE_ALL_IN_BEHANDLING}>
          Kun valgte
        </ToggleGroup.Item>
      </ToggleGroup>
    </HStack>
  );
};
