import { Footer } from '@app/components/kvalitetsvurdering/footer/footer';
import { Kvalitetsvurdering } from '@app/components/kvalitetsvurdering/kvalitetsvurdering';
import { styled } from 'styled-components';

export const KvalitetsvurderingPage = () => (
  <StyledKvalitetsvurderingPage>
    <Kvalitetsvurdering />
    <Footer />
  </StyledKvalitetsvurderingPage>
);

const StyledKvalitetsvurderingPage = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
