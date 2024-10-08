import { useHasRole } from '@app/hooks/use-has-role';
import { Role } from '@app/types/user';
import { DownloadIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useSearchParams } from 'react-router-dom';

export const ExcelExport = () => {
  const isLeder = useHasRole(Role.ROLE_KLAGE_LEDER);
  const [searchParams] = useSearchParams();

  if (!isLeder) {
    return null;
  }

  return (
    <>
      <Heading level="1" size="xsmall">
        Eksport
      </Heading>

      <Button
        as="a"
        variant="secondary"
        size="small"
        href={`/api/kaka-api/export/v2/excel?${searchParams.toString()}`}
        download="rapport"
        icon={<DownloadIcon aria-hidden />}
        iconPosition="right"
      >
        Eksporter
      </Button>
    </>
  );
};
