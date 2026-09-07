import { isReduxValidationResponse } from '@app/functions/error-type-guard';
import { useKvalitetsvurderingIsFinished } from '@app/hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useFullfoerMutation } from '@app/redux-api/saksdata';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Alert, Box, HStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { ValidationSummary } from './validation-summary';

interface Props {
  hasErrors: boolean;
}

export const ValidationSummaryPopup = ({ hasErrors }: Props) => {
  const [open, setOpen] = useState(true);
  const id = useSaksdataId();
  const [, { error }] = useFullfoerMutation({ fixedCacheKey: id });
  const isFullfoert = useKvalitetsvurderingIsFinished();

  useEffect(() => {
    if (!isReduxValidationResponse(error)) {
      return;
    }

    if (error.data.sections.length > 0) {
      setOpen(true);
    }
  }, [error]);

  if (isFullfoert) {
    return (
      <Alert variant="success" inline>
        Fullført kvalitetsvurdering
      </Alert>
    );
  }

  if (!isReduxValidationResponse(error) || error.data.sections.length === 0) {
    return null;
  }

  const toggleOpen = () => setOpen(!open);

  const Icon = open ? ChevronDownIcon : ChevronUpIcon;

  const statusText = hasErrors ? 'Feil i utfyllingen' : 'Under utfylling';
  const statusType = hasErrors ? 'warning' : 'info';

  return (
    <>
      <button type="button" onClick={toggleOpen} className="cursor-pointer whitespace-nowrap border-0 bg-transparent">
        <Alert variant={statusType} inline>
          <HStack wrap={false} align="center">
            <span className="mr-4">{statusText}</span>
            <Icon />
          </HStack>
        </Alert>
      </button>
      {open && (
        <Box position="absolute" bottom="space-64" right="space-16" width="400px">
          <button
            type="button"
            onClick={toggleOpen}
            className="absolute right-0 cursor-pointer whitespace-nowrap border-0 bg-transparent p-4"
          >
            <Icon />
          </button>
          <ValidationSummary sections={error.data.sections} />
        </Box>
      )}
    </>
  );
};
