import {
  ExclamationmarkTriangleFillIconColored,
  InformationSquareFillIconColored,
} from '@app/components/colored-icons/colored-icons';
import { isReduxValidationResponse } from '@app/functions/error-type-guard';
import { useKvalitetsvurderingIsFinished } from '@app/hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useFullfoerMutation } from '@app/redux-api/saksdata';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, InlineMessage } from '@navikt/ds-react';
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
      <InlineMessage status="success" className="whitespace-nowrap">
        Fullført kvalitetsvurdering
      </InlineMessage>
    );
  }

  if (!isReduxValidationResponse(error) || error.data.sections.length === 0) {
    return null;
  }

  const toggleOpen = () => setOpen(!open);

  const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

  return (
    <>
      <Button
        onClick={toggleOpen}
        variant="tertiary"
        icon={
          hasErrors ? (
            <ExclamationmarkTriangleFillIconColored aria-hidden />
          ) : (
            <InformationSquareFillIconColored aria-hidden />
          )
        }
        className={`+ whitespace-nowrap ${hasErrors ? 'text-ax-warning-1000' : 'text-ax-info-1000'}`}
      >
        <HStack wrap={false} align="center" gap="space-8">
          {hasErrors ? 'Feil i utfyllingen' : 'Under utfylling'}
          <ChevronIcon />
        </HStack>
      </Button>

      {open && (
        <Box position="absolute" bottom="space-64" right="space-16" width="400px">
          <button
            type="button"
            onClick={toggleOpen}
            className="absolute right-0 cursor-pointer whitespace-nowrap border-0 bg-transparent p-4"
          >
            <ChevronIcon />
          </button>
          <ValidationSummary sections={error.data.sections} />
        </Box>
      )}
    </>
  );
};
