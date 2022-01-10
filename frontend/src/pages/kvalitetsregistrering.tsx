import React from 'react';
import styled from 'styled-components';
import { Footer } from '../components/kvalitetsregistrering/footer/footer';
import { Kvalitetsregistrering } from '../components/kvalitetsregistrering/kvalitetsregistrering';

export const KvalitetsregistreringPage = () => (
  <StyledKvalitetsregistreringPage>
    <Kvalitetsregistrering />
    <Footer />
  </StyledKvalitetsregistreringPage>
);

const StyledKvalitetsregistreringPage = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
