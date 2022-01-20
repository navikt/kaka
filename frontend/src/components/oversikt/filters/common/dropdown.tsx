import React, { useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../../../hooks/use-on-click-outside';
import { Container, StyledLabel } from './styled-components';

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
        <StyledLabel onClick={() => setOpen(false)} open={true}>
          {label}
          {formatMetadata(metadata)}
        </StyledLabel>
        <DropdownContent>{children}</DropdownContent>
      </Container>
    );
  }

  return (
    <Container ref={ref}>
      <StyledLabel onClick={() => setOpen(true)} open={false}>
        {label}
        {formatMetadata(metadata)}
      </StyledLabel>
    </Container>
  );
};

export const formatMetadata = (metadata?: number | string) =>
  typeof metadata !== 'undefined' ? ` (${metadata})` : null;

const DropdownContent = styled.div`
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
  padding-bottom: 0;
  background-color: white;
  z-index: 3;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px 0px;
  border-radius: 0.25rem;
  border: 1px solid rgb(198, 194, 191);
`;
