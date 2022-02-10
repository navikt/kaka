import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIndexPath } from '../../hooks/use-index-path';
import { useUserAccess } from '../../hooks/use-user-access';
import { KvalitetsvurderingPage } from '../../pages/kvalitetsvurdering';
import { KvalitetsvurderingerPage } from '../../pages/kvalitetsvurderinger';
import { StatistikkLederPage } from '../../pages/statistikk/leder';
import { StatistikkOpenPage } from '../../pages/statistikk/open';
import { StatistikkTotalPage } from '../../pages/statistikk/total';
import { TilbakemeldingerPage } from '../../pages/tilbakemeldinger';
import { Overlay } from '../loader/overlay';
import { Page, hasPageAccess } from './access-roles';

export const Router = () => {
  const { isLoading, access } = useUserAccess();
  const indexPath = useIndexPath();

  if (isLoading || typeof access === 'undefined') {
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
            <HasAccess hasAccess={hasPageAccess(Page.TOTALSTATISTIKK, access)}>
              <StatistikkTotalPage />
            </HasAccess>
          }
        />
        <Route
          path="leder"
          element={
            <HasAccess hasAccess={hasPageAccess(Page.LEDERSTATISTIKK, access)}>
              <StatistikkLederPage />
            </HasAccess>
          }
        />
      </Route>
      <Route
        path="kvalitetsvurderinger"
        element={
          <HasAccess hasAccess={hasPageAccess(Page.KVALITETSVURDERINGER, access)}>
            <KvalitetsvurderingerPage />
          </HasAccess>
        }
      />
      <Route
        path="kvalitetsvurderinger/:saksdataId"
        element={
          <HasAccess hasAccess={hasPageAccess(Page.KVALITETSVURDERINGER, access)}>
            <KvalitetsvurderingPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger"
        element={
          <HasAccess hasAccess={hasPageAccess(Page.TILBAKEMELDINGER, access)}>
            <TilbakemeldingerPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger/:saksdataId"
        element={
          <HasAccess hasAccess={hasPageAccess(Page.TILBAKEMELDINGER, access)}>
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
