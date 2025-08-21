import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
  testId?: string;
  maxHeight?: string | number;
  width?: string | number;
}

export const DropdownContainer = ({ children, testId, width, maxHeight }: Props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref !== null) {
      requestAnimationFrame(() => ref.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  }, [ref]);

  return (
    <Container ref={setRef} data-testid={testId} $width={width} $maxHeight={maxHeight}>
      {children}
    </Container>
  );
};

interface StyledDropdownProps {
  $maxHeight?: string | number;
  $width?: string | number;
}

const Container = styled.div<StyledDropdownProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  background-color: var(--ax-bg-raised);
  padding: 0;
  max-height: ${({ $maxHeight }) => $maxHeight ?? '256px'};
  width: ${({ $width }) => $width ?? '275px'};
  overflow: hidden;
  border-radius: 4px;
  box-shadow: var(--ax-shadow-dialog);
`;
