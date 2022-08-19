import { Download } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useHasRole } from '../../hooks/use-has-role';
import { Role } from '../../types/user';

const URL = '/api/kaka-api/export/excel';

export const ExcelExport = () => {
  const isLeder = useHasRole(Role.ROLE_KLAGE_LEDER);

  if (!isLeder) {
    return null;
  }

  return (
    <Button
      as="a"
      variant="secondary"
      size="small"
      href={URL}
      download="rapport"
      icon={<Download aria-hidden />}
      iconPosition="right"
    >
      Eksporter
    </Button>
  );
};
