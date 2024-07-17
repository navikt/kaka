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
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

interface StyledDropdownProps {
  $maxHeight?: string | number;
  $width?: string | number;
}

const Container = styled.div<StyledDropdownProps>`
  position: absolute;
  z-index: 1;
  background-color: var(--a-bg-default);
  padding: 0;
  max-height: ${({ $maxHeight }) => $maxHeight ?? '256px'};
  width: ${({ $width }) => $width ?? '275px'};
  overflow: auto;
  border-radius: 4px;
  box-shadow: var(--a-shadow-medium);
`;

const Wrapper = styled.div``;
