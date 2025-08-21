import { useAppTheme } from '@app/app-theme';
import { GlobalStyles } from '@app/components/app/global-styles';
import { ScrollReset } from '@app/components/app/scroll-reset';
import { NavHeader } from '@app/components/header/header';
import { useIndexPath } from '@app/hooks/use-index-path';
import { useUserAccess } from '@app/hooks/use-user-access';
import { KvalitetsvurderingPage } from '@app/pages/kvalitetsvurdering';
import { KvalitetsvurderingerPage } from '@app/pages/kvalitetsvurderinger';
import { ComparisonPage } from '@app/pages/statistikk/comparison';
import { StatistikkLederPage } from '@app/pages/statistikk/leder';
import { StatistikkMinPage } from '@app/pages/statistikk/min';
import { StatistikkOpenPage } from '@app/pages/statistikk/open';
import { StatistikkTotalPage } from '@app/pages/statistikk/total';
import { TilbakemeldingerPage } from '@app/pages/tilbakemeldinger';
import { Theme, VStack } from '@navikt/ds-react';
import type { JSX } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export const Router = () => {
  const access = useUserAccess();
  const indexPath = useIndexPath();

  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path="/" element={<Navigate to={indexPath} />} />
        <Route path="statistikk">
          <Route path="aapen" element={<StatistikkOpenPage />} />
          <Route
            path="total"
            element={
              <HasAccess hasAccess={access.KAKA_TOTALSTATISTIKK}>
                <StatistikkTotalPage />
              </HasAccess>
            }
          />
          <Route
            path="leder"
            element={
              <HasAccess hasAccess={access.KAKA_LEDERSTATISTIKK}>
                <StatistikkLederPage />
              </HasAccess>
            }
          />
          <Route
            path="min"
            element={
              <HasAccess hasAccess={access.KAKA_KVALITETSVURDERING}>
                <StatistikkMinPage />
              </HasAccess>
            }
          />
        </Route>
        <Route
          path="kvalitetsvurderinger"
          element={
            <HasAccess hasAccess={access.KAKA_KVALITETSVURDERING}>
              <KvalitetsvurderingerPage />
            </HasAccess>
          }
        />
        <Route
          path="kvalitetsvurderinger/:saksdataId"
          element={
            <HasAccess hasAccess={access.KAKA_KVALITETSVURDERING}>
              <KvalitetsvurderingPage />
            </HasAccess>
          }
        />
        <Route
          path="tilbakemeldinger"
          element={
            <HasAccess hasAccess={access.KAKA_KVALITETSTILBAKEMELDINGER}>
              <TilbakemeldingerPage />
            </HasAccess>
          }
        />
        <Route
          path="tilbakemeldinger/:saksdataId"
          element={
            <HasAccess hasAccess={access.KAKA_KVALITETSTILBAKEMELDINGER}>
              <KvalitetsvurderingPage />
            </HasAccess>
          }
        />
        <Route
          path="sammenlikning"
          element={
            <HasAccess hasAccess={access.KAKA_TOTALSTATISTIKK}>
              <ComparisonPage />
            </HasAccess>
          }
        />
        <Route path="*" element={<Navigate to={indexPath} />} />
      </Route>
    </Routes>
  );
};

interface Props {
  hasAccess: boolean;
  children: JSX.Element;
}

const HasAccess = ({ hasAccess, children }: Props) => {
  const indexPath = useIndexPath();

  if (!hasAccess) {
    return <Navigate to={indexPath} replace />;
  }

  return children;
};

const AppWrapper = () => {
  const theme = useAppTheme();

  return (
    <Theme theme={theme} className="h-full w-full">
      <VStack height="100%" width="100%" overflow="hidden">
        <GlobalStyles />
        <ScrollReset />
        <NavHeader />
        <Outlet />
      </VStack>
    </Theme>
  );
};
