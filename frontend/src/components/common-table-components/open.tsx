import { Button } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}

export const OpenKvalitetsvurdering = ({ id }: Props) => (
  <Button
    size="medium"
    variant="primary"
    to={id}
    state={`${window.location.pathname}${window.location.search}`}
    as={Link}
    data-testid="kvalitetsvurderinger-open-link"
    data-saksdata-id={id}
  >
    Åpne
  </Button>
);
