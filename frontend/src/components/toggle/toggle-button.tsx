import styled from 'styled-components';

interface Props {
  error?: boolean;
  theme: {
    open: boolean;
  };
}

export const ToggleButton = styled.button<Props>`
  border: 1px solid ${({ error }) => (error === true ? '#ba3a26' : '#78706a')};
  box-shadow: ${({ error }) => (error === true ? '0 0 0 1px #ba3a26' : 'none')};
  padding: 0;
  padding-right: 20px;
  padding-left: 12px;
  min-height: 40px;
  width: 100%;
  white-space: nowrap;
  border-radius: 0.25rem;
  transition: box-shadow 0.1s ease;
  cursor: pointer;
  background: none;
  user-select: none;
  position: relative;
  font-size: 16px;
  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  text-align: left;
  color: black;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 0.5rem;
    border-radius: 2px;
    height: 2px;
    background: #59514b;
    right: 0.5rem;
    top: 50%;
    transition: transform 0.1s ease;
  }

  ::before {
    transform: ${({ theme }: Props) =>
      theme.open
        ? 'translateX(-3px) translateY(-50%) rotate(-45deg)'
        : 'translateX(-3px) translateY(-50%) rotate(45deg)'};
  }

  ::after {
    transform: ${({ theme }: Props) =>
      theme.open
        ? 'translateX(1.5px) translateY(-50%) rotate(45deg)'
        : 'translateX(1.5px) translateY(-50%) rotate(-45deg)'};
  }

  &:active,
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #254b6d;
  }

  &:disabled {
    cursor: not-allowed;
    border-color: #6a6a6a;
    background: #f1f1f1;
    opacity: 0.7;
  }
`;
