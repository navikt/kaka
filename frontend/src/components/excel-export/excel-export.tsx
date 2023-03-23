import { DownloadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useHasRole } from '@app/hooks/use-has-role';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { Role } from '@app/types/user';
import { QueryParams } from '../filters/filter-query-params';
import { useQueryFilter, useVersionQueryFilter } from '../filters/hooks/use-query-filter';

export const ExcelExport = () => {
  const isLeder = useHasRole(Role.ROLE_KLAGE_LEDER);
  const url = useUrl();

  if (!isLeder) {
    return null;
  }

  return (
    <Button
      as="a"
      variant="secondary"
      size="small"
      href={url}
      download="rapport"
      icon={<DownloadIcon aria-hidden />}
      iconPosition="right"
    >
      Eksporter
    </Button>
  );
};

const useUrl = () => {
  const version = useVersionQueryFilter();
  const from = useQueryFilter(QueryParams.FROM_DATE);

  switch (version) {
    case KvalitetsvurderingVersion.V1:
      // There is only data for 2022 in v1
      return '/api/kaka-api/export/v1/excel?year=2022';
    case KvalitetsvurderingVersion.V2:
      return `/api/kaka-api/export/v2/excel?year=${getYear(from)}`;
  }
};

const YEAR_REGEX = /^\d{4}$/;

// TODO: As of now, this export only supports one full year.
// Come 2024 we need to either let user choose year explicitly or let user retrieve stats for query params' from and to date.
const getYear = (date: string | null): string => {
  if (date !== null && YEAR_REGEX.test(date)) {
    return date;
  }

  return '2023';
};
