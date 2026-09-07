import { Loader, VStack } from '@navikt/ds-react';

interface Props {
  text: string;
}

export const AppLoader = ({ text }: Props) => (
  <VStack height="100vh" width="100vw" align="center" justify="center" className="bg-ax-bg-default">
    <VStack align="center">
      <Loader size="2xlarge" variant="neutral" transparent title={text} />
      <span>{text}</span>
    </VStack>
  </VStack>
);
