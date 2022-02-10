import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useHasAccess } from '../../hooks/use-has-access';
import { useIndexPath } from '../../hooks/use-index-path';
import { KvalitetsregistreringPage } from '../../pages/kvalitetsregistrering';
import { KvalitetsregistreringerPage } from '../../pages/kvalitetsregistreringer';
import { StatistikkLederPage } from '../../pages/statistikk/leder';
import { StatistikkOpenPage } from '../../pages/statistikk/open';
import { StatistikkTotalPage } from '../../pages/statistikk/total';
import { TilbakemeldingerPage } from '../../pages/tilbakemeldinger';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { Role } from '../../types/user';
import { Overlay } from '../loader/overlay';
import { ACCESS_ROLES } from './access-roles';

export const Router = () => {
  const { data, isLoading } = useGetUserDataQuery();
  const indexPath = useIndexPath();

  if (isLoading || typeof data === 'undefined') {
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
            <HasAccess roles={ACCESS_ROLES.TOTALSTATISTIKK}>
              <StatistikkTotalPage />
            </HasAccess>
          }
        />
        <Route
          path="leder"
          element={
            <HasAccess roles={ACCESS_ROLES.LEDERSTATISTIKK}>
              <StatistikkLederPage />
            </HasAccess>
          }
        />
      </Route>
      <Route
        path="kvalitetsregistreringer"
        element={
          <HasAccess roles={ACCESS_ROLES.KVALITETSREGISTRERINGER}>
            <KvalitetsregistreringerPage />
          </HasAccess>
        }
      />
      <Route
        path="kvalitetsregistreringer/:saksdataId"
        element={
          <HasAccess roles={ACCESS_ROLES.KVALITETSREGISTRERINGER}>
            <KvalitetsregistreringPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger"
        element={
          <HasAccess roles={ACCESS_ROLES.TILBAKEMELDINGER}>
            <TilbakemeldingerPage />
          </HasAccess>
        }
      />
      <Route
        path="tilbakemeldinger/:saksdataId"
        element={
          <HasAccess roles={ACCESS_ROLES.TILBAKEMELDINGER}>
            <KvalitetsregistreringPage />
          </HasAccess>
        }
      />
      <Route path="*" element={<Navigate to={indexPath} />} />
    </Routes>
  );
};

interface Props {
  roles: Role[];
  children: JSX.Element;
}

const HasAccess = ({ roles, children }: Props) => {
  const hasAccess = useHasAccess(roles);

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
};
