import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import styled from 'styled-components';

interface Props {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <Overlay>
        <NavFrontendSpinner type="XXL" />
      </Overlay>
    );
  }

  return null;
};

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30vh;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;
