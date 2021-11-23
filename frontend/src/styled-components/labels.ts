import styled from 'styled-components';

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

export const LabelMain = styled(Label)`
  background-color: #e0dae7;
  border: 1px solid #634689;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
`;

export const LabelHjemmel = styled(Label)`
  background-color: #f1d8d4;
  border: 1px solid #ba3a26;
`;

export const LabelLovhjemmel = styled(Label)`
  background-color: #cce1ff;
  border: 1px solid #0067c5;
`;

export const LabelType = styled(Label)`
  background-color: white;
  border: 1px solid #ba3a26;
`;

export const LabelYtelse = styled(Label)`
  background-color: #cce1f3;
  border: 1px solid #0067c5;
  background-color: #f1d8d4;
  border: 1px solid #0067c5;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LabelMedunderskriver = styled(Label)`
  background-color: #ffeccc;
  border: 1px solid #d47b00;
`;

export const LabelReturnertTilSaksbehandler = styled(Label)`
  background-color: #d8f9ff;
  border: 1px solid #4cadcd;
`;
