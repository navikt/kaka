import { type ErrorMessage, getErrorData } from '@app/components/saved-status/get-error-data';
import { HStack, Loader, Tooltip } from '@navikt/ds-react';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { PropsWithChildren } from 'react';
import { CheckmarkCircleFillIconColored, XMarkOctagonFillIconColored } from '../colored-icons/colored-icons';

interface SavedStatusProps {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

export const SavedStatus = ({ isLoading, isSuccess, isError, error }: SavedStatusProps) => {
  if (isLoading) {
    return (
      <HStack wrap={false} align="center" gap="space-4" height="19px">
        <StatusText>Lagrer...</StatusText>

        <Tooltip content="Lagrer..." delay={0}>
          <Loader size="xsmall" />
        </Tooltip>
      </HStack>
    );
  }

  if (isSuccess) {
    return (
      <HStack wrap={false} align="center" gap="space-4" height="19px">
        <Tooltip content="Lagret!" delay={0}>
          <CheckmarkCircleFillIconColored />
        </Tooltip>
      </HStack>
    );
  }

  if (isError) {
    return (
      <HStack wrap={false} align="center" gap="space-4" height="19px">
        <StatusText>Feil ved lagring</StatusText>

        <Tooltip content={`Feil ved lagring:\n${formatErrorMessage(getErrorData(error))}`} delay={0}>
          <XMarkOctagonFillIconColored />
        </Tooltip>
      </HStack>
    );
  }

  return null;
};

const formatErrorMessage = (error: ErrorMessage) => {
  const title = typeof error.status === 'undefined' ? error.title : `${error.title} (${error.status})`;
  const message = typeof error.detail === 'undefined' ? error.title : `${title}: ${error.detail}`;

  return message;
};

const StatusText = ({ children }: PropsWithChildren) => (
  <span className="text-ax-text-neutral-subtle text-sm">{children}</span>
);
