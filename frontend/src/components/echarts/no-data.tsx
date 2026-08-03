import { Heading, InlineMessage, VStack } from '@navikt/ds-react';

interface Props {
  title: string;
}

export const NoData = ({ title }: Props) => (
  <VStack height="100%" width="100%" gap="space-8" align="center" justify="center">
    <Heading size="small" align="center" level="1">
      {title}
    </Heading>

    <InlineMessage status="info">Ingen data</InlineMessage>
  </VStack>
);
