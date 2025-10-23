import { useHasRole } from '@app/hooks/use-has-role';
import { Role } from '@app/types/user';
import { DownloadIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useSearchParams } from 'react-router-dom';

export const ExcelExport = () => {
  const hasMedFritekst = useHasRole(Role.KAKA_EXCEL_UTTREKK_MED_FRITEKST);
  const hasUtenFritekst = useHasRole(Role.KAKA_EXCEL_UTTREKK_UTEN_FRITEKST);
  const [searchParams] = useSearchParams();

  if (!hasMedFritekst && !hasUtenFritekst) {
    return null;
  }

  const children: React.ReactNode[] = [];

  if (hasMedFritekst) {
    children.push(
      <ExcelButton key="medFritekst" href={`/api/kaka-api/export/v2/excel-med-fritekst?${searchParams.toString()}`}>
        Eksporter med fritekster
      </ExcelButton>,
    );
  }

  if (hasUtenFritekst) {
    children.push(
      <ExcelButton key="utenFritekst" href={`/api/kaka-api/export/v2/excel-uten-fritekst?${searchParams.toString()}`}>
        Eksporter uten fritekster
      </ExcelButton>,
    );
  }

  return (
    <>
      <Heading level="1" size="xsmall">
        Eksport
      </Heading>

      {children}
    </>
  );
};

const ExcelButton = ({ href, children }: { href: string; children: string }) => (
  <Button
    as="a"
    variant="secondary"
    size="small"
    href={href}
    download="rapport"
    icon={<DownloadIcon aria-hidden />}
    iconPosition="right"
  >
    {children}
  </Button>
);
