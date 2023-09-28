import { Popover } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';

interface Props {
  buttonRef: HTMLButtonElement | null;
  children: React.ReactNode;
  onClose: () => void;
  testId?: string;
  maxHeight?: string | number;
  width?: string | number;
}

export const DropdownContainer = ({ buttonRef, children, onClose, testId, maxHeight, width }: Props) => (
  <StyledPopover
    open
    anchorEl={buttonRef}
    arrow={false}
    placement="bottom-start"
    onClose={onClose}
    data-testid={testId}
    $maxHeight={maxHeight}
    $width={width}
  >
    <StyledPopoverContent>{children}</StyledPopoverContent>
  </StyledPopover>
);

interface StyledDropdownProps {
  $maxHeight?: string | number;
  $width?: string | number;
}

const StyledPopoverContent = styled(Popover.Content)`
  padding: 0;
  width: 100%;
  height: 100%;
`;

const StyledPopover = styled(Popover)<StyledDropdownProps>`
  max-height: ${({ $maxHeight: maxHeight = '256px' }) => maxHeight};
  width: ${({ $width: width = '275px' }) => width};
  overflow: auto;
  left: 0 !important; // Need to override style.left
`;
