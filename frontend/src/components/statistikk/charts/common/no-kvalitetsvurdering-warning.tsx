import { Type } from '@app/components/common-table-components/type';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { SakstypeEnum } from '@app/types/sakstype';
import { InformationIcon } from '@navikt/aksel-icons';
import { BodyShort, InfoCard, VStack } from '@navikt/ds-react';
import { CardSize, DynamicCard } from '../../card/card';

export const NoKvalitetsvurderingWarning = () => {
  const types = useSakstypeFilter();

  return (
    <DynamicCard size={CardSize.LARGE}>
      <VStack align="center" justify="center" className="grow">
        <InfoCard data-color="info">
          <InfoCard.Header icon={<InformationIcon aria-hidden />}>
            <InfoCard.Title>
              Kvalitetsvurderingstatistikk er kun tilgjengelig for sakstyper <Type type={SakstypeEnum.KLAGE} /> og{' '}
              <Type type={SakstypeEnum.ANKE} />
            </InfoCard.Title>
          </InfoCard.Header>
          <InfoCard.Content>
            <BodyShort>
              {types.length === 0
                ? 'For å se statistikken må du velge klage og/eller anke.'
                : 'For å se statistikken må du filtrere vekk øvrige sakstyper.'}
            </BodyShort>
          </InfoCard.Content>
        </InfoCard>
      </VStack>
    </DynamicCard>
  );
};
