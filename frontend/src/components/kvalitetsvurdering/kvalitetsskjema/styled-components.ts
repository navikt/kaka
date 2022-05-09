import { RadioGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';

export const FormSection = styled.div`
  margin-bottom: 30px;
`;

export const SubHeader = styled.h2`
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
`;

export const RadioButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

export const RadioButtonsColumn = styled(RadioGruppe)`
  > * {
    margin-bottom: 10px;
  }
`;

export const StyledCommentField = styled.div`
  margin-left: 32px;
  max-width: 50%;
`;

export const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  position: relative;
`;

export const StyledHeaderHelpTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
