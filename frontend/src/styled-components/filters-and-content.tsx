import { styled } from 'styled-components';
import { BREAK_POINT } from './constants';

export const FiltersAndContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;

  @media (max-width: ${BREAK_POINT}px) {
    flex-direction: column;
    overflow-y: auto;
    display: block;
  }
`;

export const FilterSection = styled.div`
  padding: var(--ax-space-16);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  flex-shrink: 0;
  border-right: 1px solid var(--ax-border-neutral-subtle);
  width: 420px;
  height: 100%;
  overflow-y: auto;

  @media (max-width: ${BREAK_POINT}px) {
    width: 100%;
    border-right: none;
    height: fit-content;
    overflow-y: hidden;
  }
`;

const StyledContentArea = styled.div`
  padding: var(--ax-space-16);
  overflow-y: scroll;
  flex-grow: 1;
  position: relative;

  @media (max-width: ${BREAK_POINT}px) {
    margin-left: 0;
    overflow-y: hidden;
    height: auto;
    width: 100%;
  }
`;

export const ContentArea = ({ children }: { children: React.ReactNode }) => (
  <StyledContentArea>
    <div className="relative flex flex-wrap gap-4">{children}</div>
  </StyledContentArea>
);
