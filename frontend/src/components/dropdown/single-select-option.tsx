import { styled } from 'styled-components';

interface OptionProps {
  onSelect: (id: string) => void;
  active: boolean;
  filterId: string;
  children: string;
  testId?: string;
}

export const SingleSelectOption = ({ active, filterId, children, onSelect, testId }: OptionProps): JSX.Element => (
  <StyledButton onClick={() => onSelect(filterId)} theme={{ active }} title={children} data-testid={testId}>
    <StyledChecked>{active ? '✓' : ''}</StyledChecked>
    {children}
  </StyledButton>
);

SingleSelectOption.displayName = 'SingleSelectOption';

const StyledButton = styled.button`
  width: 100%;
  border: none;
  text-align: left;
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1em;
  background: transparent;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  :hover {
    background: #0074df;
    color: white;
  }
`;

const StyledChecked = styled.span`
  width: 2em;
  text-align: center;
  display: inline-block;
`;
