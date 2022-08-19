import { Close } from '@navikt/ds-icons';
import styled from 'styled-components';

export const StyledPill = styled.button`
  position: relative;
  cursor: pointer;
  background-color: #c2eaf7;
  border: none;
  border-radius: 18px;
  padding-left: 16px;
  padding-right: 36px;
  padding-top: 4px;
  padding-bottom: 4px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;

  &:hover {
    background-color: #03a9f4;
  }
`;

export const PillIcon = styled(Close)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledLi = styled.li`
  max-width: 100%;
`;

export const PillContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
`;
