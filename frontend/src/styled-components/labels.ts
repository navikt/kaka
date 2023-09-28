import { styled } from 'styled-components';

interface LabelProps {
  fixedWidth?: boolean;
}

const Label = styled.div<LabelProps>`
  display: inline-block;
  padding: 4px 9px;
  border-radius: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 13em;
  width: ${({ fixedWidth }) => (fixedWidth === true ? '13em' : 'auto')};
`;

export const LabelAnke = styled(Label)`
  color: white;
  background-color: black;
  border: 1px solid #ba3a26;
`;

export const LabelKlage = styled(Label)`
  color: #262626;
  background-color: white;
  border: 1px solid #ba3a26;
`;

export const LabelYtelse = styled(Label)`
  background-color: #f1d8d4;
  border: 1px solid #0067c5;
  overflow: hidden;
  text-overflow: ellipsis;
`;
