import { styled } from 'styled-components';

type Size = 'small' | 'medium';

interface Props {
  $error?: boolean;
  $open: boolean;
  $size?: Size;
}

export const ToggleButton = styled.button<Props>`
  border: 1px solid ${({ $error }) => ($error === true ? '#ba3a26' : '#78706a')};
  box-shadow: ${({ $error }) => ($error === true ? '0 0 0 1px #ba3a26' : 'none')};
  padding: 0;
  padding-right: 24px;
  padding-left: 12px;
  height: ${({ $size }) => getHeight($size)};
  width: 100%;
  white-space: nowrap;
  border-radius: 0.25rem;
  transition: box-shadow 0.1s ease;
  cursor: pointer;
  background: none;
  user-select: none;
  position: relative;
  font-size: 18px;
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
    transform: ${({ $open }: Props) =>
      $open ? 'translateX(-3px) translateY(-50%) rotate(-45deg)' : 'translateX(-3px) translateY(-50%) rotate(45deg)'};
  }

  ::after {
    transform: ${({ $open }: Props) =>
      $open ? 'translateX(1.5px) translateY(-50%) rotate(45deg)' : 'translateX(1.5px) translateY(-50%) rotate(-45deg)'};
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

const getHeight = (size?: Size) => {
  switch (size) {
    case 'small':
      return '32px';
    case 'medium':
      return '48px';
    default:
      return '48px';
  }
};
