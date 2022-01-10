import styled from 'styled-components';

export const KeyContent = styled.div`
  text-align: center;
`;

export const KeyNumber = styled(KeyContent)`
  font-size: 32px;
  font-weight: bold;
`;

export const RedKeyNumber = styled(KeyNumber)`
  color: #c30000;
`;

export const StatsSections = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  justify-content: space-around;
`;
