import { useDefaultQueryTilbakemeldinger } from '@app/hooks/use-default-query-params';
import { useUserAccess } from '@app/hooks/use-user-access';
import { Button } from '@navikt/ds-react';
import { Link, useLocation } from 'react-router-dom';

export const BackLink = () => {
  const location = useLocation();
  const access = useUserAccess();
  const defaultQuery = useDefaultQueryTilbakemeldinger();

  if (typeof location.state === 'string' && location.state.startsWith('/')) {
    return (
      <Button to={location.state} as={Link} size="small" variant="secondary" replace>
        Tilbake
      </Button>
    );
  }

  if (access.KAKA_KVALITETSTILBAKEMELDINGER) {
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
