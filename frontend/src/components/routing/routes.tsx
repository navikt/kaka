import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIndexPath } from '../../hooks/use-index-path';
import { useUserHasRole } from '../../hooks/use-user-access';
import { KvalitetsvurderingPage } from '../../pages/kvalitetsvurdering';
import { KvalitetsvurderingerPage } from '../../pages/kvalitetsvurderinger';
import { StatistikkLederPage } from '../../pages/statistikk/leder';
import { StatistikkMinPage } from '../../pages/statistikk/min';
import { StatistikkOpenPage } from '../../pages/statistikk/open';
import { StatistikkTotalPage } from '../../pages/statistikk/total';
import { TilbakemeldingerPage } from '../../pages/tilbakemeldinger';
import { Overlay } from '../loader/overlay';

export const Router = () => {
  const { isLoading, roles } = useUserHasRole();
  const indexPath = useIndexPath();

  if (isLoading) {
    return <Overlay />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={indexPath} />} />
      <Route path="statistikk">
        <Route path="aapen" element={<StatistikkOpenPage />} />
        <Route
          path="total"
          element={
            <HasAccess hasAccess={roles.ROLE_KAKA_TOTALSTATISTIKK}>
              <StatistikkTotalPage />
            </HasAccess>
          }
        />
        <Route
          path="leder"
          element={
            <HasAccess hasAccess={roles.ROLE_KAKA_LEDERSTATISTIKK}>
              <StatistikkLederPage />
            </HasAccess>
          }
        />
        <Route
          path="min"
          element={
            <HasAccess hasAccess={roles.ROLE_KAKA_KVALITETSVURDERING}>
              <StatistikkMinPage />
            </HasAccess>
          }
        />
      </Route>
      <Route
        path="kvalitetsvurderinger"
        element={
          <HasAccess hasAccess={roles.ROLE_KAKA_KVALITETSVURDERING}>
            <KvalitetsvurderingerPage />
          </HasAccess>
        }
      />
      <Route
        path="kvalitetsvurderinger/:saksdataId"
        element={
          <HasAccess hasAccess={roles.ROLE_KAKA_KVALITETSVURDERING}>
            <KvalitetsvurderingPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger"
        element={
          <HasAccess hasAccess={roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER}>
            <TilbakemeldingerPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger/:saksdataId"
        element={
          <HasAccess hasAccess={roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER}>
            <KvalitetsvurderingPage />
          </HasAccess>
        }
      />
      <Route path="*" element={<Navigate to={indexPath} />} />
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
