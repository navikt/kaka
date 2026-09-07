import { Nav } from '@app/components/routing/nav';
import { HStack, VStack } from '@navikt/ds-react';

interface Props {
  children: React.ReactNode;
}

export const StatisticsPageWrapper = ({ children }: Props) => (
  <>
    <Nav />
    <VStack as="article" position="relative" className="grow overflow-auto">
      <HStack wrap={false} className="grow overflow-hidden">
        {children}
      </HStack>
    </VStack>
  </>
);

export const KvalitetsvurderingPageWrapper = ({ children }: Props) => (
  <VStack as="section" className="grow overflow-y-hidden">
    <Nav />
    {children}
  </VStack>
);
