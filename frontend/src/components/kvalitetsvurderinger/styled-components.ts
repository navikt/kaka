import styled from 'styled-components';

export const StyledTableContainer = styled.div`
  flex-grow: 1;
`;

export const StyledTable = styled.table`
  max-width: 2000px;
`;

interface StyledTableHeaderProps {
  width?: string;
}

export const StyledTableHeader = styled.th<StyledTableHeaderProps>`
  width: ${({ width = '13em' }) => width};
`;
