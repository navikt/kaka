import { HStack, Loader } from '@navikt/ds-react';

interface Props {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <HStack
        position="absolute"
        justify="center"
        align="start"
        width="100%"
        height="100%"
        className="top-0 left-0 z-5 bg-ax-bg-neutral-moderate-pressedA backdrop-blur-[2px]"
      >
        <div className="sticky top-[30vh]">
          <Loader size="3xlarge" variant="inverted" />
        </div>
      </HStack>
    );
  }

  return null;
};
