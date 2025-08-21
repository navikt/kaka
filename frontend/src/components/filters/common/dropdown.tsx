import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { useRef } from 'react';
import { styled } from 'styled-components';
import { Container, StyledDropdownButton } from './styled-components';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  label: string;
  metadata?: number | string;
  children: React.ReactNode;
}

export const Dropdown = ({ label, metadata, children, open, setOpen }: Props) => {
  const ref = useRef(null);

  useOnClickOutside(() => setOpen(false), ref);

  if (open) {
    return (
      <Container ref={ref}>
        <StyledDropdownButton onClick={() => setOpen(false)} open>
          {label}
          {formatMetadata(metadata)}
        </StyledDropdownButton>
        <DropdownContent>{children}</DropdownContent>
      </Container>
    );
  }

  return (
    <Container ref={ref}>
      <StyledDropdownButton onClick={() => setOpen(true)} open={false}>
        {label}
        {formatMetadata(metadata)}
      </StyledDropdownButton>
    </Container>
  );
};

export const formatMetadata = (metadata?: number | string) =>
  typeof metadata !== 'undefined' ? ` (${metadata})` : null;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 400px;
  background-color: var(--ax-bg-raised);
  z-index: 3;
  box-shadow: var(--ax-shadow-dialog);
  border-radius: 0.25rem;
  border: 1px solid var(--ax-border-neutral);
`;
