import { styled } from 'styled-components';

export const StyledSelectedHjemler = styled.div`
  margin-top: 10px;
  padding-left: 1em;
  border-left: 2px solid var(--ax-border-neutral-subtle);

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledNoneSelected = styled.p`
  color: var(--ax-text-neutral-subtle);
  margin: 0;
`;

export const StyledSelectedList = styled.ul`
  list-style: none;
  padding-left: 10px;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledSelectedSectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 4px;
`;
