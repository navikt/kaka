import { styled } from 'styled-components';

export const KeyContent = styled.div`
  text-align: center;
`;

export const KeyNumber = styled(KeyContent)`
  font-size: 32px;
  font-weight: bold;
`;

export const RedKeyNumber = styled(KeyNumber)`
  color: var(--ax-text-danger-subtle);
`;

export const KeyLabelWithHelpText = styled(KeyContent)`
  display: flex;
  gap: 8px;
`;

export const HelpTextContent = styled.div`
  text-align: left;
`;
