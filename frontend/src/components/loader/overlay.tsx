import { Loader } from '@navikt/ds-react';
import { styled } from 'styled-components';

interface Props {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <Overlay>
        <div className="sticky top-[30vh]">
          <Loader size="3xlarge" variant="inverted" />
        </div>
      </Overlay>
    );
  }

  return null;
};

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: var(--ax-bg-neutral-moderate-pressedA);
  backdrop-filter: blur(2px);
  align-items: flex-start;
`;
