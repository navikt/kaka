import { Button } from '@navikt/ds-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDefaultQuery } from '../../../hooks/use-default-query-params';
import { useUserHasRole } from '../../../hooks/use-user-access';

export const BackLink = () => {
  const location = useLocation();
  const { isLoading, roles } = useUserHasRole();
  const defaultQuery = useDefaultQuery();

  if (isLoading) {
    return null;
  }

  if (typeof location.state === 'string' && location.state.startsWith('/')) {
    return (
      <Button to={location.state} as={Link} size="small" variant="secondary" replace>
        Tilbake
      </Button>
    );
  }

  if (roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER) {
    return (
      <Button to={`/tilbakemeldinger?${defaultQuery}`} as={Link} size="small" variant="secondary">
        Tilbakemeldinger
      </Button>
    );
  }

  return (
    <Button to="/kvalitetsvurderinger" as={Link} size="small" variant="secondary">
      Kvalitetsvurderinger
    </Button>
  );
};
