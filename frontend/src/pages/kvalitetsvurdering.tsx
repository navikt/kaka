import { Footer } from '@app/components/kvalitetsvurdering/footer/footer';
import { Kvalitetsvurdering } from '@app/components/kvalitetsvurdering/kvalitetsvurdering';
import { KvalitetsvurderingPageWrapper } from '@app/pages/page-wrapper';

export const KvalitetsvurderingPage = () => (
  <KvalitetsvurderingPageWrapper>
    <Kvalitetsvurdering />
    <Footer />
  </KvalitetsvurderingPageWrapper>
);
